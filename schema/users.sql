CREATE TABLE IF NOT EXISTS users (
    uid SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    keyward VARCHAR(128) NOT NULL,
    hint TEXT
    twitter_id VARCHAR(128) NOT NULL,
    generation INTEGER NOT NULL,
    content TEXT NOT NULL,
    slack_id VARCHAR(128),
    picture TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
