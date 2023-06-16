import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReadingQuestions from "./Reading/Reading.Questions";


const QuizEditQuestions = () => {
    const [content,setContent] = useState(<>Loading...</>);
    const {CURRENT_QUIZ, IS_QUIZ_LOADING } = useSelector(state => state.storage);
    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){
            if(CURRENT_QUIZ.category === "reading"){
                setContent(<ReadingQuestions />);
            } else {
                setContent(<>Loading...</>);
            }
        } else {
            setContent(<>Loading...</>);
        }
    },[CURRENT_QUIZ, IS_QUIZ_LOADING]);

    return (<>{content}</>)
};

export default QuizEditQuestions;