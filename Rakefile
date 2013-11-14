task :bootstrap do
  cwd = File.dirname(__FILE__)

  STDOUT.puts "Setting up Telekinesis (Remote Control) app"
  sh "cd #{cwd}/javascript/telekinesis && bundle && npm install && bower install && grunt build --force"
  sh "cd #{cwd}"

  STDOUT.puts "Setting up Ominiscient (Dashboard) app"
  sh "cd #{cwd}/javascript/omniscient && bundle && npm install && bower install && grunt build --force"
  sh "cd #{cwd}"
end

task :server do
  STDOUT.puts "Running server for backend"
  sh "ruby ruby/lib/server.rb"
end

task :test do
  STDOUT.puts "Running tests for backend"
  sh "rspec ruby/spec"
end

task :default => :server
