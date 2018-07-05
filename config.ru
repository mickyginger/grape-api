require 'rubygems'
require 'bundler'
Bundler.require(:default)

Dir["#{File.dirname(__FILE__)}/app/**/*.rb"].each { |file| require file }

require_relative './main'
run Application
