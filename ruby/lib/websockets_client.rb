require 'celluloid/autostart'
require 'reel'
require 'json'

require_relative "./message/battery_voltage"

module RealTimeBot
  class WebsocketsClient
    include Celluloid
    include Celluloid::IO
    include Celluloid::Notifications
    include Celluloid::Logger

    def initialize websocket
      info "starting websocket client"
      @socket = websocket
      async.run
    end

    def run
      sleep 0.2 # Just give the socket a chance to initiate? :(
      every(5) { notify_client Message::BatteryVoltage.new([3,4,5].sample) }
      while message = @socket.read
        dispatch message
      end
    end

    def dispatch(message)
      publish("websocket_data", message)
    end

    def notify_client(message_object)
      info "notify_client sending websocket the following data: #{message_object.message}"
      @socket << JSON.generate(message_object.message)
    end
  end
end
