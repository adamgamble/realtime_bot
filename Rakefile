task :bootstrap do
  cwd = File.dirname(__FILE__)

  STDOUT.puts "Setting up Telekinesis (Remote Control) app"
  sh "cd #{cwd}/javascript/telekinesis && bundle && npm install && bower install && grunt build"
  sh "cd #{cwd}"

  STDOUT.puts "Setting up Ominiscient (Dashboard) app"
  sh "cd #{cwd}/javascript/omniscient && bundle && npm install && bower install && grunt build"
  sh "cd #{cwd}"
end

task :test do
  STDOUT.puts "Running tests for backend"
  sh "ruby ruby/lib/server.rb"
end

task :default => :test
