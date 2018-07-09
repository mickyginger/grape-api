Dir[File.expand_path('../../app/models/*.rb', __FILE__)].each { |file| require file }

[Boat, Comment, User].each do |model|
  ActiveRecord::Base.connection.execute("TRUNCATE #{model.table_name} RESTART IDENTITY CASCADE")
end

user1 = User.create!({
  username: 'mickyginger',
  email: 'mike.hayden@ga.co',
  password: 'password',
  password_confirmation: 'password'
})

boat1 = Boat.create!({
  name: 'Eclipse',
  length: 164,
  crew: 72,
  color: 'white',
  hp: 39_700,
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/MYEclipse-Frederikshavn-Denmark.JPG/1280px-MYEclipse-Frederikshavn-Denmark.JPG',
  location: { lat: 51.515, lng: -0.0085 },
  user: user1
})

Comment.create!({
  content: 'Create boat',
  boat: boat1
})
