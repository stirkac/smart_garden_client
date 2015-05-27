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

  private
  def grows_attr
    p = params.require(:grow).permit(:api_location, :name, :description)
  end

end