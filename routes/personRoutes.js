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
    return;
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
  //console.log(req);

  //extrair dado da requisição pela url = req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: 'O usuário não foi encontrado' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = { name, salary, approved };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);

    //console.log(updatePerson);

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: 'O usuário não foi encontrado' });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    req.status(500).json({ error: error });
  }
});

router.delete('/:id', async function (req, res) {
  const id = req.params;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: 'O usuario nao foi encontrado' });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: 'Usuario removido com sucesso' });
  } catch (error) {
    req.status(500).json({ error: error });
  }
});

module.exports = router;
