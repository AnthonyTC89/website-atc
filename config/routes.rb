Rails.application.routes.draw do
  namespace :api do
    get "/users_list", to: "users#list_token"
    post "/users/login", to: "users#login_token"
    post "/users_create", to: "users#create_token"
    put "/users_update", to: "users#update_token"
    put "/users_restore", to: "users#restore_token"
    put "/users_updown", to: "users#updown_token"
    delete "/users_delete", to: "users#destroy_token"

    resources :images, only: [:index, :create, :destroy]

    resources :banners, only: [:create, :update]
    get "/banners_full", to: "banners#index_full"

    resources :abouts, only: [:create, :update]
    get "/abouts_full", to: "abouts#index_full"
  end
end
