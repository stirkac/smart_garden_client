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
    @notifications = @grow.notifications
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
      flash[:alert] = "Error encontered while saving."
      render "new"
    end
  end

  def destroy
    Grow.find(params[:id]).delete
    flash[:notice] = "Garden removed successfully."
    redirect_to grows_path
  end

  private
  def grows_attr
    p = params.require(:grow).permit(:api_location, :name, :description, :temp_high, :temp_low, :hum_high, :hum_low, :allow_sharing)
  end

end
