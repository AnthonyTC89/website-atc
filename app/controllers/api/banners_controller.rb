module Api
  class BannersController < ApplicationController
    before_action :set_banner, only: [:update]

    # GET /banners
    # def index
    #   @banners = Banner.all
    #   render json: @banners
    # end

    # GET /banners_full
    def index_full
      query = 'SELECT b.id, b.title, b.subtitle, b.body, b.caption, b.image_id, i.location, i.key'
      query << ' FROM banners as b'
      query << ' INNER JOIN images as i ON b.recipe_id = i.id'
      @banners = Banner.connection.select_all(@query).to_a
      render json: @banners
    end

    # GET /banners/1
    # def show
    #   render json: @banner
    # end

    # POST /banners
    def create
      @banner = Banner.new(banner_params)
      if @banner.save
        render json: @banner, status: :created
      else
        render json: @banner.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /banners/1
    def update
      if @banner.update(banner_params)
        render json: @banner
      else
        render json: @banner.errors, status: :unprocessable_entity
      end
    end

    # DELETE /banners/1
    # def destroy
    #   @banner.destroy
    # end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_banner
        @banner = Banner.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def banner_params
        params.require(:banner).permit(:title, :subtitle, :body, :caption, :status, :image_id)
      end
  end
end