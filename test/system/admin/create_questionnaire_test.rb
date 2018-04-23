# frozen_string_literal: true

require 'application_system_test_case'

class CreateQuestionnaireTest < ApplicationSystemTestCase
  describe 'as an admin user' do
    it 'should be possible to create a questionnaire' do
      visit '/admin'
      click_link 'Add new'

      fill_in 'Title', with: 'Questionnaire 1'

      within '#question-group-1' do
        fill_in 'Name', with: 'welcome'
        fill_in 'Question', with: 'How are you?'
      end

      click_link 'Add question'

      within '#question-group-2' do
        fill_in 'Name', with: 'colour'
        fill_in 'Question', with: 'What is your favourite colour?'
      end

      click_button 'Save'

      assert page.has_content?('Questionnaire created')
    end
  end
end