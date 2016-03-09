var express = require('express');

// Constants
var PORT = 8080;

// App
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/thing/create/')

    // create a thing (accessed at POST http://localhost:8080/api/thing/create)
    .post(function(req, res) {
        
        var thing = new Thing();      // create a new instance of the thing model
        thing.Subject = req.body.subject;  // set the thing name (comes from the request)
        thing.Status = req.body.Status;  // set the thing name (comes from the request)  // set the thing name (comes from the request)
        thing.isSet = false;

        // save the thing and check for errors
        thing.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'thing created! ' + thing._id });
        });
        
    })
	// get all the thing (accessed at GET http://localhost:8080/api/thing)
	.get(function(req, res) {
		thing.find(function(err, thing) {
			if (err)
				res.send(err);

			res.json(thing);
		});
	});

//
router.route('/thing/set/:isSet')
	// get all the things (accessed at GET http://localhost:8080/api/thing/set/:boolean)
	.get(function(req, res) {
		thing.find({isSet: req.params.isSet}, function(err, things) {
			if (err)
				res.send(err);

			res.json(things);
		});
	});

router.route('/thing/update/:thing_id')

    // update the thing with this id (accessed at PUT http://localhost:8080/api/thing/update/:thing_id)
    .put(function(req, res) {

        // use our thing model to find the thing we want
        thing.findById(req.params.thing_id, function(err, thing) {

            if (err)
                res.send(err);

            thing.Subject = req.body.subject;  	// set the thing subject (comes from the request)
        	thing.Status = req.body.Status;   // set the thing callStatus (comes from the request)


            // save the thing
            thing.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'thing updated!' });
            });

        });
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api/)
router.get('/', function(req, res) {
	var state; 
	switch(mongoose.connection.readyState){
		case 0:
			state = 'Disconnected from mongo'
			break;
		case 1:
			state = 'Connected to mongo'
			break;
		case 2:
			state = 'Connecting to mongo'
			break;
		case 3:
			state = 'Disconnecting from mongo'
			break;
		case 4:
			state = 'Unauthorized mongo user'
			break;
		case 99: 
			state = 'Mongo uninitialized'
			break;
	}
    res.json({ message: 'Welcome to our api! Mongo connection state: '+state});   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://User:Pass@some-mongo:27017/thing');
var Thing     = require('./models/api');
