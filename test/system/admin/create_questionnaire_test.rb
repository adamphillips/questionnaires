# frozen_string_literal: true

require 'application_system_test_case'

class CreateQuestionnaireTest < ApplicationSystemTestCase
  describe 'as an admin user' do
    it 'should be possible to create a questionnaire' do
      visit '/admin'
      click_link 'Add new'

      fill_in 'Title', with: 'Questionnaire 1'

      fill_in 'Question 1', with: 'How are you?'

      click_link 'Add question'
      fill_in 'Question 2', with: 'What is your favourite colour?'

      click_button 'Save'

      assert page.has_content?('Questionnaire created')
    end
  end
end