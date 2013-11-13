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
      info message
      publish("rabbitmq", message)
    end
  end
end

EventMachine.run do
  AMQP.connect(:host => '127.0.0.1') do |connection|
    puts "Connected to AMQP broker."
    @actor = RealTimeBot::RabbitMQActor.new

    channel  = AMQP::Channel.new(connection)

    channel.queue("amqpgem.examples.helloworld", :auto_delete => true).subscribe do |payload|
      puts "Received a message: #{payload}. Disconnecting..."
      @actor.send_message nil, payload
    end
  end
end
