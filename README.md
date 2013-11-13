# RealTime Bot
```
ruby lib/server.rb
```

Then goto http://localhost:1234 in your browser. This assumes your serial is on
/dev/tty.usbserial-AH00S7E3. If it isn't change it in [lib/serial_publisher.rb#38](https://github.com/adamgamble/realtime_bot/blob/5e655e1bf8484ade725d519d497ca11037fc48ce/ruby/lib/serial_publisher.rb#L38)


To run the tests:

```
rspec spec/
```

