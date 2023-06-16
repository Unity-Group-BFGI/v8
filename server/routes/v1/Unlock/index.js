const express = require('express');
const request = require('request');
const verifyUser = require('../../../middlewares/verifyUser');
const unlockRouter = express.Router();


unlockRouter.get("/", async (req,res, next) => {
    try{
        let refreshHeader = req.header('X-Rs-Token'); // known as refresh-token  
        if(refreshHeader.startsWith('Refresh ')){
            let refreshToken = refreshHeader.slice(8,refreshHeader.length);
            // regenerate access token
            const requestOptions = {
                url: 'https://securetoken.googleapis.com/v1/token?key='+process.env.FIREBAE_API_KEY,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                })
            };
            // make post request
            await request(requestOptions, (error, response, body) => {
                if (error) {
                    res.status(401).json({
                        status : 0,
                        res: "Authorization failed",
                        reason: "Verification failed",
                        code: "firebase-auth-error",
                        error: error,
                        refresh: true
                    });  
                    return false;  
                } else {
                    let jsonRes = JSON.parse(body);
                    req.uid = jsonRes.user_id;
                    req.accessToken = jsonRes.access_token;
                    req.refreshToken = jsonRes.refresh_token;
                    req.modifyHeaders = true;
                    next();
                }
            });
            

        } else {
            res.status(401).json({
                status: false,
                res : "Invalid headers found",
                reason: "Required headers not found",
                code: 'invalid-headers',
                error: {}
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
}, verifyUser(), (req,res) => {
    res.status(200).json({
        status: true,
        resType: "success"
    });
});

module.exports = unlockRouter;