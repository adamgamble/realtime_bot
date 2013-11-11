require 'celluloid/autostart'
require_relative 'websockets_client.rb'

module RealTimeBot
  class Server < Reel::Server
    include Celluloid
    include Celluloid::Logger
    include Celluloid::Notifications

    def initialize(host, port)
      info "RealTimeBot Websockets server starting on #{host}:#{port}"
      super(host, port, nil, &method(:on_connection))
    end

    def on_connection(connection)
      while request = connection.request
        case request
        when Reel::Request
          route_request connection, request
        when Reel::WebSocket
          info "Received a WebSocket connection"
          route_websocket request
        end
      end
    end

    def route_request(connection, request)
      connection.respond :ok, File.read("public/server.html")
    end

    def route_websocket(socket)
      WebsocketsClient.new(socket)
      info "started client"
    end
  end
end

RealTimeBot::Server.supervise_as :websockets_server, '0.0.0.0', 1234
sleep
