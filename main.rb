module API
  class Base < Grape::API
    format :json

    rescue_from ActiveRecord::RecordNotFound do |e|
      error!({ message: 'Not Found' }, 404)
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      p e
      error!({ message: 'Validation failed', errors: e.record.errors.as_json }, 422)
    end

    rescue_from ActiveModel::UnknownAttributeError do |e|
      p e
      error!({ message: 'Bad request' }, 400)
    end

    rescue_from :all do |e|
      p e
      error!({ message: 'Internal server error' }, 500)
    end

    helpers do
      def validate_token
        begin
          token = headers['Authorization'].split[-1]
          payload = JWT.decode(token, 'ssh')[0]
          @current_user = User.find(payload['sub'])
        rescue => e
          p e
          error!({ message: 'Unauthorized' }, 401)
        end
      end

      def permitted_params
        @permitted_params ||= declared(params, include_missing: false)
      end
    end

    mount CriminalsController
    mount AuthController

  end
end


Application = Rack::Builder.new do
  use Rack::Static, urls: ["!/api"], root: 'public', index: 'index.html'

  map "/api" do
    run API::Base
  end

end
