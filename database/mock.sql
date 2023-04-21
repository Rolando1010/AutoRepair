INSERT INTO Roles (name) VALUES
    ('adviser'),
    ('technician'),
    ('client');

INSERT INTO States (name) VALUES
    ('inprogress'),
    ('pending'),
    ('finished');

CALL createuser('Raúl Solano', 'abcd', 'adviser');
CALL createuser('Saúl Quesada', 'abcd', 'client');

INSERT INTO Vehicles (image, licenseplate, model, ownerid, year) VALUES (
    'https://d1hv7ee95zft1i.cloudfront.net/custom/blog-post-photo/gallery/mg-hs-624154219d3f5.jpg',
    'b32j1v4y231gj312',
    'Honda Civic',
    2,
    2020
);

INSERT INTO WorkOrders (advisercreatorid, clientid, departuredate, stateid, vehicleid) VALUES
    (1, 2, '10/15/2023', 2, 1)