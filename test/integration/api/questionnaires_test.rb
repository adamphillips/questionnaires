require 'test_helper'

module Api
  class QuestionnairesTest < ActionDispatch::IntegrationTest
    describe 'POST /api/questionnaires' do
      it 'should return 200 status' do
        post '/api/questionnaires'
        assert_equal 200, response.status
      end
    end
  end
end