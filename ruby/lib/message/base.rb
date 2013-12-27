module Message
  class Base
    def initialize(value)
      @value = nil
    end

    def message
      raise "No Topic Defined for #{self.inspect}" unless @topic
      {
        topic: @topic,
        data: value
      }
    end
  end
end
