Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :admin do
    get '(:path)' => 'home#index'
  end

  namespace :api do
    post 'questionnaires' => 'questionnaires#create'
  end

  resources :questionnaires, only: [:show] do
    member do
      post 'submit' => 'questionnaires#submit'
    end
  end
end
