exports.home = (req, res) => {
    res.status(200).json({
        success: true,
        greetings: "Hello from API"
    });
};

// Now, if we wrap this function in the bigpromise wrapper like this:

// exports.home = bigpromise((req, res) => {
//     res.status(200).json({
//         success: true,
//         greetings: "Hello from API"
//     });
// });
// Then the bigpromise wrapper will take the function that we defined ((req, res) => { ... }) and return a new function that is expected to return a promise. This new function will be passed the same arguments as the original function.

// When this new function is called, it will execute the original function and return a promise that resolves to the value that the original function returns. If the original function throws an error, the returned promise will be rejected with that error.

// So in this case, when home is called, it will return a promise that resolves to undefined, since it doesn't have any explicit return value.



