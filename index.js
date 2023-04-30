//config inicial
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rota inicial / endpoint
app.get('/', (req, res) => {
  //mostrar req

  res.json({ message: 'oi Express!' });
});

// entregar porta

mongoose
  .connect(
    'mongodb+srv://tiagoc0sta:$Relogio10@apicluster.qhitvq8.mongodb.net/bandodaapi?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Conectamos ao mongoDB!');
    app.listen(3000);
  })
  .catch((err) => console.log(err));
