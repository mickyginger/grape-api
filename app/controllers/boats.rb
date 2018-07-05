module API
  class BoatsController < Grape::API
    resource :boats do
      get do
        Boat.all
      end
    end
  end
end
