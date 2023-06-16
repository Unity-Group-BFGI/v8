const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

module.exports = () => {
    return async (req,res,next) => {
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
                    // basic quiz edit details
                    const quizData = req.quizData;
                    const category = dbQuiz.category;
                    if(req.body.action === "edit-basic-quiz"){
                        let title       = quizData.title;
                        let key         = quizData.key;
                        
                        const alreadyExisit = await ieltsQuizzesTable.findOne({
                            uid: req.uid,
                            _id: { $ne: new ObjectId(id) },
                            key: key,
                            category: category
                        });

                        if(!alreadyExisit){
                            let basicDetails = {
                                title               : title,
                                key                 : key,
                                time                : quizData.time,
                                status              : quizData.status,
                                lastModification    : Date.now(),
                                description         : quizData.description
                            };

                            let updateBasicDetails = await ieltsQuizzesTable.updateOne({
                                _id: new ObjectId(id)
                            }, {
                                $set: basicDetails
                            });

                            if(updateBasicDetails.modifiedCount > 0 ){
                                res.status(200).json({
                                    status: true,
                                    resType: "success",
                                    res: "Changes saved",
                                    hasJson: true,
                                    json: {
                                        quiz: {
                                            title: title,
                                            description: quizData.description,
                                            category: category,
                                            status: quizData.status,
                                            lastModification: Date.now(),
                                            _id: id
                                        },
                                        _id: id
                                    }
                                });
                                return false;
                            } else {
                                res.status(200).json({
                                    status: true,
                                    resType: "info",
                                    res: "No changes made"
                                });
                                return false;
                            }                     
                        } else {
                            res.status(200).json({
                                status: false,
                                resType: "warning",
                                res: "Quiz with same title already exists in another quiz with same type"
                            });
                            return false;
                        }   
                    } else if(req.body.action === "add-passage") {
                        let passageData = req.passageData;
                            if(passageData.title.length <= 0 || passageData.title === undefined){
                                passageData.title = `Passage ${dbQuiz.passages.length + 1}`;
                            }

                            passageData.published = Date.now(); 
                            passageData._id = uuidv4();    
                            dbQuiz.passages.push(passageData);
                            dbQuiz.lastModification = Date.now();

                        let updateBasicDetails = await ieltsQuizzesTable.updateOne({
                            _id: new ObjectId(id)
                        }, {
                            $set: dbQuiz
                        });

                        if(updateBasicDetails.modifiedCount > 0 ){
                            res.status(200).json({
                                status: true,
                                resType: "success",
                                res: "Changes saved",
                                hasJson: true,
                                json: {
                                    passages: dbQuiz.passages,
                                    _id: id
                                }
                            });
                            return false;
                        } else {
                            res.status(200).json({
                                status: true,
                                resType: "info",
                                res: "No changes made"
                            });
                            return false;
                        } 

                    } else {
                        res.status(404).json({
                            status: false,
                            resType: "warning",
                            res: "Quiz edit action undefined",
                            error: false,
                            errors: []
                        });
                        return false;
                    }
                
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
    };
}
