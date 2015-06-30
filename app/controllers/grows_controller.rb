include ActionView::Helpers::DateHelper
class GrowsController < ApplicationController

  before_filter :authenticate_user!

  def index
    @grows = current_user.grows
    case @grows.size
    when 0
			flash[:notice] = "Please add a new garden before continuing."
      redirect_to new_grow_path
    when 1
      redirect_to @grows.first
    end
  end

  def show
    @grow = Grow.where(id: params[:id]).eager_load(:notifications, :schedules).first
  end

  def new
    @grow = Grow.new
  end

  def update
  	@grow=Grow.find(params[:id])
  	if @grow.update(grows_attr)
  		redirect_to grow_path(@grow, anchor: "four"), notice: 'Parameters updated.'
		else
  		redirect_to @grow, error: 'Error occurred while saving data.'
		end
  end

  def create
    @grow = Grow.new(grows_attr)
    @grow.user = current_user
    if @grow.save
			flash[:notice] = "Garden saved successfully."
      redirect_to @grow
    else
      flash[:alert] = "Error encountered while saving."
      render "new"
    end
  end

  def destroy
    Grow.find(params[:id]).delete
    flash[:notice] = "Garden removed successfully."
    redirect_to grows_path
  end

  def dismiss
    Notification.where(grow_id: params[:grow_id]).not_dismissed.update_all({ dismissed: true })
    respond_to do |format|
      format.json { render json: { success: true } }
    end
  end

  def suggested_data
    @grows=Grow.by_description(params[:description])
    respond_to do |format|
      format.json { render json: { 
        hum_high: @grows.average(:hum_high),
        hum_low: @grows.average(:hum_low),
        temp_high: @grows.average(:temp_high),
        temp_low: @grows.average(:temp_low)
        } 
      }
    end
  end

  def get_devices
    devices = Device.present
    render json: devices.map {|device| {text: device.api_location, value: device.api_location, selected: false, description: "Connected #{time_ago_in_words(device.created_at)} ago.", imageSrc: "https://www.raspberrypi.org/wp-content/uploads/2012/02/Raspian_SD-150x150.png"}}
  end

  private
  def grows_attr
    p = params.require(:grow).permit(:api_location, :name, :description, :temp_high, :temp_low, :hum_high, :hum_low, :allow_sharing)
  end

end
