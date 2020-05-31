module Api
  class LogosController < ApplicationController
    before_action :set_logo, only: [:show, :update, :destroy]

    # GET /logos
    # def index
    #   @logos = Logo.all

    #   render json: @logos
    # end

    # GET /logos_full
    def index_full
      query = 'SELECT l.id, l.text, l.image_id, i.location, i.key'
      query << ' FROM logos as l'
      query << ' INNER JOIN images as i ON l.image_id = i.id'
      @logos = Logo.connection.select_all(query).to_a
      render json: @logos
    end

    # GET /logos_home
    def index_home
      query = 'SELECT l.text, i.location, i.key'
      query << ' FROM logos as l'
      query << ' INNER JOIN images as i ON l.image_id = i.id'
      query << ' WHERE l.status = true'
      @logos = Logo.connection.select_all(query).to_a
      render json: @logos
    end

    # GET /logos/1
    # def show
    #   render json: @logo
    # end

    # POST /logos
    def create
      @logo = Logo.new(logo_params)

      if @logo.save
        render json: @logo, status: :created
      else
        render json: @logo.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /logos/1
    def update
      if @logo.update(logo_params)
        render json: @logo
      else
        render json: @logo.errors, status: :unprocessable_entity
      end
    end

    # DELETE /logos/1
    # def destroy
    #   @logo.destroy
    # end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_logo
        @logo = Logo.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def logo_params
        params.require(:logo).permit(:text, :status, :image_id)
      end
  end
end