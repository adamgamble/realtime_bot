source "http://rubygems.org"

gem 'reel'
gem 'celluloid'
gem 'amqp'
platforms :jruby do
  gem "jruby-serialport", :git => "git://github.com/pmukerji/jruby-serialport.git"
end

platforms :ruby do
  gem "serialport", :git => "git://github.com/pmukerji/ruby-serialport.git"
end

group :test do
  gem 'rspec'
end

# Needed only for the frontend applications
gem 'compass'
gem 'zurb-foundation', '~> 3.2.5'
gem 'sass'
gem 'sass-css-importer', '1.0.0.beta.0'
