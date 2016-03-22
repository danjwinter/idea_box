Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :ideas, only: [:index, :show, :create, :destroy, :update]
    end
  end

  root 'home#index'
end
