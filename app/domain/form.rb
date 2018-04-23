# Satisfy basic ActiveModel requirements to be used as a form subject
class Form
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  def self.model_name
    name = @model_name_override || default_model_name
    ActiveModel::Name.new(self, nil, name)
  end

  def self.set_model_name model_name
    @model_name_override = model_name
  end

  def persisted?; false; end

  private

  def self.default_model_name
    name.to_s.demodulize.sub(/Form$/, '')
  end
end
