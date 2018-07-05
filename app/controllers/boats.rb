module API
  class BoatsController < Grape::API
    resource :boats do
      get do
        Boat.all
      end

      post do
        Boat.create! params
      end

      get ':id' do
        Boat.find(params[:id]).as_json include: :comments
      end

      put ':id' do
        Boat.update! params[:id], params
      end

      delete ':id' do
        Boat.destroy params[:id]
        status 204
        ''
      end
    end
  end
end
