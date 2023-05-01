//config inicial
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Person = require('./models/Person');

//forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Rotas da API
app.post('/person', async (req, res) => {
  //req.body

  // { name: "Tiago", salary: 50000, approved: false }
  const { name, salary, aproved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    //crinado dados
    await Person.create(person);

    res
      .status(201)
      .json({ message: 'Pessoa inserida no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

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
