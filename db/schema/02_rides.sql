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
  pick_up VARCHAR(255) NOT NULL,
  drop_off VARCHAR(255) NOT NULL,
  ride_description TEXT,
  ride_image TEXT,  
  is_booked BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
  );