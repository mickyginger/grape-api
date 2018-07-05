require 'rubygems'
require 'bundler'
Bundler.require(:default)

Dir[File.expand_path('../app/**/*.rb', __FILE__)].sort!.each { |file| require file }

env = ENV['ENV'] || 'development'
db_dir = File.expand_path('../db', __FILE__)
database_configuration = YAML.load(File.read(File.join(db_dir, 'config.yml')))
ActiveRecord::Base.establish_connection database_configuration[env]

require_relative './main'
run Application
