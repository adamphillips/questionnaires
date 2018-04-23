Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :admin do
    get '(:path)' => 'home#index'
  end

  namespace :api do
    post 'questionnaires' => 'questionnaires#create'
  end

  get 'questionnaire/:id' => 'questionnaires#show', as: :questionnaire
end
