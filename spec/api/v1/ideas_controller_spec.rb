require 'rails_helper'

describe Api::V1::IdeasController do
  describe "GET #index", type: :controller do
    it "returns all of the ideas in json format" do
      ideas = create_list(:idea, 5)
      get :index, format: :json

      expect(json_response.count).to eq 5
      expect(json_response.first).to have_key :title
      expect(json_response.first).to have_key :body
      expect(json_response.first).to have_key :quality
    end
  end

  describe "GET #show", type: :controller do
    it "returns the information about an idea in json" do
      idea = create(:idea)
      get :show, id: idea.id, format: :json

      expect(json_response[:id]).to eq idea.id
      expect(json_response[:title]).to eq idea.title
      expect(json_response[:body]).to eq idea.body
      expect(json_response[:quality]).to eq idea.quality
    end
  end

  describe "POST #create", type: :controller do
    it "returns the new idea in json" do
      idea = build(:idea)

      post :create, format: :json, title: idea.title, body: idea.body, quality: idea.quality

      expect(json_response).to have_key :id
      expect(json_response[:title]).to eq idea.title
      expect(json_response[:body]).to eq idea.body
      expect(json_response[:quality]).to eq idea.quality
      expect(json_response).to have_key :created_at
      expect(json_response).to have_key :updated_at
    end
  end

  describe "DELETE #destroy", type: :controller do
    it "returns 204 response when idea is deleted" do
      idea = create(:idea)

      delete :destroy, format: :json, id: idea.id

      expect(response.status).to eq 204
      expect(Idea.count).to eq 0
    end
  end

  describe "PATCH #update", type: :controller do
    it "returns 204 response when idea is updated" do
      idea = create(:idea)

      patch :update, format: :json, id: idea.id, title: 'Sweet title', body: 'oh yeah'

      idea.reload

      expect(response.status).to eq 204
      expect(idea.title).to eq 'Sweet title'
      expect(idea.body).to eq 'oh yeah'
    end
  end
end
