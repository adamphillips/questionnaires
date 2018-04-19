# frozen_string_literal: true

require 'test_helper'

require 'support/factory_bot'

class SubmitQuestionnaireTest < ActiveSupport::TestCase
  subject { SubmitQuestionnaire.new(form) }

  let(:questionnaire) { create :questionnaire, :simple }
  let(:form) { QuestionnaireForm.new(questionnaire) }

  let(:response_params) {}

  describe '#call' do
    describe 'when the response is valid' do
      let(:response_params) { valid_response }

      it 'should yield a success response' do
        response = nil
        subject.call(response_params) {|_r| response = _r}
        assert_equal :success, response.result
      end

      it 'should create the new QuestionnaireResponse record' do
        assert_difference -> { QuestionnaireResponse.count } do
          subject.call(response_params) {}

          created_response = QuestionnaireResponse.last

          assert_equal questionnaire, created_response.questionnaire
          assert_equal 'Adam', created_response.person_name
          assert_equal 'The first question', created_response.answers['first_question']['question']
          assert_equal 'The first answer', created_response.answers['first_question']['answer']
          assert_equal 'The second question', created_response.answers['second_question']['question']
          assert_equal 'The second answer', created_response.answers['second_question']['answer']
        end
      end
    end

    describe 'when the response is not valid' do
      let(:response_params) { invalid_response }

      it 'should yield a validation_error response' do
        response = nil
        subject.call(response_params) {|_r| response = _r}
        assert_equal :validation_error, response.result
      end
    end

  end

  def valid_response
    {
      person_name: 'Adam',
      question_0: 'The first answer',
      question_1: 'The second answer'
    }
  end

  def invalid_response
    valid_response.merge(
      person_name: ''
    )
  end
end
