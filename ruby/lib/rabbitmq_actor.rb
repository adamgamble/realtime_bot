require 'bundler'
Bundler.require
require 'celluloid/autostart'
require 'rubygems'
require "amqp"

module RealTimeBot
  class RabbitMQActor
    include Celluloid
    include Celluloid::IO
    include Celluloid::Notifications
    include Celluloid::Logger

    def initialize
      info "Starting RabbitMQ Actor"
      async.run
    end

    def run
    end

    def send_message channel, message
      info "message on channel: #{channel} ---"
      info message
      publish("rabbitmq", message)
    end

    def self.subscribe_em host, topics
      EventMachine.run do
        AMQP.connect(:host => host) do |connection|
          @actor = RealTimeBot::RabbitMQActor.new

          channel  = AMQP::Channel.new(connection)
          exchange = channel.topic("astroid_data_feed", auto_delete: true)

          topics.each do |topic|
            STDOUT.puts "Binding for #{topic}"
            channel.queue("").bind(exchange, routing_key: topic).subscribe do |metadata, payload|
              STDOUT.puts "Received a message on topic #{topic}: #{payload}. Disconnecting..."
              @actor.send_message topic, payload
            end
          end
        end
      end
    end
  end
end
