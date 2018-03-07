var express = require('express');
var router = express.Router();

// Load mongoose package
var mongoose = require('mongoose');

// Connect to MongoDB and create/use database called hubDb
mongoose.connect('mongodb://localhost/hubDb');

// Create a schema
var hubSchema = new mongoose.Schema({
  key: String,
  wifi: String,
  luminosity: { type: Number, default: 1000 }
});

// Create a model based on the schema
var Hub = mongoose.model('Hub', hubSchema);

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
  console.log(req.query);
});

router.get('/api/data', function(req, res){
  Hub.findOne({ key: 'hubId' }, 'wifi luminosity', function (err, elem) {
  if (err) return handleError(err);
    console.log('%s %s is a %s.', elem.wifi, elem.luminosity);
    res.json({ wifi: elem.wifi, luminosity: elem.luminosity });
  });
});

router.post('/api/data', function(req, res) {
  var doc = { key: 'hubId', wifi: req.body.wifi, luminosity: req.body.luminosity };
  Hub.findOneAndUpdate(
    { key: 'hubId' }, // find a document with that filter
    doc, // document to insert when nothing was found
    {upsert: true, new: true, runValidators: true}, // options
    function (err, doc) { // callback
      if (err) {
        res.sendStatus(500);
      } else {
        console.log(doc);
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;

