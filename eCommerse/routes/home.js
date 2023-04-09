const express = require('express');
const router = express.Router();
const {home} = require('../controllers/homeController'); 

router.get('/', home);

module.exports = router;



// The difference between router.get('/', home) and router.get('/', home()) lies in the way they handle the home function.

// router.get('/', home) registers a route handler function for the GET method on the root path of the router. This means that when a GET request is made to the root path, the home function will be called and executed.

// On the other hand, router.get('/', home()) calls the home function immediately and registers the returned value (which is assumed to be a route handler function) as the handler for the GET method on the root path of the router. This means that when a GET request is made to the root path, the returned function from the home function will be called and executed.

// Therefore, the difference is that in the first case, home is passed as a function reference and it will be called later when a request is made, while in the second case, home is called immediately and its return value is used as the route handler function.



