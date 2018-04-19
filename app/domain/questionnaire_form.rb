# frozen_string_literal: true

class QuestionnaireForm < Form

  attr_accessor :person_name
  validates :person_name, presence: true

  attr_reader :questionnaire

  def initialize(questionnaire)
    @questionnaire = questionnaire
    define_validated_accessors_for_questions
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

  def define_validated_accessors_for_questions
    questions.each do |question|
      self.singleton_class.class_eval do
        attr_accessor question.form_field
        validates question.form_field, presence: true
      end
    end
  end

  Question = Struct.new(:index, :name, :label) do
    FORM_FIELD_NAME = 'question_%{index}'

    def form_field
      format(FORM_FIELD_NAME, index: index)
    end
  end
end