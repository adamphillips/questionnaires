class CreateQuestionnaireResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :questionnaire_responses do |t|
      t.string :person_name
      t.json :answers
    end
  end
end
