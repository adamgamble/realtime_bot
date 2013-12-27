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

***Note: must have rabbitmq running***

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

### Omniscient (Dashboard)
#### Run in production mode
Visit http://localhost:1234/omniscient in your browser.

#### Run in development mode (e.g. you are editing code)
Navigate to ./javascript/omniscient and ...

```
grunt server
```

This will give you livereload capabilities.

## To test in style

If you want to follow our preferred testing style (run your tests after you make changes from within vim), then you need to do two things:

- Ensure `karma start` is running
- Enable per-project vimrc (https://github.com/knewter/dotfiles/commit/1d8947d72354bf614c9ebe7fc3bddd5c2fe9642b)
- Hit <leader>t when you want to run the tests (this will run whatever tests the currently started karma server is configured to look for)

Now you're testing in style!
