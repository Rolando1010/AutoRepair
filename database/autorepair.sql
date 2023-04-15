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
    INSERT INTO Tokens (token, userid) VALUES (md5(random()::text), userID);
END;$$