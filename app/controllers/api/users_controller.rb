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
    def list_token
      decode(params[:token])
      @users = User.select(:id, :username, :email, :status).order(:id)
      render json: @users, status: :accepted
    end

    # GET /users/1
    # def show
    #   render json: @user
    # end

    # POST /users/login
    def login_token
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
    def create_token
      data = decode(params[:token])
      username = data['username']
      user = User.new(username: username, password: username, password_confirmation: username)
      if user.save
        render json: { id: user.id, username: user.username, email: user.email, status: user.status }, status: :created
      else
        render json: user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    # def update
    #   if @user.update(user_params)
    #     render json: @user
    #   else
    #     render json: @user.errors, status: :unprocessable_entity
    #   end
    # end

    # PATCH/PUT /users_update
    def update_token
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

    # PATCH/PUT /users_restore
    def restore_token
      data = decode(params[:token])
      user = User.find(data['id'])
      user.password = user.username
      user.password_confirmation = user.username
      if user.save
        render status: :accepted
      else
        render status: :unprocessable_entity
      end
    end

    def updown_token
      data = decode(params[:token])
      user = User.find(data['id'])
      user.status += data['value'].to_i
      if user.save
        render status: :accepted
      else
        render status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    # def destroy
    #   @user.destroy
    # end

    # DELETE /users_destroy
    def destroy_token
      data = decode(params[:token])
      user = User.find(data['id'])
      if user.destroy
        render status: :accepted
      else
        render status: :unprocessable_entity
      end
    end

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