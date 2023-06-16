const {ObjectId} = require("mongodb");
var db;
module.exports = () => {
    return async (req,res,next) => {
        try{
            
            let errors = [];
            let id = req.params.id;
            
            if(id === undefined){
                res.status(404).json({
                    status: true,
                    resType: "warning",
                    res: "Missing quiz id",
                    hasJson: false,
                    error: false,
                    errros: errors
                });
                return false;
            } else {
                if(ObjectId.isValid(id)){
                    let connection = req.db;
                    let ieltsQuizzesTable = connection.collection('ielts-quizzes');
                    let query = {
                        _id: new ObjectId(id),
                        uid: req.uid
                    };
                    const dbQuiz = await ieltsQuizzesTable.findOne(query);
                    if(dbQuiz){
                        dbQuiz['uid'] = undefined;
                        res.status(200).json({
                            status: true,
                            resType: "success",
                            res: "Quiz found",
                            hasJson: true,
                            json: {
                                quiz: dbQuiz,
                                _id: dbQuiz._id
                            },
                            error: false,
                            errros: errors
                        });
                        return false;
                    } else {
                        res.status(404).json({
                            status: true,
                            resType: "warning",
                            res: "Quiz not found",
                            hasJson: false,
                            error: false,
                            errros: errors
                        });
                        return false;
                    }
                } else {
                    res.status(200).json({
                        status: false,
                        resType: "warning",
                        res: "Quiz id is not valid",
                        hasJson: false,
                        error: false,
                        errros: errors
                    });
                    return false;
                }
            }
                  
        } catch(err){
            res.status(500).json({
                status: true,
                resType: "error",
                res: "Internal server error",
                hasJson: false,
                error: true,
                errors: [
                    {
                        "key": "SERVER",
                        "res": "Internal server error"
                    }
                ]        
            });
            return false;
        }
    };
};