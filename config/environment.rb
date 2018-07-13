require 'rubygems'
require 'bundler'
Bundler.require(:default)

Dir[File.expand_path('../../app/**/*.rb', __FILE__)].each { |file| require file }

@env = ENV['ENV'] || 'development'

@db_conf = YAML.load(File.read('config/database.yml'))
@db_dir = File.expand_path('../../db', __FILE__)

ActiveRecord::Base.establish_connection @db_conf[@env]
