const mysql = require('mysql');

//Crea coneccion a la base de datos de AWS
const mysqlConnection = mysql.createConnection({
  host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  user: 'bsale_test',
  password: 'bsale_test',
  database: 'bsale_test',
  multipleStatements: true
});

//Crea Se conecta a la base de datos
mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('Base de datos conectada');
  }
});

//Exporta la variable mysqlConnection, para poder ser utilizada en otros modulos
module.exports = mysqlConnection;