# frozen_string_literal: true

require 'application_system_test_case'

class CreateQuestionnaireTest < ApplicationSystemTestCase
  it 'should be possible to create a questionnaire' do
    visit '/admin'
    click_link 'Add new'
    fill_in 'Name', with: 'Questionnaire 1'
    click_button 'Save'

    assert page.has_content?('Questionnaire created')
    assert page.hash_content?('Questionnaire 1')
  end
end