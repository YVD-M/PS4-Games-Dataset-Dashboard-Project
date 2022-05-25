-- Create table ps4_gamessales for raw data to be loaded into in PS4_GamesSales_db
CREATE TABLE ps4_gamessales (
    "Game" VARCHAR(200),
    "Year" VARCHAR(200), 
    "Genre" VARCHAR(200),
    "Publisher" VARCHAR(200),
    "North America" VARCHAR(200),
    "Europe" VARCHAR(200),
    "Japan" VARCHAR(200),
    "Rest of World" VARCHAR(200),
    "Global" VARCHAR(200)
);

ALTER TABLE ps4_gamessales 
RENAME COLUMN "North America" TO "NorthAmerica";

ALTER TABLE ps4_gamessales 
RENAME COLUMN "Rest of World" TO "RestofWorld";
