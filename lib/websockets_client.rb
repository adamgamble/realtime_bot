require 'celluloid/autostart'
require 'reel'

module RealTimeBot
  class WebsocketsClient
    include Celluloid
    include Celluloid::IO
    include Celluloid::Notifications
    include Celluloid::Logger

    def initialize websocket
      info "starting ws client"
      @socket = websocket
      async.run
    end

    def run
      sleep 0.2 # Just give the socket a chance to initiate? :(
      while message = JSON.parse(@socket.read)
        dispatch message
      end
    rescue EOFError
      info "left"
      terminate
    end

    def dispatch(message)
      debug "Dispatching #{message.inspect}"
      publish("websocket_data", message)
    end
  end
end
