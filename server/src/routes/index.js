const express = require('express');
const deletes = require('./deletes.js');
const gets = require('./gets.js');
const posts = require('./posts.js');
const puts = require('./puts');
const router = express();
router.use(express.json());

//routes

router.use('/delete', deletes);
router.use('/', gets);
router.use('/post', posts);
router.use('/put', puts);

module.exports = router;
