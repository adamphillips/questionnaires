FactoryBot.define do
  factory :questionnaire do
    trait :simple do
      title  'A simple questionnaire'
      questions [
        { name: 'question_1', label: 'The first question' },
        { name: 'question_2', label: 'The second question' }
      ]
    end
  end
end