require 'rails_helper'

RSpec.describe "SocialNetworks", type: :request do
  describe "GET /social_networks" do
    it "works! (now write some real specs)" do
      get social_networks_path
      expect(response).to have_http_status(200)
    end
  end
end
