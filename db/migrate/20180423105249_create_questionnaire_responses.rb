class CreateQuestionnaireResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :questionnaire_responses do |t|
      t.references :questionnaire
      t.string :person_name
      t.json :answers
      t.timestamps
    end

    add_foreign_key :questionnaire_responses, :questionnaires
  end
end
