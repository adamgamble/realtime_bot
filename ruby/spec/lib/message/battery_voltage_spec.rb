require_relative '../../spec_helper'
require_relative '../../../lib/message/battery_voltage'

describe Message::BatteryVoltage do
  subject { described_class.new(value) }
  let(:value) { 5 }

  it "outputs the prescribed message format" do
    expect(subject.message).to eq({
      topic: "battery_voltage",
      data: 5
    })
  end
end
