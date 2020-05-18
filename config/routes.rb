Rails.application.routes.draw do
  namespace :api do
    get "/users_list", to: "users#list_token"
    post "/users/login", to: "users#login_token"
    post "/users_create", to: "users#create_token"
    put "/users_update", to: "users#update_token"
    put "/users_restore", to: "users#restore_token"
    delete "/users_delete", to: "users#destroy_token"
  end
end
