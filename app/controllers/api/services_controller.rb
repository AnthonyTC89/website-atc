module Api
  class ServicesController < ApplicationController
    before_action :set_service, only: [:update, :destroy]

    # GET /services
    # def index
    #   @services = Service.all
    #   render json: @services
    # end

    # GET /services_full
    def index_full
      query = 'SELECT s.id, s.title, s.text, s.status, s.image_id, i.location, i.key'
      query << ' FROM Services as s'
      query << ' INNER JOIN Images as i ON s.image_id = i.id'
      query << ' ORDER BY s.id'
      @services = Service.connection.select_all(query).to_a
      render json: @services
    end

    # GET /services_home
    def index_home
      query = 'SELECT s.title, s.text, i.location, i.key'
      query << ' FROM Services as s'
      query << ' INNER JOIN Images as i ON s.image_id = i.id'
      query << ' WHERE s.status = true'
      query << ' ORDER BY s.id'
      @services = Service.connection.select_all(query).to_a
      render json: @services
    end

    # GET /services/1
    # def show
    #   render json: @service
    # end

    # POST /services
    def create
      @service = Service.new(service_params)

      if @service.save
        render json: @service, status: :created
      else
        render json: @service.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /services/1
    def update
      if @service.update(service_params)
        render json: @service
      else
        render json: @service.errors, status: :unprocessable_entity
      end
    end

    # DELETE /services/1
    def destroy
      @service.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_service
        @service = Service.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def service_params
        params.require(:service).permit(:title, :text, :status, :image_id)
      end
  end
end