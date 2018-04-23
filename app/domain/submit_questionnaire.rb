# frozen_string_literal: true

class SubmitQuestionnaire
  include MiniTools::Command

  def initialize(form, opts={})
    @form = form
    @questionnaire_response_class = opts.fetch(:questionnaire_response_class) { QuestionnaireResponse }
  end

  def call(params)
    form.attributes = params
    return yield response(:validation_error) unless form.valid?

    create_response
    yield response(:success)
  end

  private

  attr_reader :form, :questionnaire_response_class

  def create_response
    questionnaire_response_class.create(
      questionnaire: form.questionnaire,
      person_name: form.person_name,
      answers: structured_answer_data
    )
  end

  def structured_answer_data
    form.questions.each_with_object({}) do |question, obj|
      obj[question.name] = {
        'question' => question.label,
        'answer' => form.send(question.form_field)
      }
    end
  end
end