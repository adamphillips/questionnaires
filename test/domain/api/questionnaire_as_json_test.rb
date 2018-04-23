# frozen_string_literal: true

require 'test_helper'

require 'support/factory_bot'

module Api
  class QuestionnaireAsJsonTest < ActiveSupport::TestCase
    let (:questionnaire) { create :questionnaire, :simple }
    let (:additional_nodes) { {} }

    describe '#as_json' do
      subject { QuestionnaireAsJson.new(questionnaire, additional_nodes).as_json }

      it 'should contain all the attributes of the questionnaire' do
        assert_equal questionnaire.title, subject['title']
        assert_equal questionnaire.questions, subject['questions']
      end

      describe 'when additional nodes are specified' do
        let(:additional_nodes) { { url: 'http://some/url' } }

        it 'should be included in the hash representation' do
          assert_equal 'http://some/url', subject['url']
        end
      end
    end
  end
end