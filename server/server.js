const express = require('express');
const path = require('path');
const database = require('./database.js');

const app = express();
app.use(express.json());

function makeQuery(query) {
  return new Promise((resolve, reject) => {
    database.query(query, function(err, result, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getProducts() {
  return await makeQuery('SELECT * FROM product');
}

app.get('/getProducts', async function(request, response) {
  let products = await getProducts();
  response.send(products);
});

app.listen(process.env.PORT || 5000);
