class DevicesController < ApplicationController
	def index
		if Grow.where(api_location: "http://"+request.remote_ip).empty? && Device.present.where(api_location: "http://"+request.remote_ip).empty?
			@device=Device.new(api_location: "http://"+request.remote_ip).save!
			respond_to do |format|
				format.json do
					render json: @device
				end
				format.html do
					render nothing: true
				end
			end
		else
			respond_to do |format|
				format.json do
					render json: { message: "Device already in database, registration not needed" }
				end
				format.html do
					render nothing: true, status: 404
				end
			end
		end
	end
end
