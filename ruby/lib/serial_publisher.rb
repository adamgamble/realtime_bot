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
      ENV["ruby_environment"] == "test" ? run : async.run
    end

    def run
      setup_serial
      set_last_signal
      start_shutdown_timer
      subscribe("websocket_data", :dispatch)
    end

    def dispatch topic, message
      @last_signal = Time.now
      begin
        left_motor, right_motor = message.split(",")
        debug "Left Value: #{left_motor} Right Value: #{right_motor}"
        @serial.write(left_motor.to_i.chr)
        @serial.write(right_motor.to_i.chr)
      rescue
        debug "Attempted to write values to serial port, but failed"
      end
    end

    private
    def serial_port
      "/dev/tty.usbserial-AH00S7E3"
    end

    def shutdown_everything!
      begin
        @serial.write 0.chr
      rescue
        debug "Oh crap writing the shutdown to the serial failed. We're screwed."
      end
    end

    def set_last_signal time = Time.now
      @last_signal = time
    end

    def setup_serial
      begin
        @serial = SerialPort.new(serial_port, "19200".to_i)
      rescue
        debug "Couldn't open serial port #{serial_port}. Terminating"
        terminate
      end
    end

    def info text
      super unless ENV["ruby_environment"] == "test"
    end

    def debug text
      super unless ENV["ruby_environment"] == "test"
    end

    def start_shutdown_timer
      if ENV["ruby_environment"] == "test"
        every 1 do
          if (Time.now - 1) > @last_signal
            debug "SHUTDOWN EVERYTHING"
            shutdown_everything!
          end
        end
      end
    end
  end
end
