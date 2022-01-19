
DROP TABLE IF EXISTS rides CASCADE;
CREATE TABLE rides (
  ride_id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  date_of_ride DATE NOT NULL,
  time_of_ride TIME NOT NULL,
  cost INTEGER NOT NULL DEFAULT 11,
  available_seats INTEGER NOT NULL,
  ride_image VARCHAR(255) DEFAULT 'https://tinyurl.com/2s3kna33'
  );