class ApplicationController < ActionController::API
  include ActionController::Cookies

  def current_user
    @current_user ||= User.find_by(id: request.session[:user_id]) if request.session[:user_id]
  end
end
