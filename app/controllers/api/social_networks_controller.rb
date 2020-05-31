module Api
  class SocialNetworksController < ApplicationController
    before_action :set_social_network, only: [:update, :destroy]

    # GET /social_networks
    def index
      @social_networks = SocialNetwork.all.order(:id)
      render json: @social_networks
    end

    # GET /social_networks_home
    def index_home
      @social_networks = SocialNetwork.where(status: true).order(:id)
      render json: @social_networks
    end

    # GET /social_networks/1
    # def show
    #   render json: @social_network
    # end

    # POST /social_networks
    def create
      @social_network = SocialNetwork.new(social_network_params)

      if @social_network.save
        render json: @social_network, status: :created
      else
        render json: @social_network.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /social_networks/1
    def update
      if @social_network.update(social_network_params)
        render json: @social_network
      else
        render json: @social_network.errors, status: :unprocessable_entity
      end
    end

    # DELETE /social_networks/1
    def destroy
      @social_network.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_social_network
        @social_network = SocialNetwork.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def social_network_params
        params.require(:social_network).permit(:name, :href, :src, :status)
      end
  end
end