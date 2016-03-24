class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    idea = Idea.find_by(id: params[:id])
    if idea
      respond_with idea
    else
      render :json => {:error => "Idea not found"}.to_json, :status => 404
    end
  end

  def create
    idea = Idea.create(idea_params)
    respond_with :api, :v1, idea
  end

  def destroy
    respond_with Idea.find(params[:id]).destroy
  end

  def update
    respond_with Idea.find(params[:id]).update_attributes(idea_params)
  end

  private

  def idea_params
    params.permit(:body, :quality, :title)
  end
end
