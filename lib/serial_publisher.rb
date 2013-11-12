require 'celluloid/autostart'
require 'rubygems'
require "serialport"

module RealTimeBot
  class SerialPublisher
    include Celluloid
    include Celluloid::IO
    include Celluloid::Notifications
    include Celluloid::Logger

    def initialize
      info "Starting Serial Publisher"
      async.run
      @last_signal = Time.now
    end

    def shutdown_everything!
      begin
        @serial.write 0.chr
      rescue
      end
    end

    def run
      subscribe("websocket_data", :dispatch)
      every 1 do
        if (Time.now - 1) > @last_signal
          debug "SHUTDOWN EVERYTHING"
          shutdown_everything!
        end
      end
      begin
        @serial = SerialPort.new("/dev/ttyUSB0", "19200".to_i)
      rescue
      end
    end

    def dispatch topic, message
      @last_signal = Time.now
      left_motor, right_motor = message.split(",")
      debug "Left Value: #{left_motor} Right Value: #{right_motor}"
      begin
        @serial.write(left_motor.to_i.chr)
        @serial.write(right_motor.to_i.chr)
      rescue
      end
    end
  end
end
