const slugify = require('slugify');
const Sanitize = require('../../text/sanitize');

const BasicEditQuizSchema = {
    type: "object",
    properties: {
      title: {type: "string"},
      description: {type: "string"},
      status: {type: "string"},
      time: {
        type: "object",
        properties:{
          timer: {type: "boolean"},
          hh: {type: "integer"},
          mm: {type: "integer"},
          ss: {type: "integer"}
        },
        required: ["timer","hh","mm","ss"]
      }
    },
    required: ["title","status","time"],
    additionalProperties: false
};

const PassageSchema = {
  type: "object",
  properties: {
    title: {type: "string"},
    content: {type: "string"},
    tags: {type: "array"},
    status: {type: "string"},
    sampleAnswer: {
      type: "object",
      properties:{
        status: {type: "string"},
        content: {type: "string"}  
      },
      required: ["status"]
    },
    published: {type: "string"}
  },
  required: ["title","status"],
  additionalProperties: false  
};
  
module.exports = () => {
  return (req,res,next) => {
    try{

      if(req.body.action === "edit-basic-quiz"){

        let validate    = req.ajv.compile(BasicEditQuizSchema);
        let title         = Sanitize(req.body.title);
        let time          = Object.assign({},req.body.time);
        let timer         = Boolean(time.timer);
        let hh            = Number(time.hh);
        let mm            = Number(time.mm);
        let ss            = Number(time.ss);
        let description   = String(req.body.description);
        let status        = String(req.body.status);
        let key           = slugify(title, {
          replacement: '-',  // replace spaces with replacement character, defaults to `-`
          remove: undefined, // remove characters that match regex, defaults to `undefined`
          lower: true,      // convert to lower case, defaults to `false`
          strict: true,     // strip special characters except replacement, defaults to `false`
          locale: 'vi',      // language code of the locale to use
          trim: true         // trim leading and trailing replacement chars, defaults to `true`
        });

        let data        = {
          title         : title,
          description   : description,
          time        : {
            timer     : timer,
            hh        : hh,
            mm        : mm,
            ss        : ss
          },
          status: status  
        }
            
        if(validate(data)){
          req.quizData      = data;
          req.quizData.key  = key;
          next();
        } else {
          res.status(200).json({
            status: false, 
            res: "Failed to insert quiz", 
            resType: "notice",
            hasJson: false,
            error: true,
            errors : [
              {
                key: "INSERT-QUIZ",
                type: "info",
                value: "Missing required fields",
                summary: validate.errors
              }
            ]
          });
          return false;
        }


      } else if(req.body.action === "add-passage") {
        let validate      = req.ajv.compile(PassageSchema);
        let title         = Sanitize(String(req.body.title));
        let content       = String(req.body.content);
        let status        = String(req.body.status);
        let sampleAnswer  = Object(req.body.sampleAnswer); 
        let tags          = [];

        let data        = {
          title         : title,
          content       : content,
          sampleAnswer  : {
            content: sampleAnswer.content,
            status: sampleAnswer.status
          },
          status: status  
        }
            
        if(validate(data)){
          req.passageData = data;
          next();
        } else {
          res.status(200).json({
            status: false, 
            res: "Failed to insert quiz", 
            resType: "notice",
            hasJson: false,
            error: true,
            errors : [
              {
                key: "INSERT-QUIZ",
                type: "info",
                value: "Missing required fields",
                summary: validate.errors
              }
            ],
            data: data
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

    } catch(err){
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