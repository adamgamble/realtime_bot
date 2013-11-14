# RealTime Bot

## Backend
Navigate to ./ruby and ...
```
ruby lib/server.rb
```

To run the tests ...
```
rspec spec/
```


## Frontend

### Telekinesis (Remote Control)
Navigate to ./javascript/telekinesis and ...
```
npm install
bower install
grunt build
```

Visit http://localhost:1234/telekinesis in your browser.
**Note:** This assumes your serial is on /dev/tty.usbserial-AH00S7E3. If it isn't change it in ./ruby/lib/serial_publisher.rb#38


### Omniscient (Dashboard)
Navigate to ./javascript/omniscient and ...
```
npm install
bower install
grunt build
```

Visit http://localhost:1234/omniscient in your browser.
