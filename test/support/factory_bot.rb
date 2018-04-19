# Load all factories
for file in Dir[File.expand_path('factories/*.rb', File.dirname(__FILE__))]
  require file
end

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods
end