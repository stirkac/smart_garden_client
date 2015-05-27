module ApplicationHelper

  def display_navigation
		request.path.split("/").last.length==1 || request.path.include?("/index") ? true : false
	end

end
