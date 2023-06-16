const slugify = require('slugify');
const Sanitize = require('../../../middlewares/text/sanitize');

const QuizSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        description: {type: "string"},
        category: {type: "string"},
        time: {
            type: "object",
            properties: {
                timer: {type: "boolean"},
                hh: {type: "integer"},
                mm: {type: "integer"},
                ss: {type: "integer"}
            },
            required: ["timer","hh","mm","ss"]
        },
        settings: {type: "object"},
        passages: {type: "array"},
        unassignPassages: {type: "array"},
        questions: {type: "array"},
        unassignQuestions: {type: "array"},
        package: {type: "string"},
        status: {type: "string"},
        lastModification: {type: "integer"},
        published: {type: "integer"},
        uid: {type: "string"},
        key: {type: "string"}

    },
    required: ["title","category","status","time","uid"],
    additionalProperties: false
};

module.exports = () => {
    return async (req,res) => {
        try{
            let uid = req.uid;
            //let uid = req.uid;
            let quizData = req.quizData;
            let title = req.quizData.title;
                title = Sanitize(title);
            let key = slugify(title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: true,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',      // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
            });
            let finalData = {
                title: title,
                description: quizData.description,
                category: quizData.category,
                passages: [],
                unassignPassages: [],
                questions: [],
                unassignQuestions: [],
                published: Date.now(),
                lastModification: Date.now(),
                settings: {},
                time: quizData.time,
                status: quizData.status,
                uid: uid,
                key: key
            };

            let validate = req.ajv.compile(QuizSchema);
            if(validate(finalData)) {
                let connection = req.db;
                let ieltsQuizzesTable = connection.collection('ielts-quizzes');
                let query = {
                    category: finalData.category.toLowerCase(),
                    key: key,
                    uid: finalData.uid
                };
                let alreadyExists = await ieltsQuizzesTable.findOne(query);
                if(!alreadyExists){
                    // creating quiz with post key
                    let addQuiz = await ieltsQuizzesTable.insertOne(finalData);
                    if(addQuiz.acknowledged){
                        let qid = addQuiz.insertedId.valueOf();
                        res.status(200).json({
                            status: true,
                            resType: "success",
                            res: "quiz inserted successfully",
                            qid: qid,
                            hasJson: true,
                            json: {
                                quiz: {
                                    _id         : qid,
                                    category    : finalData.category,
                                    description : finalData.description,
                                    status      : finalData.status,
                                    title       : finalData.title,
                                    published   : finalData.published,
                                    lastModification: finalData.lastModification
                                }
                            }

                        });
                        return false;

                    } else {
                        res.status(200).json({
                            status: false,
                            resType: "error",
                            res: "failed to insert quiz",

                        });
                        return false;
                    }  
                } else {
                    res.status(200).json({
                        status: false,
                        resType: "warning",
                        res: "failed to insert quiz, quiz title already exits",

                    });
                    return false;
                }  

            } else {
                res.status(200).json({
                    status: false,
                    data: finalData,
                    errors: validate.errors
                });
                return false;
            }
        }catch(err){
            res.status(500).json({
                status: false, 
                res: "Internal server error", 
                resType: "error",
                hasJson: false,
                error: true,
                errors : [
                    {
                        key: "INSERT-QUIZ",
                        type: "error",
                        value: "Internal server error"
                    }
                ]
            });
            return false;
        }
    };
};