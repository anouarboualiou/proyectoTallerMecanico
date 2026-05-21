use tallerMecanico;

CREATE TABLE clientes
(
  cli_nombre VARCHAR(250) NOT NULL,
  cli_apellidos VARCHAR(250) NOT NULL,
  cli_fecha_nac DATE NOT NULL,
  cli_telefono VARCHAR(9) NOT NULL,
  cli_email VARCHAR(250) NOT NULL,
  cli_id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (cli_id)
);

CREATE TABLE vehiculos
(
  veh_marca VARCHAR(250) NOT NULL,
  veh_modelo VARCHAR(250) NOT NULL,
  veh_imagen VARCHAR(2000) NOT NULL,
  veh_matricula VARCHAR(7) NOT NULL,
  veh_motor VARCHAR(250) NOT NULL,
  veh_combustible ENUM('Gasolina', 'Diesel', 'Híbrido', 'Eléctrico') NOT NULL,
  veh_id INT NOT NULL AUTO_INCREMENT,
  cli_id INT NOT NULL,
  PRIMARY KEY (veh_id),
  FOREIGN KEY (cli_id) REFERENCES clientes(cli_id),
  UNIQUE (veh_matricula)
);

CREATE TABLE reparaciones
(
  rep_id INT NOT NULL AUTO_INCREMENT,
  rep_fecha DATE NOT NULL,
  rep_tipo VARCHAR(250) NOT NULL,
  rep_duracion INT NOT NULL,
  rep_garantia VARCHAR(200) NOT NULL,
  rep_precio INT NOT NULL,
  veh_id INT NOT NULL,
  PRIMARY KEY (rep_id),
  FOREIGN KEY (veh_id) REFERENCES vehiculos(veh_id)
);

CREATE TABLE piezas
(
  piez_nombre VARCHAR(250) NOT NULL,
  piez_precio INT NOT NULL,
  piez_id INT NOT NULL AUTO_INCREMENT,
  piez_descripcion VARCHAR(300) NOT NULL,
  piez_referencia_cod VARCHAR(50) NOT NULL,
  PRIMARY KEY (piez_id),
  UNIQUE (piez_referencia_cod)
);

CREATE TABLE reparaciones_piezas
(
  cantidad INT NOT NULL,
  rep_id INT NOT NULL,
  piez_id INT NOT NULL,
  PRIMARY KEY (rep_id, piez_id),
  FOREIGN KEY (rep_id) REFERENCES reparaciones(rep_id),
  FOREIGN KEY (piez_id) REFERENCES piezas(piez_id)
);

INSERT INTO piezas (
    piez_nombre,
    piez_precio,
    piez_id,
    piez_descripcion,
    piez_referencia_cod
) VALUES
('Filtro de aceite Bosch', 12.50, 1, 'Filtro de aceite compatible con motores gasolina', 'BOS-FILT-001'),
('Pastillas de freno delanteras Brembo', 45.99, 2, 'Juego de pastillas de freno delanteras', 'BRE-FREN-002'),
('Batería 12V Varta', 89.90, 3, 'Batería de coche 12V 70Ah', 'VAR-BAT-003'),
('Amortiguador trasero Monroe', 74.25, 4, 'Amortiguador hidráulico trasero', 'MON-AMOR-004'),
('Correa de distribución Gates', 65.40, 5, 'Correa reforzada para motor diésel', 'GAT-CORR-005'),
('Bujía NGK Iridium', 18.75, 6, 'Bujía de alto rendimiento iridium', 'NGK-BUJ-006'),
('Radiador Valeo', 120.00, 7, 'Radiador de refrigeración aluminio', 'VAL-RAD-007'),
('Aceite мотор 5W30 Castrol', 39.99, 8, 'Aceite sintético 5 litros', 'CAS-ACE-008'),
('Filtro de aire Mann', 15.60, 9, 'Filtro de aire para motor gasolina', 'MAN-AIR-009'),
('Disco de freno TRW', 55.20, 10, 'Disco de freno ventilado delantero', 'TRW-DISC-010'),
('Alternador Denso', 210.50, 11, 'Alternador 120A compatible Toyota', 'DEN-ALT-011'),
('Motor de arranque Valeo', 175.80, 12, 'Motor de arranque eléctrico', 'VAL-ARR-012'),
('Sensor ABS Delphi', 48.30, 13, 'Sensor ABS rueda delantera', 'DEL-ABS-013'),
('Filtro de combustible Bosch', 22.10, 14, 'Filtro para sistema diésel', 'BOS-COMB-014'),
('Kit de embrague Luk', 320.00, 15, 'Kit completo de embrague', 'LUK-EMB-015');

INSERT INTO piezas (
    piez_nombre,
    piez_precio,
    piez_id,
    piez_descripcion,
    piez_referencia_cod
) VALUES
('Turbo Garrett GT1749', 850.00, 16, 'Turbo compatible con motores diésel 2.0', 'GAR-TURBO-016'),
('Turbo Holset HX35', 1250.50, 17, 'Turbo de alto rendimiento para camiones y deportivos', 'HOL-TURBO-017'),
('Kit de embrague Sachs', 410.75, 18, 'Kit completo de embrague reforzado', 'SAC-EMB-018'),
('Disco de embrague Valeo', 180.40, 19, 'Disco de embrague para transmisión manual', 'VAL-EMB-019'),
('Collarín hidráulico Luk', 95.30, 20, 'Collarín hidráulico para sistema de embrague', 'LUK-COLL-020'),
('Volante bimasa Exedy', 620.00, 21, 'Volante motor bimasa alta durabilidad', 'EXE-BIM-021'),
('Turbo IHI RHF5', 980.99, 22, 'Turbo compacto para motores gasolina turbo', 'IHI-TURBO-022'),
('Embrague deportivo AP Racing', 730.60, 23, 'Embrague cerámico de competición', 'APR-EMB-023');


INSERT INTO clientes (
    cli_nombre,
    cli_apellidos,
    cli_fecha_nac,
    cli_telefono,
    cli_email
) VALUES
(
    'Carlos',
    'Fernández Ruiz',
    '1985-03-14',
    '612345678',
    'carlos.fernandez@gmail.com'
),
(
    'Lucía',
    'Martínez Gómez',
    '1992-07-21',
    '623456789',
    'lucia.martinez@gmail.com'
),
(
    'David',
    'Sánchez López',
    '1978-11-02',
    '634567891',
    'david.sanchez@gmail.com'
),
(
    'Marta',
    'Pérez Navarro',
    '1995-01-18',
    '645678912',
    'marta.perez@gmail.com'
),
(
    'Alejandro',
    'Romero Díaz',
    '1988-09-30',
    '656789123',
    'alejandro.romero@gmail.com'
),
(
    'Sofía',
    'Jiménez Torres',
    '1999-05-11',
    '667891234',
    'sofia.jimenez@gmail.com'
),
(
    'Javier',
    'Morales Castillo',
    '1983-12-27',
    '678912345',
    'javier.morales@gmail.com'
);

INSERT INTO vehiculos (
    veh_marca,
    veh_modelo,
    veh_matricula,
    veh_motor,
    veh_combustible,
    cli_id
) VALUES
(
    'BMW',
    '320d',
    '4821KLM',
    '2.0 Diesel',
    'Diesel',
    7
),
(
    'Audi',
    'A4',
    '7312JRT',
    '2.0 TDI',
    'Diesel',
    8
),
(
    'Mercedes',
    'Clase C',
    '1945LPS',
    '220 CDI',
    'Diesel',
    9
),
(
    'Seat',
    'León FR',
    '5501MNV',
    '1.5 TSI',
    'Gasolina',
    10
),
(
    'Toyota',
    'Corolla',
    '8842TRX',
    '180H',
    'Híbrido',
    11
),
(
    'Tesla',
    'Model 3',
    '1120EVX',
    'Long Range',
    'Eléctrico',
    12
),
(
    'Volkswagen',
    'Golf GTD',
    '6677QWE',
    '2.0 TDI',
    'Diesel',
    13
);