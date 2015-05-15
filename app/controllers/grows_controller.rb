class GrowsController < ApplicationController

  before_filter :authenticate_user!

  def index
    @grows = current_user.grows
    case @grows.size
    when 0
      redirect_to new_grow_path
    when 1
      redirect_to @grows.first
    end
  end

  def show
    @grow = current_user.grows.find(params[:id])
  end

  def new
    @grow = Grow.new
  end

  def create
    @grow = Grow.new(grows_attr)
    @grow.user = current_user
    if @grow.save
      redirect_to @grow
    else
      flash[:alert] = "Napaka."
      render "new"
    end
  end

  private
  def grows_attr
    p = params.require(:grow).permit(:api_location, :name, :description)
  end

end
