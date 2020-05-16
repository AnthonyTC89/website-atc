Rails.application.routes.draw do
  namespace :api do
    get "/users_list", to: "users#list"
    post "/users/login", to: "users#login"
    put "/users_update", to: "users#update_by_token"
  end
end
