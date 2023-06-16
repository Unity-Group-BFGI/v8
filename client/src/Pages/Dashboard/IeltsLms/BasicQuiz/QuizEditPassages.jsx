import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReadingPassages from "./Reading/Reading.Passages";


const QuizEditPassages = () => {
    const [content,setContent] = useState(<>Loading...</>);
    const {CURRENT_QUIZ, IS_QUIZ_LOADING } = useSelector(state => state.storage);
    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){
            if(CURRENT_QUIZ.category === "reading"){
                setContent(<ReadingPassages />);
            } else {
                setContent(<>Loading...</>);
            }
        } else {
            setContent(<>Loading...</>);
        }
    },[CURRENT_QUIZ, IS_QUIZ_LOADING]);

    return (<>{content}</>)
};

export default QuizEditPassages;