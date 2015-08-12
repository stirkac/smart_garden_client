class StatusNotifier
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { minutely }
  sidekiq_options retry: false

  def perform options={}
    Grow.not_updated.each do |grow|
      begin
        current_status = HTTParty.get(grow.api_location + "/current.json")
        if current_status.code < 400
          unless (current_status["humidity"].between?(grow.hum_low, grow.hum_high) and current_status["temperature"].between?(grow.temp_low, grow.temp_high))
            status=Status.new current_status
            unless Status.exists?(status.id)
              if status.save!
                Notification.new(grow: grow, status: status, dismissed: false, content: "params_not_in_range").save!
              end
            end
          end
        end
      rescue
        logger.warn("Job error: Error fetching current status: Grow##{grow.id} (#{grow.api_location})");
      end
    end
  end

end
