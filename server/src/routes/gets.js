const { Router } = require('express');
const router = Router();
const Cow = require('../models/cows.js');

router.get('/', async (req, res) => {
  try {
    const cows = await Cow.find();
    res.status(200).json(cows);
  } catch (error) {
    res.status(404).send('Cows not found');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cow = await Cow.findById(req.params.id);
    res.status(200).json(cow);
  } catch (error) {
    res.status(404).send('Cow not found');
  }
});

module.exports = router;
