Rails.application.routes.draw do
  namespace :api do
    resources :users
    post "/users/login", to: "users#login"
    post "/users/logout", to: "users#logout"
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
