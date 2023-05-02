const router = require('express').Router();

const Person = require('../models/Person');

//Rotas da API
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

module.exports = router;
