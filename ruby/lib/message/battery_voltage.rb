require_relative './base'

module Message
  class BatteryVoltage < ::Message::Base
    attr_reader :value

    def initialize(value)
      @value = value
      @topic = "battery_voltage"
    end
  end
end
