Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :admin do
    get '(:path)(/:id)' => 'home#index'
  end

  namespace :api do
    resources :questionnaires, only: [:index, :create, :show]
  end

  resources :questionnaires, only: [:index, :show] do
    member do
      post 'submit' => 'questionnaires#submit'
      get 'thanks' => 'questionnaires#thanks'
    end
  end

  root to: redirect('/questionnaires')
end
