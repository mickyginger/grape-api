Dir[File.expand_path('../../app/models/*.rb', __FILE__)].each { |file| require file }

[Boat].each do |model|
  ActiveRecord::Base.connection.execute("TRUNCATE #{model.table_name} RESTART IDENTITY")
end

Boat.create!({
  name: 'Eclipse',
  length: 164,
  crew: 72,
  color: 'white',
  hp: 39_700,
  image: 'https://en.wikipedia.org/wiki/Eclipse_(yacht)#/media/File:MYEclipse-Frederikshavn-Denmark.JPG',
  location: { lat: 51.515, lng: -0.0085 }
})
