-- progress.sql
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  score INTEGER,
  date DATE DEFAULT CURRENT_DATE
);