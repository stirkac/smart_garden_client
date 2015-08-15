class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
  	if resource.is_a? AdminUser
  		admin_root_path
  	else
  		resource.grows.count != 1 ? grows_path : grow_path(resource.grows.first)
  	end
  end
end
