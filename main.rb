module API
  class Base < Grape::API
    format :json
    prefix :api

    rescue_from ActiveRecord::RecordNotFound do |e|
      error!({ message: 'Not Found' }, 404)
    end
    
    rescue_from ActiveRecord::RecordInvalid do |e|
      error!({ message: 'Validation failed', errors: e.record.errors.as_json }, 422)
    end

    mount API::BoatsController
    mount API::CommentsController

  end
end


Application = Rack::Builder.new do
  map "/" do
    run API::Base
  end
end
