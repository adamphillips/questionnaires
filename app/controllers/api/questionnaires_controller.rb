## frozen_string_literal: true

module Api
  class QuestionnairesController < ApplicationController
    def create
      questionnaire = Questionnaire.create(questionnaire_params)

      render json: {
        result: {
          message: 'Questionnaire created'
        },
        record: QuestionnaireAsJson.new(
          questionnaire,
          url: questionnaire_url(questionnaire)
        )
      }
    end

    private

    def questionnaire_params
      params.require(:questionnaire).permit(:title, questions: [:name, :label])
    end
  end
end
