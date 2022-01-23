const express = require('express');
const app = express();

// Settings
app.set('puerto', process.env.PORT || 8000);

// Middlewares
app.use(express.json());
  // Configurar cabeceras y cors para poder consumir api con javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// Rutas
app.use(require('./rutas/Bsale'));

// Iniciar Servidor
app.listen(app.get('puerto'), () => {
  console.log(`Puerto Servidor ${app.get('puerto')}`);
});