DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "network" VARCHAR(20) NOT NULL,
    "badgeId" INT NOT NULL,
    "questionId" VARCHAR(20) NOT NULL,
    "optionIndex" INT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS answer_uk ON answers (network, "badgeId", "questionId");

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "network" VARCHAR(20) NOT NULL,
    "badgeId" INT NOT NULL,
    "pin" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "profile" VARCHAR(255),
    "linkedIn" VARCHAR(255),
    "phone" VARCHAR(255),
    "email" VARCHAR(255)
);

DROP TABLE IF EXISTS matches;

CREATE TABLE matches (
    "id" uuid DEFAULT uuid_generate_v4 (),
    "network" VARCHAR(20) NOT NULL,
    "badgeId" INT NOT NULL,
    "otherBadgeId" INT NOT NULL,
    "score" INT NOT NULL
);