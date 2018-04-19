# frozen_string_literal: true

class QuestionnairesController < ApplicationController
  helper_method :questionnaire, :questionnaire_form

  def index
    @questionnaires = Questionnaire.all.order(:title)
  end

  def show
  end

  def submit
    SubmitQuestionnaire
      .new(questionnaire_form)
      .call(questionnaire_response_params) do |response|
      response.on(:success) do
        redirect_to thanks_questionnaire_url(questionnaire)
      end

      response.on(:validation_error) do
        render 'show'
      end
    end
  end

  def thanks
  end

  private

  def questionnaire_form
    @questionnaire_form ||= QuestionnaireForm.new(questionnaire)
  end

  def questionnaire
    @questionnaire ||= Questionnaire.find(params[:id])
  end

  def questionnaire_response_params
    @questionnaire_response_params ||= params.require(:questionnaire_form).permit(questionnaire_form_fields)
  end

  def questionnaire_form_fields
    [:person_name] + questionnaire_form.questions.collect(&:form_field)
  end
end
