module ApplicationHelper

  def get_api_address
    return ENV["API_ADDRESS"]
  end

  def display_navigation
		request.path.split("/").last.length==1 || request.path.include?("/index") ? true : false
	end

end
