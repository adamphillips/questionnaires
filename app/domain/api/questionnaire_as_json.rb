# frozen_string_literal: true

require 'forwardable'

module Api
  class QuestionnaireAsJson < SimpleDelegator
    def initialize(questionnaire, additional_nodes = {})
      super(questionnaire)
      @additional_nodes = additional_nodes.stringify_keys
    end

    def as_json(*_)
      super.merge(additional_nodes)
    end

    private

    attr_reader :additional_nodes
  end
end