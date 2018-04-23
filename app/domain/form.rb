# Satisfy basic ActiveModel requirements to be used as a form subject
class Form
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  def persisted?; false; end

  def attributes= attrs
    return unless attrs.present?
    for key, value in attrs
      send :"#{key}=", value
    end
  end
end
