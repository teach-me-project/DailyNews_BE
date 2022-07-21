const jwt = require('jsonwebtoken')

const verifyAuth = ( req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message: "Unauthorized User, Token Required"})
    }else{
        console.log(req.headers.authorization, 'token dari frontend') 
         jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decode){
            console.log(decode)
            if(err) {
                return res.send({
                message: 'Access Forbidden'
            })}
            if(decode.role === process.env.ROLE_ADMIN){
                next()
            } else if(decode.role === process.env.ROLE_USER){
              return  res.send({message: 'Access Forbidden'})
            }

        })
    }
    
}

module.exports = verifyAuth