//try catch and async await || use promise


// This code exports a higher-order function that takes a function (func) as its argument. When this higher-order function is called, it returns another function that will be used as middleware for an Express route.

// The middleware function takes three parameters: req, res, and next. req and res are the request and response objects passed to the middleware function by Express. next is a callback function that should be called to pass control to the next middleware function in the chain.

// Inside the middleware function, func is called with the same parameters as the middleware function. The return value of func is then wrapped in a Promise using Promise.resolve(). This allows us to use Promise methods like .catch() to handle errors that might occur during the execution of the asynchronous function.

// If an error occurs, the Promise will be rejected, and the .catch() method will be called. In this case, next() is called with the error object as its argument. This will pass control to the next error-handling middleware function in the chain (if there is one).

// If no error occurs, the Promise will be resolved, and the .then() method can be used to handle the success case. However, since the .then() method is not used here, control will simply pass to the next middleware function in the chain.


module.exports = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
