require 'crack'
require 'serialport'

# create a new serial port connection
sp = SerialPort.new("/dev/ttyUSB0", 9600)
# wait for serial port to initialize
sleep(0.03)
# parse the json response from the serial port
battery_life = Crack::JSON.parse(/{.+}/.match(sp.read).to_s)
# close the serial port when finished
sp.close
# output the response
puts battery_life
