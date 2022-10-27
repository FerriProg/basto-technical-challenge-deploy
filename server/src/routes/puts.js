const { Router } = require('express');
const router = Router();
const Cow = require('../models/cows.js');

router.put('/:id', async (req, res) => {
  const {
    id_senasa,
    animal_type,
    animal_weight,
    paddock_name,
    device_type,
    device_number,
  } = req.body;
  const newCow = {
    id_senasa,
    animal_type,
    animal_weight,
    paddock_name,
    device_type,
    device_number,
  };
  try {
    await Cow.findByIdAndUpdate(req.params.id, newCow);
    res.status(201).send('Cow updated');
  } catch (error) {
    res.status(400).send('Cow not updated');
  }
});

module.exports = router;
