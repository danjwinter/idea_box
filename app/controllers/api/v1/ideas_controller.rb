class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find(params[:id])
  end

  def create
    @idea = Idea.create(idea_params)
    respond_with :api, :v1, @idea
  end

  def destroy
    respond_with Idea.find(params[:id]).destroy
  end

  private

  def idea_params
    params.permit(:body, :quality, :title)
  end
end
