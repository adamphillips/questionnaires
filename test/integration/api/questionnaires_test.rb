require 'test_helper'

require 'support/factory_bot'

module Api
  class QuestionnairesTest < ActionDispatch::IntegrationTest
    describe 'GET /api/questionnaires' do
      it 'should return JSON containing the id and title of all the questionnaires' do
        q1 = create :questionnaire, title: 'Questionnaire 1'
        q2 = create :questionnaire, title: 'Questionnaire 2'

        get '/api/questionnaires'

        assert_equal q1.id, json_response[:questionnaires][0][:id]
        assert_equal 'Questionnaire 1', json_response[:questionnaires][0][:title]
        assert_equal q2.id, json_response[:questionnaires][1][:id]
        assert_equal 'Questionnaire 2', json_response[:questionnaires][1][:title]
      end
    end

    describe 'POST /api/questionnaires' do
      let (:questionnaire_data) {
        {
          title: 'Some questionnaire',
          questions: [
            { label: 'First question' },
            { label: 'Second question' }
          ]
        }
      }

      it 'should create a new questionnaire and return the questionnaire data as JSON' do
        post '/api/questionnaires', params: { questionnaire: questionnaire_data }

        assert_equal 200, response.status

        assert_equal 'Questionnaire created', json_response[:result][:message]

        assert_equal 'Some questionnaire', json_response[:record][:title]

        new_questionnaire = Questionnaire.last

        assert_equal new_questionnaire.id, json_response[:record][:id]
        assert_equal questionnaire_url(new_questionnaire), json_response[:record][:url]
      end
    end

    describe 'GET /api/questionnaires/:id' do
      it 'should return JSON containing the details of the specified questionnaire' do
        q1 = create :questionnaire, title: 'Questionnaire 1'

        create :questionnaire_response, questionnaire: q1,
          person_name: 'Some one',
          answers: {
            question_1: {
              question: 'Some question',
              value: 'Some answer'
            }
          }

        get "/api/questionnaires/#{q1.id}"

        assert_equal 'Questionnaire 1', json_response[:title]
        assert_equal 'Some answer', json_response[:questionnaire_responses][0][:answers][:question_1][:value]
      end
    end

    def json_response
      @json_response ||= JSON.parse(response.body).deep_symbolize_keys
    end
  end
end