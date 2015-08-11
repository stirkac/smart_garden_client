class DevicesController < ApplicationController
	
	skip_before_filter  :verify_authenticity_token

	def index
		if Grow.where(api_location: "http://"+request.remote_ip).empty? || Device.present.where(api_location: "http://"+request.remote_ip).empty?
			@device=Device.new(api_location: "http://"+request.remote_ip).save!
			respond_to do |format|
				format.json do
					render json: @device, status: 200
				end
				format.html do
					render nothing: true, status: 200
				end
			end
		else
			respond_to do |format|
				format.json do
					render json: { message: "Device already in database, registration not needed" }, status: 304
				end
				format.html do
					render nothing: true, status: 304
				end
			end
		end
	end
end
