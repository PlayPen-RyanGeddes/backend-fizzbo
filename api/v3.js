'use strict';

const express = require('express');
const router = express.Router();

router.get('/hello', handleHelloWorld);

async function handleHelloWorld(req, res, next){
  try{
    return res.status(200).json({msg: 'Hello World!'});
  } catch(error){
    console.error(error);
    return res.status(500).json({ error: 'some error occured' });
  }
}

module.exports = router;