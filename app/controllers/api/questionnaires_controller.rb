## frozen_string_literal: true

module Api
  class QuestionnairesController < ApplicationController
    def index
      render json: { questionnaires: Questionnaire.all.as_json(only: [:id, :title]) }
    end

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

    def show
      render json: Questionnaire.find(params[:id]).as_json(
        only: [:title],
        include: {
          questionnaire_responses: {
            only: [:person_name, :answers]
          }
        }
      )
    end

    private

    def questionnaire_params
      params.require(:questionnaire).permit(:title, questions: [:name, :label])
    end
  end
end
