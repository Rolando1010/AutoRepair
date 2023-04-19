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