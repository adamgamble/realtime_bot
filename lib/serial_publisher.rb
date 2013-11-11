require 'celluloid/autostart'
require 'serialport'

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
      @serial = SerialPort.new("/dev/tty.usbserial", "9600".to_i)
    end

    def dispatch topic, message
      debug "Dispatching #{message.inspect}"
    end
  end
end
