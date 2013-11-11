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
      @left_motor = 0
      @right_motor = 0
    end

    def run
      subscribe("websocket_data", :dispatch)
      @serial = SerialPort.new("/dev/tty.usbserial-AH00S7E3", "9600".to_i)
    end

    def dispatch topic, message
      @left_motor, @right_motor = message.split(",")
      debug "Left Value: #{@left_motor.inspect} Right Value: #{@right_motor.inspect}"
      debug "Left Value: #{@left_motor} Right Value: #{@right_motor}"
      @serial.write(@left_motor.to_i.chr)
      @serial.write(@right_motor.to_i.chr)
    end
  end
end
