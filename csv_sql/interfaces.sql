-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2013 a las 22:58:46
-- Versión del servidor: 5.5.32
-- Versión de PHP: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `interfaces`
--
CREATE DATABASE IF NOT EXISTS `interfaces` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `interfaces`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE IF NOT EXISTS `comentarios` (
  `nombreUsuario` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `nombreLocal` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `texto` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla para almacenar los comentarios de los usuarios en los locales';

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`nombreUsuario`, `nombreLocal`, `texto`) VALUES
('', 'EL DRAGUIT', 'Pepeee'),
('', 'CUEVAS, LA', 'Ilaaaa\nXz'),
('', 'CUEVAS, LA', 'Que wena tioooo :)\n'),
('', 'EL DRAGUIT', ''),
('', 'SAN ROQUE', 'Lo malo de este bar puede ser que en medio del mar es poco accesible no? Jajaja'),
('No Identif', 'PUNTO LIMI', 'K pizzasss :)\n'),
('No Identif', 'PUNTO LIMI', 'K pizzasss :)\n'),
('No Identif', 'PUNTO LIMI', 'K pizzasss :)\n'),
('No Identif', 'CUEVAS, LA', 'Este bar tiene una buena nota media xD\n'),
('No Identif', 'CUEVAS, LA', 'Este bar tiene una buena nota media xD\n'),
('No Identif', 'PUNTO LIMI', 'Aaaaaaaaa '),
('No Identif', 'MONJE, EL', 'Holaaaa'),
('No Identif', 'CUEVAS, LA', 'Afghgtg\n'),
('No Identif', 'CUEVAS, LA', 'Afghgtg\n'),
('No Identif', 'SAN BARTOL', 'K kkkk'),
('No Identif', 'SAN ROQUE', 'Sii'),
('No Identif', 'MARY', 'Pone ruedita cuando se este cargando\n'),
('No Identif', 'CUEVAS, LA', 'Amalia eres bobaaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establecimientos`
--

CREATE TABLE IF NOT EXISTS `establecimientos` (
  `nombre` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `tipo` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `dir` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `lat` double(11,8) NOT NULL,
  `long` double(11,8) NOT NULL,
  `plazas` int(5) NOT NULL
) ENGINE=CSV DEFAULT CHARSET=latin1 COMMENT='Tabla para almacenar las definiciones de los establecimientos de la aplicación';

--
-- Volcado de datos para la tabla `establecimientos`
--

INSERT INTO `establecimientos` (`nombre`, `tipo`, `dir`, `lat`, `long`, `plazas`) VALUES
('MOOS', 'BEBER', 'C/ HERRADORES, 69', 28.48881616, -16.31808758, 16),
('CHINO THAN', 'COMER', 'TIZON, 4', 28.37079000, -16.31521750, 32),
('CIUDAD LAG', 'COMER', 'LA CUESTA-TACO CTRA. ESQ. LAS ', 28.37322200, -16.31476520, 161),
('COCOTERO', 'BEBER', 'GUAJARA, L110 B C.C.', 28.37208700, -16.31488980, 48),
('CUEVAS, LA', 'BEBER', 'C/ JOSE RODRIGUEZ AMADOR, 25', 28.53420561, -16.36116654, 45),
('EL DRAGUIT', 'COMER', 'CAMINO PICO BERMEJO, 16 (ANTES', 28.52874096, -16.35993004, 50),
('EL TIMPLE', 'COMER', 'C/ ELIAS SERRA RAFOLS, 4 DCHA.', 28.48410121, -16.31453633, 30),
('FUENTE, LA', 'BEBER', 'PRINCESA YBALLA BLQ. 30, LOCAL', 28.37382500, -16.31495990, 20),
('FUSION, LA', 'BEBER', 'C/. SAN JUAN, 10-12', 28.37107700, -16.31519960, 67),
('GUACHINCHE', 'COMER', 'C/ LOS CHINCANAYROS, 3', 28.50504104, -16.30085707, 20),
('GUACIMARA', 'BEBER', 'SAN LORENZO, 11 ', 28.45367413, -16.30110785, 20),
('KEYSA', 'BEBER', 'EL PASO, 13 AVDA.', 28.37248100, -16.31484030, 21),
('LA FONTANA', 'BEBER', 'C/. TOMAS GONZALEZ RIVERO, 32 ', 28.36697800, -16.31569950, 40),
('LA GUARDIA', 'BEBER', 'ASCANIO Y NIEVES, 11', 28.49067143, -16.31855965, 30),
('LA TACITA ', 'BEBER', 'DOCTOR ANTONIO GONZALEZ, 4', 28.48499825, -16.31477237, 50),
('LAGUNA SEC', 'BEBER', 'LAS GAVIAS, 124', 28.36962100, -16.31531150, 52),
('LATOPA', 'COMER', 'HERACLIO SANCHEZ, S/N. (C.C. G', 28.37117900, -16.31516270, 57),
('LOS MENCEY', 'COMER', 'AVDA. DE LOS MENCEYES, 441 (AN', 28.46656347, -16.28312118, 54),
('MARACANA', 'BEBER', 'GENERAL SANTA CRUZ-LAGUNA, 327', 28.37376100, -16.31498370, 59),
('MARY', 'BEBER', 'AVDA. LA UNION, 14. (URB. LA H', 28.46495165, -16.30684644, 21),
('MERELE', 'BEBER', 'C.C. ALCAMPO, L-24', 28.37221700, -16.31492050, 14),
('MONJE, EL', 'BEBER', 'LOS MAJUELOS AVDA. , 95 (URB. ', 28.44847783, -16.30552103, 36),
('OCEAN PACI', 'COMER', 'PLAZA DOCTOR OLIVERA, 8 - ESQ.', 28.48996658, -16.32057130, 50),
('PANSECO I', 'BEBER', 'C/. SANTO TOMAS DE AQUINO, 2', 28.37290500, -16.31470830, 19),
('PARQUE LA ', 'BEBER', 'QUINTIN BENITO, S/N. (PARQUE L', 28.37116400, -16.31526730, 16),
('PARQUE LA ', 'BEBER', 'PARQUE LA VEGA S/N (LA VEGA)', 28.37147100, -16.31529020, 59),
('PASO, EL', 'BEBER', 'AVDA. EL PASO, 27/L-6 ', 28.37263700, -16.31488520, 31),
('PICCOLA, L', 'BEBER', 'DR. ANTONIO GONZALEZ, 11 (EDIF', 28.37122700, -16.31514060, 35),
('PINO, EL', 'COMER', 'RODRIGUEZ MOURE, 8', 28.37121800, -16.31524620, 81),
('PIZZA ROSS', 'COMER', 'MARQUES DE CELADA, 45', 28.37052200, -16.31522710, 70),
('PUNTO LIMI', 'COMER', 'JOSE RODRIGUEZ AMADOR, 4', 28.36672600, -16.31570820, 34),
('RODEOS, LO', 'COMER', 'GENERAL LOS RODEOS, 18 CTRA. (', 28.36747800, -16.31523150, 28),
('SAN BARTOL', 'COMER', 'CTRA. SAN BARTOLOME DE GENETO,', 28.46174828, -16.30808911, 85),
('SAN ROQUE', 'BEBER', 'JUAN FERNANDEZ, 45 (SAN ROQUE)', 28.36362300, -16.31558330, 20),
('SANTA CRUZ', 'BEBER', 'TACO, 145 AVDA.', 28.37290700, -16.31475080, 31),
('SCOOTER', 'BEBER', 'C/ VIANA, 3, LOCAL 2', 28.48712352, -16.31515324, 79),
('SILBO GOME', 'COMER', 'VOLCAN ELENA, 9', 28.37725230, -16.31487780, 36),
('SOLERA IBE', 'COMER', 'C/ ASCANIO Y NIEVES, 9', 28.49051996, -16.31862144, 20),
('STOP', 'COMER', 'REPUBLICA ARGENTINA, 103 AVDA.', 28.37178100, -16.31541940, 20),
('TAJAQU', 'BEBER', 'SANTO DOMINGO, S/N. (EDIF. MOL', 28.37140500, -16.31516440, 33),
('TAMARAN', 'BEBER', 'CMNO. DE LA VILLA, 62 ', 28.37008000, -16.31517120, 10),
('TARAJALES,', 'COMER', 'GRAN PODER, EDF. PISCINAS N', 28.36843100, -16.31593760, 64),
('TASCA GRIL', 'COMER', 'AEROPUERTO TENERIFE NORTE', 28.36832400, -16.31519850, 106),
('TASCA RINC', 'BEBER', 'CTRA. MONTE DE LAS MERCEDES, 5', 28.37220300, -16.31547640, 30),
('THE PIZZA ', 'COMER', 'SAN MIGUEL DE CHIMISAY, 115', 28.37275700, -16.31480170, 20),
('TIVOLI', 'BEBER', 'C/. SAN VICENTE, 2 (EDIF. TIVO', 28.37298100, -16.31482100, 30),
('TOMAS II', 'BEBER', 'SANTO DOMINGO CUSTODIO, 4 (ANT', 28.45285445, -16.29881920, 17),
('VERBENA, E', 'COMER', 'C/ ACHAMAN TACO, 5 BAJO TRANS.', 28.37199100, -16.31488330, 55),
('VIRUTA', 'BEBER', 'REPUBLICA DE VENEZUELA, 98 ', 28.48255906, -16.32566898, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `nombre` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=CSV DEFAULT CHARSET=latin1 COMMENT='Tabla para almacenar las cuentas para el login de la aplicación';

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `password`) VALUES
('maikel', '1111'),
('tinguaro', '2222'),
('guillermo', '3333');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones`
--

CREATE TABLE IF NOT EXISTS `valoraciones` (
  `nombreUsuario` text COLLATE utf8_spanish_ci NOT NULL,
  `nombreLocal` text COLLATE utf8_spanish_ci NOT NULL,
  `puntos` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla para almacenar las valoraciones de los usuarios a los locales';

--
-- Volcado de datos para la tabla `valoraciones`
--

INSERT INTO `valoraciones` (`nombreUsuario`, `nombreLocal`, `puntos`) VALUES
('', 'EL DRAGUIT', 5),
('', 'EL DRAGUIT', 3),
('', 'CUEVAS, LA', 5),
('', 'CUEVAS, LA', 3),
('', 'CUEVAS, LA', 5),
('', 'CUEVAS, LA', 3),
('', 'CUEVAS, LA', 5),
('', 'CUEVAS, LA', 2),
('', 'CUEVAS, LA', 5),
('', 'CUEVAS, LA', 3),
('', 'CUEVAS, LA', 5),
('', 'CUEVAS, LA', 5),
('', 'SAN ROQUE', 4),
('', 'VIRUTA', 3),
('', 'COCOTERO', 5),
('', 'COCOTERO', 4),
('', 'COCOTERO', 3),
('', 'COCOTERO', 2),
('', 'LAGUNA SEC', 1),
('', 'PUNTO LIMI', 5),
('', 'PUNTO LIMI', 1),
('', 'PUNTO LIMI', 2),
('', 'PUNTO LIMI', 5),
('', 'CUEVAS, LA', 3),
('', 'MARY', 3),
('maikel', 'CUEVAS, LA', 4),
('maikel', 'CUEVAS, LA', 5),
('maikel', 'CUEVAS, LA', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
