module Api 
  class ProductsController < ApplicationController
    before_action :set_product, only: [:update, :destroy]

    # GET /products
    # def index
    #   @products = Product.all
    #   render json: @products
    # end

    # GET /products_full
    def index_full
      query = 'SELECT p.id, p.title, p.text, p.status, p.image_id, i.location, i.key'
      query << ' FROM Products as p'
      query << ' INNER JOIN Images as i ON p.image_id = i.id'
      query << ' ORDER BY p.id'
      @products = Product.connection.select_all(query).to_a
      render json: @products
    end

    # GET /products_home
    def index_home
      query = 'SELECT p.title, p.text, i.location, i.key'
      query << ' FROM Products as p'
      query << ' INNER JOIN Images as i ON p.image_id = i.id'
      query << ' WHERE p.status = true'
      query << ' ORDER BY p.id'
      @products = Product.connection.select_all(query).to_a
      render json: @products
    end

    # GET /products/1
    # def show
    #   render json: @product
    # end

    # POST /products
    def create
      @product = Product.new(product_params)

      if @product.save
        render json: @product, status: :created
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /products/1
    def update
      if @product.update(product_params)
        render json: @product
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end

    # DELETE /products/1
    def destroy
      @product.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_product
        @product = Product.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def product_params
        params.require(:product).permit(:title, :text, :status, :image_id)
      end
  end
end