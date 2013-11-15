require 'bundler'
Bundler.require
require 'celluloid/autostart'
require_relative 'websockets_client.rb'
require_relative 'serial_publisher.rb'

module RealTimeBot
  class Server < Reel::Server
    include Celluloid
    include Celluloid::Logger
    include Celluloid::Notifications

    def initialize(host, port)
      info "RealTimeBot Websockets server starting on #{host}:#{port}"
      super(host, port, &method(:on_connection))
    end

    def on_connection(connection)
      connection.each_request do |request|
        if request.websocket?
          info "Received a WebSocket connection"
          handle_websocket(request.websocket)
        else
          info "Got request for #{request.url}"
          handle_request(request)
        end
      end
    end

    def handle_request(request)
      file_name = process_filename(request)
      begin
        request.respond :ok, File.read("public/#{file_name}")
      rescue
        request.respond :not_found, "404 Not Found public/#{file_name}"
      end
    end

    def process_filename request
      return "index.html" if request.url == "/"
      request.url[1..-1]
    end

    def handle_websocket(socket)
      WebsocketsClient.new(socket)
    end
  end
end

RealTimeBot::Server.supervise_as :websockets_server, '0.0.0.0', 1234
RealTimeBot::SerialPublisher.supervise_as :serial_publisher
require_relative 'rabbitmq_actor.rb'
sleep
