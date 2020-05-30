require "rails_helper"

RSpec.describe LogosController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/logos").to route_to("logos#index")
    end

    it "routes to #show" do
      expect(:get => "/logos/1").to route_to("logos#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/logos").to route_to("logos#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/logos/1").to route_to("logos#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/logos/1").to route_to("logos#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/logos/1").to route_to("logos#destroy", :id => "1")
    end
  end
end
