source "http://rubygems.org"

gem 'reel'
gem 'celluloid'
gem 'amqp'
gem 'pry'
platforms :jruby do
  gem "jruby-serialport", :git => "git://github.com/pmukerji/jruby-serialport.git"
end

platforms :ruby do
  gem "serialport", :git => "git://github.com/pmukerji/ruby-serialport.git"
end

group :test do
  gem 'rspec'
end
