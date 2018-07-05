module API
  class CommentsController < Grape::API
    resource :comments do
      post do
        Comment.create! params
      end

      delete ':id' do
        Comment.destroy params[:id]
        status 204
        ''
      end
    end
  end
end
