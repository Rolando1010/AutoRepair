CREATE EXTENSION pgcrypto;

CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    roleID INT NOT NULL,
    FOREIGN KEY(roleID) REFERENCES Roles(id)
);

CREATE TABLE Tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(100) NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(id)
);

CREATE TABLE States (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE Vehicles (
    id SERIAL PRIMARY KEY,
    model VARCHAR(100),
    licensePlate VARCHAR(100),
    image TEXT,
    year INT,
    ownerID INT,
    FOREIGN KEY (ownerID) REFERENCES Users(id)
);

CREATE TABLE WorkOrders (
    id SERIAL PRIMARY KEY,
    entryDate TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'),
    departureDate TIMESTAMP,
    adviserCreatorID INT,
    stateID INT,
    clientID INT,
    vehicleID INT,
    FOREIGN KEY (adviserCreatorID) REFERENCES Users(id),
    FOREIGN KEY (stateID) REFERENCES States(id),
    FOREIGN KEY (clientID) REFERENCES Users(id)
);

CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    day DATE,
    technicianID INT,
    workorderID INT,
    stateID INT,
    FOREIGN KEY (technicianID) REFERENCES Users(id),
    FOREIGN KEY (workorderID) REFERENCES WorkOrders(id),
    FOREIGN KEY (stateID) REFERENCES States(id)
);

CREATE OR REPLACE PROCEDURE createUser(
    name VARCHAR(100),
    password VARCHAR(100),
    roleName VARCHAR(100)
) LANGUAGE PLPGSQL AS $$
DECLARE roleID INT; userID INT;
BEGIN
    SELECT Roles.id INTO roleID FROM Roles WHERE Roles.name = roleName;
    INSERT INTO Users (name, password, roleID) VALUES (
        name,
        crypt(password, 'autorepair'),
        roleID
    ) RETURNING id INTO userID;
END;$$

CREATE OR REPLACE FUNCTION generateUserToken(username VARCHAR(100), userpassword VARCHAR(100))
    RETURNS TABLE(usertoken VARCHAR(100)) AS $$
DECLARE logUserID INT; usertoken VARCHAR(100);
BEGIN
    SELECT Users.id
    INTO logUserID
    FROM Users
    WHERE
        Users.name = username AND
        Users.password = crypt(userpassword, 'autorepair');

    IF(logUserID IS NULL) THEN
        raise exception 'user not found';
    END IF;

    SELECT Tokens.token
    INTO usertoken
    FROM Tokens
    WHERE Tokens.userID = logUserID;

    IF(usertoken IS NULL) THEN
        INSERT INTO Tokens (token, userID)
        VALUES (md5(random()::text), logUserID)
        RETURNING token INTO usertoken;
    END IF;

    RETURN QUERY SELECT usertoken;
END; $$
LANGUAGE plpgsql;

CREATE VIEW getWorkOrders AS
SELECT
    wo.id,
    v.image as vehicle_image,
    v.model,
    v.licenseplate,
    s.name as state,
    wo.entrydate,
    wo.departuredate,
    client.name as client,
    adviser.name as creator
FROM
    WorkOrders wo,
    Vehicles v,
    States s,
    Users client,
    Users adviser
WHERE
    wo.vehicleid = v.id AND
    wo.stateid = s.id AND
    wo.clientid = client.id AND
    wo.advisercreatorid = adviser.id

CREATE OR REPLACE FUNCTION createVehicle(
    model VARCHAR(100),
    licensePlate VARCHAR(100),
    image TEXT,
    year INT,
    clientOwnerID INT
) RETURNS INT AS $$
DECLARE vehicleID INT;
BEGIN
    INSERT INTO Vehicles(model, licensePlate, image, year, ownerID)
    VALUES (model, licensePlate, image, year, clientOwnerID)
    RETURNING id INTO vehicleID;

    RETURN vehicleID;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION createWorkOrder(
    adviserCreatorID INT,
    clientID INT,
    vehicleID INT
) RETURNS INT AS $$
DECLARE workorderID INT; pendingStateID INT;
BEGIN
    SELECT id
    INTO pendingStateID
    FROM States
    WHERE name = 'pending';

    INSERT INTO WorkOrders(departureDate, adviserCreatorID, stateID, clientID, vehicleID)
    VALUES (NULL, adviserCreatorID, pendingStateID, clientID, vehicleID)
    RETURNING id INTO workorderID;

    RETURN workorderID;
END; $$
LANGUAGE plpgsql;