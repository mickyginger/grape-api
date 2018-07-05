module API
  class Base < Grape::API
    format :json
    prefix :api

    mount API::BoatsController
  end
end


Application = Rack::Builder.new do
  map "/" do
    run API::Base
  end
end
