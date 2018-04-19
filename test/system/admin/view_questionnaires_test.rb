# frozen_string_literal: true

require 'application_system_test_case'

require 'support/factory_bot'

module Admin
  class ViewQuestionnairesTest < ApplicationSystemTestCase
    describe 'as an admin user' do
      it 'should be possible to view the responses for previous questionnaires' do
        questionnaire = create :questionnaire, :simple, title: 'A simple questionnaire'

        create_response questionnaire, {
          'Please enter your name' => 'Person 1',
          'The first question' => 'The first answer',
          'The second question' => 'The second answer'
        }

        create_response questionnaire, {
          'Please enter your name' => 'Person 2',
          'The first question' => 'Answer number 1',
          'The second question' => 'Answer number 2'
        }

        visit '/admin'

        click_link 'A simple questionnaire'

        click_link 'Person 1'
        assert page.has_content?('The first answer')

        click_link 'Person 2'
        assert page.has_content?('Answer number 1')
      end
    end

    def create_response(questionnaire, answers)
      visit questionnaire_url(questionnaire)
      answers.each do |key, value|
        fill_in key, with: value
      end
      click_button 'Submit'
    end
  end
end