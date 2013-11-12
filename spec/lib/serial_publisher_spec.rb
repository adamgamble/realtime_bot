require 'spec_helper'
require_relative '../../lib/serial_publisher.rb'

describe RealTimeBot::SerialPublisher do
  subject { RealTimeBot::SerialPublisher }

  context "Serial Port Stuffs" do
    let(:serial_port) { double }

    context "writing to the serial port" do
      before do
        expect(SerialPort).to receive(:new) { serial_port }
      end

      it "should write to the serial port values it receives" do
        expect(serial_port).to receive(:write).with(10.chr).once
        expect(serial_port).to receive(:write).with(20.chr).once
        subject.new.dispatch nil, "10,20"
      end
    end
  end
end

