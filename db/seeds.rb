Dir[File.expand_path('../../app/models/*.rb', __FILE__)].each { |file| require file }

[Criminal, User].each do |model|
  ActiveRecord::Base.connection.execute("TRUNCATE #{model.table_name} RESTART IDENTITY CASCADE")
end

user1 = User.create!({
  username: 'mickyginger',
  email: 'mike.hayden@ga.co',
  password: 'password',
  password_confirmation: 'password'
})

Criminal.create!({
  name: 'Jack the Ripper',
  crimes: ['Murder'],
  image: 'http://www.jackripper.co.uk/images/jack-ripper-filler-690x460.jpg',
  status: 'Deceased',
  last_known_location: { lat: 51.5199795, lng: -0.056891 },
  user: user1,
  associates: []
})

ronnie = Criminal.create!({
  name: 'Ronnie Kray',
  crimes: ['Murder', 'Extortion', 'Racketeering', 'Battery'],
  image: 'https://www.biography.com/.image/t_share/MTU1MTU1Njk2MjUyMzY0NzU4/ronnie-1933---1995-they-were-found-guilty-of-murder-in-1969-after-a-trial-at-the-old-bailey-photo-by-william-lovelace_daily-express_hulton-archive_getty-images.jpg',
  status: 'Deceased',
  dob: '1933-10-24',
  last_known_location: { lat: 51.5199795, lng: -0.056891 },
  user: user1
})

reggie = Criminal.create!({
  name: 'Reggie Kray',
  crimes: ['Murder', 'Extortion', 'Racketeering', 'Battery'],
  image: 'https://vignette.wikia.nocookie.net/thekraytwins/images/7/75/Reggiekray3.jpg/revision/latest?cb=20180107162306',
  status: 'Deceased',
  dob: '1933-10-24',
  last_known_location: { lat: 51.5199795, lng: -0.056891 },
  user: user1
})

reggie.associates = [ronnie]
ronnie.associates = [reggie]

reggie.save!
ronnie.save!
