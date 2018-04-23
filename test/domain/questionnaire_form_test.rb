# frozen_string_literal: true

require 'test_helper'

require 'support/factory_bot'

class QuestionnaireFormTest < ActiveSupport::TestCase
  subject { QuestionnaireForm.new(questionnaire) }
  let(:questionnaire) { create :questionnaire, :simple }

  describe '#title' do
    it 'should delegate the title on to the questionnaire' do
      assert_equal questionnaire.title, subject.title
    end
  end

  describe '#questions' do
    it 'should return object versions of the questions' do
      assert_equal 'first_question', subject.questions[0].name
      assert_equal 'The first question', subject.questions[0].label
      assert_equal 'second_question', subject.questions[1].name
      assert_equal 'The second question', subject.questions[1].label
    end

    it 'should generate 0-based indexed field names' do
      assert_equal 'question_0', subject.questions[0].form_field
      assert_equal 'question_1', subject.questions[1].form_field
    end

    it 'should add an accessor for each form_field' do
      subject.question_0 = 'Some value'
      assert_equal 'Some value', subject.question_0
    end

    describe 'validation' do
      setup do
        subject.attributes = valid_data
      end

      it 'should be valid with valid data' do
        assert subject.valid?
      end

      it 'should be invalid if the name is missing' do
        subject.person_name = ''
        refute subject.valid?
      end

      it 'should be invalid if a question is not answered' do
        subject.question_0 = ''
        refute subject.valid?
      end
    end
  end

  def valid_data
    {
      person_name: 'Adam',
      question_0: 'First answer',
      question_1: 'Second answer'
    }
  end
end