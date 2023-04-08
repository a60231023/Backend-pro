const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // you have put the token in the header part where key = Authorization and the value is Bearer token_value so you want only the token thereform you are replacing 'Bearer ' with nothing
    // now token can come at different places so you ...
    console.log(req.cookies);
    const tokens = req.cookies || req.body.token || req.header('Authorization').replace('Bearer ', '') ;
    console.log(tokens);
    const {token} = tokens;
    console.log(token);

    if(!token){
        return res.status(403).json({
            message: "Token is missing"
        });
    }

    try {
        //verify the token
        console.log("hi");
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log("hi");
        console.log(decode);
        req.user = decode;
        //bring in info from the db
    } catch (error) {
        return res.status(401).json({
            message: "invalid token",
            error
        });
    }
    // important
    return next();
}

module.exports = auth;