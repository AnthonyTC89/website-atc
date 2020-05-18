Rails.application.routes.draw do
  namespace :api do
    get "/users_list", to: "users#list"
    post "/users/login", to: "users#login"
    post "/users_create", to: "users#create_user"
    put "/users_update", to: "users#update_by_token"
    delete "/users_delete", to: "users#destroy_token"
  end
end
