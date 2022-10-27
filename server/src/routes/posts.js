const { Router } = require('express');
const router = Router();
const Cow = require('../models/cows.js');

router.post('/', async (req, res) => {
  const {
    id_senasa,
    animal_type,
    animal_weight,
    paddock_name,
    device_type,
    device_number,
  } = req.body;
  if (
    !id_senasa ||
    !animal_type ||
    !paddock_name ||
    !device_type ||
    !device_number
  )
    return res.status(404).send('Falta enviar datos obligatorios');
  try {
    const cow = new Cow({
      id_senasa,
      animal_type,
      animal_weight,
      paddock_name,
      device_type,
      device_number,
    });
    await cow.save();
    res.status(201).send(cow);
  } catch (error) {
    res.status(404).send('Cow not saved');
  }
});

module.exports = router;
