const { Router } = require('express');
const router = Router();
const Cow = require('../models/cows.js');

router.delete('/:id', async (req, res) => {
  try {
    await Cow.findByIdAndRemove(req.params.id);
    res.status(200).send('Cow deleted');
  } catch (error) {
    res.status(400).send('Cow not deleted');
  }
});

module.exports = router;
