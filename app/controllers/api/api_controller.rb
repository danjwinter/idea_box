class Api::ApiController < ApplicationController
  protect_from_forgery with: :null_session

  helper_method :return_unavailable_status

private
  def return_unavailable_status
    render :nothing => true, :status => :service_unavailable
  end
end
