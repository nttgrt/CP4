const express = require('express');
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');
//const objectId = mongoose.objectID;

// connect to the database
mongoose.connect('mongodb://localhost:27017/colors', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/info/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const swatchSchema = new mongoose.Schema({
  title: String,
  rgbString: String
});

// Create a model for Colors to be saved
const Swatches = mongoose.model('Swatches', swatchSchema);

// Create a new item in the museum: takes a title and a path to an image.
//creates new swatch: takes title, r, g, b, and difference
app.post('/api/swatches', async (req, res) => {
  const swatch = new Swatches({
    title: req.body.title,
    rgbString: req.body.rgbString,
  });
  try {
    await swatch.save();
    res.send(swatch);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/swatches/:id', async (req, res) => {
  try {
    //let id = parseInt(req.params.id);
    var ObjectId = require('mongodb').ObjectID;
    Swatches.deleteOne( { "_id" : ObjectId(req.params.id) }, function(err, obj) {
      if(err) throw(err);
      console.log("successfully deleted item");
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/swatches/:id', async (req, res) => {
  try {
    var ObjectId = require('mongodb').ObjectID;
    //let item = new Swatch (
    Swatches.findOne( {"_id" : ObjectId(req.params.id) }, function(err, swatch) {
      if(err) throw(err);
      swatch.title = req.body.title;
      swatch.rgbString = req.body.rgbString;      
      swatch.save(function(err) {
        if(err) throw(err);
      })
    });//);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/swatches', async (req, res) => {
  try {
    let swatches = await Swatches.find();
    res.send(swatches);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));