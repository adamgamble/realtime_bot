# RealTime Bot

## Pre-requisites
You need [RabbitMQ](http://www.rabbitmq.com/download.html) installed and
running.

**OSX**
```
brew install rabbitmq
```

**Ubuntu**
```
sudo apt-get install rabbitmq-server
```


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

If you ever see complaints about a dependency being missing for npm or bower,
just manually run:
```
npm install
bower install
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
