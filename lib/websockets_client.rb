require 'celluloid/autostart'
require 'reel'

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
      while message = @socket.read
        dispatch message
      end
    end

    def dispatch(message)
      publish("websocket_data", message)
    end
  end
end
