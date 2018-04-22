## frozen_string_literal: true

module Api
  class QuestionnairesController < ApplicationController
    def create
      Rails.logger.info params.inspect
      render json: {message: 'Questionnaire created'}
    end
  end
end
