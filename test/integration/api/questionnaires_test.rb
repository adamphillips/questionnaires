require 'test_helper'

module Api
  class QuestionnairesTest < ActionDispatch::IntegrationTest
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

    def json_response
      JSON.parse(response.body).deep_symbolize_keys
    end
  end
end