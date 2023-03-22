const jwt = require ('jsonwebtoken')
module.exports= function verify (req,res,next) {
    const authToken = req.header('Authorization');
    // console.log(authToken);
    const accessToken = authToken && authToken.split(' ')[1];
    // console.log(accessToken);
    if(!accessToken) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(403).send('Invalid Token');
    }
}
