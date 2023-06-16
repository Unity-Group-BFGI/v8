const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("../../config/firebase.json");
const request = require('request');


const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ielts-lms-api-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = () => {
  return async (req,res,next) => {
      if(req.header('authorization')){
          let authHeader = req.header('authorization');
          if(authHeader.startsWith('Bearer ')){
              let token = authHeader.slice(7,authHeader.length);
              await getAuth().verifyIdToken(token).then((decodedToken) => {
                req.uid = decodedToken.uid;  
                req.modifyHeaders = false;            
                next();
              }).catch((error) => {
                // token expired
                res.status(401).json({
                    status : 0,
                    locked : true,
                    res: "Authorization failed",
                    reason: "Verification failed",
                    code: "firebase-auth-error",
                    error: error
                });  
                return false;
              });    
          }else{
            res.status(401).json({
                status: false,
                res : "Invalid headers found",
                reason: "Required headers not found",
                code: 'invalid-headers',
                error: {}
            });
            return false;
          }
      } else {
          res.status(401).json({
              status: false,
              res : "Invalid headers found",
              reason: "Required headers not found",
              code: 'invalid-headers',
              error: {}
          });
      } 
  };
};