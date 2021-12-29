  
  -- owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  -- from VARCHAR(255) NOT NULL,
  -- to VARCHAR(255) NOT NULL,
  
  -- cost INTEGER NOT NULL DEFAULT 11,
  -- available_seats INTEGER NOT NULL,
  -- pick_up VARCHAR(255) NOT NULL,
  -- drop_off VARCHAR(255) NOT NULL,
  -- description TEXT,
  -- is_booked BOOLEAN NOT NULL DEFAULT FALSE,
  -- is_active BOOLEAN NOT NULL DEFAULT TRUE,DROP TABLE IF EXISTS users CASCADE;

INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off,date_of_ride,time_of_ride,ride_image) 
            VALUES (1,'Toronto, ON, Canada','Niagara Falls, ON, Canada',3,'126,Brook Street','2nd Avenue Niagra Falls City','2022-02-02','8:00:00','https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off,date_of_ride,time_of_ride,ride_image) 
            VALUES (2,'Hamilton, ON, Canada','Brampton, ON, Canada',3,'126,Brook Street','123,York street','2022-02-02','8:00:00','https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'); 
INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off,date_of_ride,time_of_ride,ride_image) 
            VALUES (1,'Mississauga, ON, Canada','Niagara Falls, ON, Canada',3,'3rd Avenue WilliStreet','2nd Avenue Niagra Falls City','2022-02-02','8:59:00','https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off,date_of_ride,time_of_ride,ride_image) 
            VALUES (2,'Churchville, Brampton, ON, Canada','Brampton, ON, Canada',3,'126,Camilo Street','123,Kempstreet','2022-02-02','12:00:00','https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off,date_of_ride,time_of_ride,ride_image) 
            VALUES (3,'Toronto, ON, Canada','Niagara Falls, ON, Canada',3,'126,Brook Street','2nd Avenue Niagra Falls City','2022-02-03','3:00:00','https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');                 
