  
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

INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off) 
            VALUES (1,'toronto','niagra',3,'toronto','niagra');
INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off) 
            VALUES (2,'ottawa','downtown',3,'ottawa','downtown');     