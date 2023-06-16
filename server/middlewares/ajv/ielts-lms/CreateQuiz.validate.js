const CreateQuizSchema = {
  type: "object",
  properties: {
    title: {type: "string"},
    category: {type: "string"},
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
  required: ["title","category","status","time"],
  additionalProperties: false
}

module.exports = () => {
  return (req,res,next) => {
    try{
      let validate      = req.ajv.compile(CreateQuizSchema);
      let data          = {};
      let title         = String(req.body.title);
      let time          = Object.assign({},req.body.time);
      let timer         = Boolean(time.timer);
      let hh            = Number(time.hh);
      let mm            = Number(time.mm);
      let ss            = Number(time.ss);
      let description   = String(req.body.description);
      let category      = String(req.body.category);
      let status        = String(req.body.status);

      data = {
        title         : title,
        description   : description,
        category      : category,
        time:         {
                timer: timer,
                hh: hh,
                mm: mm,
                ss: ss
        },
        status: status
      }

      if(validate(data)){
        req.quizData = data;
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