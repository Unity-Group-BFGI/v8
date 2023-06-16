module.exports = () => {
    return async (req,res,next) => {
        try {
            let connection = req.db;
            let queryString = req.query;

            let ITEMS_PER_PAGE = 10;
            let currentPage = 1;           

            if(queryString.perPageItems != undefined){
                ITEMS_PER_PAGE = +queryString.perPageItems;
            }

            if(queryString.currentPage != undefined){
                currentPage = +queryString.currentPage;
            }

            

            let skipItems = (currentPage - 1) * ITEMS_PER_PAGE;


            let quizzes = [];
            let query = { uid: req.uid };
            if(queryString.search != undefined && queryString.search.length > 0){
                query.title =  { $regex: queryString.search, $options: 'i' };
            }
            let ieltsQuizzesTable = connection.collection('ielts-quizzes');

            // get total items
            const totalItems = await ieltsQuizzesTable.countDocuments(query);
            const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
            await ieltsQuizzesTable.find(query).skip(skipItems).limit(ITEMS_PER_PAGE).forEach(quiz => {
                quizzes.push({
                        _id         : quiz._id,
                        category    : quiz.category,
                        description : quiz.description,
                        status      : quiz.status,
                        title       : quiz.title
                });
            }).then(() => {  
                    
                res.status(200).json({
                    status: true,
                    resType: "success",
                    res: "list of all quizzes",
                    hasJson: true,
                    json: {
                        quizzes: quizzes,
                        total: quizzes.length,
                        totalPages: totalPages,
                        perPageItems: ITEMS_PER_PAGE,
                        currentPage: currentPage,
                        search: queryString.search
                    },
                    error: false
                });
                return false;
            }).catch(() => {
                    res.status(404).json({
                        status: false,
                        resType: "warning",
                        res: "Failed to get list of quizzes",
                        hasJson: false,
                        error: false
                    });
                    return false;
            });
        
        } catch (err) {
            res.status(500).json({
                status: true,
                resType: "error",
                res: "Internal server error",
                hasJson: false,
                error: true,
                errors: [
                    {
                        "type"  : "error",
                        "key"   : "SERVER",
                        "value" : "Internal server error"
                    }
                ],
                exception: err        
            });
            return false;
        }
    };


};