var jwt = require('jsonwebtoken');
(function() {


    module.exports = {

         isEmail,
        verifyToken
    
    
    }

    function isEmail(email) {
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
    }

    function verifyToken(req, res, next){
        const token = req.headers['x-access-token'];
        if (token) {
            var jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa"
            jwt.verify(token, jwt_secrect, function(err, decoded) {   
                if(err){
                    if(err.name === 'TokenExpiredError'){
                        res.json({
                            code: 401,
                            messaage: "token experied"
                        })
                    }
                    if(err.name === 'JsonWebTokenError'){
                        res.json({
                            code: 401,
                            messaage: "Invalid token"
                        })
                    }
                }             
               else{
                   req.decoded = decoded
                    next()
                }
            })
        }else{
            res.json({
                code: 400,
                messaage: "Please provide access token"
            })
        }
    }
    

   
})();