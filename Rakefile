require_relative './config/environment'

require 'sinatra/activerecord/rake'

include ActiveRecord::Tasks

DatabaseTasks.env = @env
DatabaseTasks.root = File.dirname(__FILE__)
DatabaseTasks.db_dir = @db_dir
DatabaseTasks.database_configuration = @db_conf
DatabaseTasks.migrations_paths = File.join(@db_dir, 'migrate')
