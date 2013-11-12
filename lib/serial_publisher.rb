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
    end

    def run
      subscribe("websocket_data", :dispatch)
      begin
        @serial = SerialPort.new("/dev/tty.usbserial-AH00S7E3", "19200".to_i)
      rescue
      end
    end

    def dispatch topic, message
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
