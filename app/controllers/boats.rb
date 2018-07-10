module API
  class BoatsController < Grape::API
    resource :boats do
      get do
        Boat.all
      end

      post do
        validate_token
        params[:user] = @current_user
        status 201
        Boat.create! params
      end

      get ':id' do
        Boat.find(params[:id]).as_json({
          include: [:comments, { user: { except: :password_digest } }],
          except: [:user_id]
        })
      end

      put ':id' do
        validate_token
        Boat.update! params[:id], params
      end

      delete ':id' do
        validate_token
        Boat.destroy params[:id]
        status 204
        ''
      end

      post ':id/comments' do
        validate_token
        boat = Boat.find(params[:id])
        boat.comments.create! params
        boat.as_json include: :comments
      end

      delete ':id/comments/:comment_id' do
        validate_token
        Comment.destroy params[:comment_id]
        Boat.find(params[:id]).as_json include: :comments
      end
    end
  end
end
