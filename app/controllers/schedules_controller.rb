class SchedulesController < ApplicationController

  before_filter :authenticate_user!

  def create
    @schedule = Schedule.new(schedule_attr)
    respond_to do |format|
      if @schedule.save!
          format.js do
            render partial: "schedules/schedule", locals: { :schedule => @schedule }, status: 200
          end
      else
        format.js do
          render "Error encountered while saving data.\n Please reload page or try again later!"
        end
      end
    end
  end

  private
  def schedule_attr
    p = params.require(:schedule).permit(:time, :title, :grow_id)
  end

end
