const express = require('express');
const rutas = express.Router();

const mysqlConnection  = require('../conexionDb.js');

// Obtener Todos Los Productos
rutas.get('/productos', (req, res) => {
  mysqlConnection.query('SELECT * FROM product', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// BuscadorProductos
rutas.get('/productos/buscador/:name', (req, res) => {
  const { name } = req.params;
  mysqlConnection.query('SELECT * FROM product where name like ?',['%'+name+'%'] , (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// cbx Categoria
rutas.get('/categoria', (req, res) => {
  mysqlConnection.query('SELECT * FROM category', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// Filtrar Por Categoria 
rutas.get('/productos/categorias/:idcategoria', (req, res) => {
  const { idcategoria } = req.params;
  mysqlConnection.query('SELECT * FROM product WHERE category = ?', [idcategoria], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


module.exports = rutas;