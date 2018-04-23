FactoryBot.define do
  factory :questionnaire do
    trait :simple do
      title  'A simple questionnaire'
      questions [
        { 'name' => 'first_question', 'label' => 'The first question' },
        { 'name' => 'second_question', 'label' => 'The second question' }
      ]
    end
  end
end