## frozen_string_literal: true

module Api
  class QuestionnairesController < ApplicationController
    def create
      render plain: 'It worked', status: 200
    end
  end
end
