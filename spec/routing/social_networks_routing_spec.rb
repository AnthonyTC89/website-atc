require "rails_helper"

RSpec.describe SocialNetworksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/social_networks").to route_to("social_networks#index")
    end

    it "routes to #show" do
      expect(:get => "/social_networks/1").to route_to("social_networks#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/social_networks").to route_to("social_networks#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/social_networks/1").to route_to("social_networks#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/social_networks/1").to route_to("social_networks#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/social_networks/1").to route_to("social_networks#destroy", :id => "1")
    end
  end
end
