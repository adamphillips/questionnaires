# frozen_string_literal: true

require 'application_system_test_case'

require 'support/factory_bot'

class CompleteQuestionnaireTest < ApplicationSystemTestCase
  describe 'as a user' do
    it 'should be possible to complete a questionnaire' do
      questionnaire = create :questionnaire, title: 'Test questionnaire', questions: [
        { label: 'Question 1', name: 'question_1' },
        { label: 'Question 2', name: 'question_2' }
      ]

      visit questionnaire_url(questionnaire)

      fill_in 'Please enter your name', with: 'Adam'
      fill_in 'Question 1', with: 'Answer 1'
      fill_in 'Question 2', with: 'Answer 2'

      click_button 'Submit'

      assert page.has_content?('Thank you for submitting the questionnaire')
    end
  end
end
