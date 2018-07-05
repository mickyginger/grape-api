require 'bundler/setup'

require 'sinatra/activerecord/rake'

include ActiveRecord::Tasks

db_dir = File.expand_path('../db', __FILE__)

DatabaseTasks.env = ENV['ENV'] || 'development'
DatabaseTasks.root = File.dirname(__FILE__)
DatabaseTasks.db_dir = db_dir
DatabaseTasks.database_configuration = YAML.load(File.read(File.join(db_dir, 'config.yml')))
DatabaseTasks.migrations_paths = File.join(db_dir, 'migrate')

ActiveRecord::Base.configurations = DatabaseTasks.database_configuration
ActiveRecord::Base.establish_connection DatabaseTasks.env.to_sym
