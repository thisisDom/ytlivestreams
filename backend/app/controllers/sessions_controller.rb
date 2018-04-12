class SessionsController < ApplicationController
  def create
    validator = GoogleIDToken::Validator.new
    claim = validator.check(user_params[:user], ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_ID'])
    if claim
      render json: {}, status: 204
    else
      render json: {}, status: 401
    end
  end

  private

  def user_params
    params.permit(:user)
  end
end
