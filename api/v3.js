'use strict';

const express = require('express');
const router = express.Router();
//dynamic model finder
const cwd = process.cwd();
const modelFinder = require(`${cwd}/middleware/model-finder.js`);
//image uploading functionality dev. will be replaced.
const upload = require('../services/upload');
const Image = require('../models/images/images-model.js');
const image = new Image();

// Evaluate the model, dynamically
router.param('model', modelFinder.load);
router.get('/hello', handleHelloWorld);

// Models List
router.get('/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

// JSON Schema
router.get('/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

//*************Routes***************
// Image Routes (dev only)
router.get('/imghandler/images', handleGetImages);
router.post('/imghandler/upload', upload.single('picture'), handleUpload);

// Post Routes

router.get('/:model', handleGetAll);
router.post('/:model', handlePost);
router.get('/:model/:id', handleGetOne);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);



//Handler functions
async function handleHelloWorld(req, res, next){
  try{
    console.log(req.body);
    return res.status(200).json({msg: 'Hello World!'});
  } catch(error){
    console.error(error);
    return res.status(500).json({ error: 'some error occured' });
  }
}

async function handleGetImages (req, res, next){
  try {
    let images = await image.get();
    return res.status(200).json({ images, msg: 'image info fetched'    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'some error occured' });
  }
}

async function handleUpload(req, res, next){
  try {
    if (req.file && req.file.path) {
      const body = {
        // description: req.body.desc,
        url: req.file.path,
      };
      let createdImage = await image.create(body);

      return res.status(200).json({ msg: 'image successfully saved', createdImage });
    } else {
      console.log(req.file);
      return res.status(422).json({ error: 'invalid' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error occured when trying to upload' });
  }
}

async function handleGetAll(request, response, next) {
  try {

    let list = await request.model.get(request.query);
    const output = {
      count: list.length,
      results: list,
    };
    response.status(200).json(output);
  } catch(e) {
    next(e);
  }
}

async function handleGetOne(request, response, next) {
  try {
    let result = await request.model.get({ _id: request.params.id });
    response.status(200).json(result[0]);
  } catch(e) {
    next(e);
  }
}

async function handlePost(request, response, next) {
  try {
    let result = await request.model.create(request.body);
    response.status(200).json(result);
  } catch(e) {
    console.log(e);
    next(e);
  }
}

async function handlePut(request, response, next) {
  try {
    let result = await request.model.update(request.params.id, request.body);
    response.status(200).json(result);
  } catch(e) {
    next(e);
  }
}

async function handleDelete(request, response, next) {
  try {
    await request.model.delete(request.params.id);
    response.status(200).json({});
  } catch(e) {
    next(e);
  }
}


module.exports = router;