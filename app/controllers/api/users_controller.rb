module Api
  class UsersController < ApplicationController
    include UserHelper
    before_action :set_user, only: [:show, :update, :destroy]
    # GET /users
    # def index
    #   @users = User.all

    #   render json: @users
    # end

    # GET /users_list
    def list
      decode(params[:token])
      @users = User.select(:id, :username, :email, :status)
      render json: encode(@users)
    end

    # GET /users/1
    # def show
    #   render json: @user
    # end

    # POST /users/login
    def login
      data = decode(params[:token])
      username = data['username']
      password = data['password']
      @user = User.find_by(username: username)
      if @user 
        if @user.authenticate(password)
          payload = { id: @user.id, username: @user.username, email: @user.email, status: @user.status }
          render json: encode(payload), status: :accepted
        else
          render json: @user.errors, status: :unauthorized
        end
      else
        render json: @user.errors, status: :not_found
      end
    end

    # POST /users/logout
    def logout
      # if @user 
      #   @user.update(token: nil)
      #   render status: :accepted
      # else
      #   render json: @user.errors, status: :not_found
      # end
    end

    # POST /users
    # def create
    #   @user = User.new(user_params)

    #   if @user.save
    #     render json: @user, status: :created
    #   else
    #     render json: @user.errors, status: :unprocessable_entity
    #   end
    # end

    # PATCH/PUT /users/1
    # def update
    #   if @user.update(user_params)
    #     render json: @user
    #   else
    #     render json: @user.errors, status: :unprocessable_entity
    #   end
    # end

    # PATCH/PUT /users_update
    def update_by_token
      data = decode(params[:token])
      @user = User.find(data['id'])
      @user.email = data['email']
      @user.password_digest = data['password_digest'] if data['password_digest']
      if @user.save
        render status: :accepted
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    # def destroy
    #   @user.destroy
    # end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.require(:user).permit(:token)
      end
  end
end