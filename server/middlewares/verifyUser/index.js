module.exports = () => {
    return async (req,res,next) => {
        try{
            let connection = req.db;
            let users = connection.collection('users');
            let query = { uid: req.uid, status: true };
            const user = await users.findOne(query);
            if(user){
    
                let tmpUser  = user;
                    tmpUser.uid = undefined;
                    tmpUser._id = undefined;
                let tmpUsermeta = tmpUser.usermeta;
                    tmpUser.usermeta = undefined;
                let responseJson = {
                    status: true,
                    res: "user found",
                    resType: "success",
                    hasJson: true,
                    json: {
                        action          : "verify-account",
                        userFound       : true, 
                        user            : tmpUser,
                        usermeta        : tmpUsermeta,
                    },
                    error: false,
                    errors: []
                };

                if(req.modifyHeaders){
                    responseJson.headers = {
                        accessToken: req.accessToken,
                        refreshToken: req.refreshToken
                    };
                }

                res.status(200).json(responseJson);
                return false;
    
            } else {
                res.status(200).json({
                    status: true,
                    res: "user not found",
                    resType: "warning",
                    hasJson: true,
                    json: {
                        action      :  "verify-account",
                        userFound   : false
                    },
                    error   : false,
                    errors  : []
                });
                return false;
            }
    
        }catch(err){
            res.status(500).json({
                status: false, 
                res: "Internal server error", 
                resType: "error",
                hasJson: false,
                error: false,
                errors : []
            });
            return false;
        }
    };
};