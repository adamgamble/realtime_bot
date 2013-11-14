# RealTime Bot

## Backend
To run the server ...
```
rake server
```

To test the backend ...
```
rake test
```


## Frontend
To bootstrap the frontend (read, install npm and bower dependencies) ...
```
rake bootstrap
```

### Telekinesis (Remote Control)

#### Run in production mode
Visit http://localhost:1234/telekinesis in your browser.
**Note:** This assumes your serial is on /dev/tty.usbserial-AH00S7E3. If it isn't change it in ./ruby/lib/serial_publisher.rb#38

#### Run in development mode (e.g. you are editing code)
Navigate to ./javascript/telekinesis and ...
```
grunt server
```

This will give you livereload capabilities.


### Omniscient (Dashboard)
#### Run in production mode
Visit http://localhost:1234/omniscient in your browser.

#### Run in development mode (e.g. you are editing code)
Navigate to ./javascript/omniscient and ...
```
grunt server
```

This will give you livereload capabilities.
