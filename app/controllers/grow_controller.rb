class GrowController < ApplicationController

  before_filter :authenticate_user!

  def index
    @grows = current_user.grows
    if(@grows.size==1)
      redirect_to @grows.first
    end
  end

  def show
    @grow = current_user.grows.find(params[:id])
  end

  def new
    @grow = Grow.new
  end

end
