# frozen_string_literal: true

require 'forwardable'

module Api
  class QuestionnaireWithResponsesAsJson < SimpleDelegator
    def as_json(*_)
      {
        title: title,
        questionnaire_responses: questionnaire_responses.map do |r|
          {
            person_name: r.person_name,
            created_at: r.created_at.to_formatted_s(:long),
            answers: r.answers
          }
        end
      }
    end
  end
end