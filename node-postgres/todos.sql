DROP DATABASE IF EXISTS todos;
CREATE DATABASE todos;

\c todos;

CREATE TABLE todos (
  ID SERIAL PRIMARY KEY,
  task VARCHAR NOT NULL,
  status INTEGER NOT NULL
);

INSERT INTO todos (task, status)
  VALUES ('Call Mom', '0');