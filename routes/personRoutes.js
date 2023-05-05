const router = require('express').Router();

const Person = require('../models/Person');

//Rotas da API
// Criar dados
router.post('/', async (req, res) => {
  //req.body

  // { name: "Tiago", salary: 50000, approved: false }
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: 'O nome é obrigatorio!' });
  }

  const person = {
    name,
    salary,
    approved,
  };
  //
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

//read -leitura de dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// read - criando rotas dinamicas - passando id
router.get('/:id', async (req, res) => {
  //extrair dado da requisição pela url = req.params
  const id = req.params.id;
});

module.exports = router;
