INSERT INTO Roles (name) VALUES
    ('advisor'),
    ('technician'),
    ('client');

INSERT INTO States (name) VALUES
    ('inprogress'),
    ('pending'),
    ('finished');

CALL createuser('Raúl Solano', 'abcd', 'advisor');
CALL createuser('Saúl Quesada', 'abcd', 'client');

INSERT INTO Vehicles (image, licenseplate, model, ownerid, year) VALUES (
    'https://d1hv7ee95zft1i.cloudfront.net/custom/blog-post-photo/gallery/mg-hs-624154219d3f5.jpg',
    'b32j1v4y231gj312',
    'Honda Civic',
    3,
    2020
);

INSERT INTO WorkOrders (advicercreatorid, clientid, departuredate, stateid, vehicleid) VALUES
    (2, 3, '10/15/2023', 2, 1)