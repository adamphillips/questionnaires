# frozen_string_literal: true

class QuestionnaireForm < Form

  attr_accessor :title

  def initialize(questionnaire)
    @questionnaire = questionnaire
  end

  def title
    @title ||= questionnaire.title
  end

  def questions
    @questions ||= questionnaire.questions.each_with_index.map do |question, index|
      Question.new(index, question['name'], question['label'])
    end
  end

  private

  attr_reader :questionnaire

  Question = Struct.new(:index, :name, :label) do
    FORM_FIELD_NAME = 'question_%{index}'

    def form_field
      format(FORM_FIELD_NAME, index: index)
    end
  end
end