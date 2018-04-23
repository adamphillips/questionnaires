# frozen_string_literal: true

class QuestionnairesController < ApplicationController
  helper_method :questionnaire_form

  def show
  end

  private

  def questionnaire_form
    @questionnaire_form ||= QuestionnaireForm.new(questionnaire)
  end

  def questionnaire
    @questionnaire ||= Questionnaire.find(params[:id])
  end
end
