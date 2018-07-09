module API
  class AuthController < Grape::API
    post 'register' do
      User.create! params
      status 201
      { message: 'Registration successful' }
    end

    post 'login' do
      user = User.find_by_email params[:email]
      if(!user || !user.validate(params[:password]))
        status 401
        { message: 'Unauthorized' }
      else
        payload = { sub: user.id, exp: Time.now.to_i + 4 * 3600, typ: 'JWT' }
        token = JWT.encode payload, SECRET
        { user: user.as_json(except: :password_digest), token: token }
      end
    end
  end
end
