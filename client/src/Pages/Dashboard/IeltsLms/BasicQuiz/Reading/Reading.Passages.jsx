import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import $ from 'jquery';
import 'jquery-ui-bundle';

import addPassage from "../../../../../includes/Apis/ielts-lms/addPassage";
import { set_current_tab, set_current_editable_id } from "../../../../../includes/Store/slice/Storage.slice";


import { LoadEditorDark, LoadEditorLight } from "../../../../../templates/Components/Editor";
import Form from "react-bootstrap/Form";
import "../../../../../assets/styles/jquery-ui-sortable.css";

const ReadingPassages = () => {
    const dispatch                      = useDispatch();
    const { CURRENT_TAB }               = useSelector(state => state.storage);
    const [tabContent,setTabContent]    = useState(<ListPassages />);
    
    useEffect(() => {
        if(CURRENT_TAB === "list"){
            setTabContent(<ListPassages />);
        } else if(CURRENT_TAB === "add"){
            setTabContent(<AddPassages />);
        } else if(CURRENT_TAB === "edit"){
            setTabContent(<EditPassage />);
        } else {
            dispatch(set_current_tab("list"));
        }
    },[CURRENT_TAB]);
    return (<>{tabContent}</>)
};

export default ReadingPassages;

const ListPassages = () => {
    const dispatch                                          = useDispatch();
    const { CURRENT_QUIZ, IS_QUIZ_LOADING }                 = useSelector(state => state.storage);
    const [orderChanged,setOrderChanged]                    = useState(false);
    const [passages,setPassages]                            = useState([]);
    const [oldOrder,setOldOrder]                            = useState([]);
    
    const resetOrder = () => {
        setPassages(oldOrder);
        setOrderChanged(false);
    };

    const saveOrder = () => {
        setOrderChanged(true);
        setOldOrder([]);
    };

    const editPassage = (i) => {
        dispatch(set_current_editable_id(i));
        dispatch(set_current_tab("edit"));
    };

    // add passage tab
    const addPassageTab = () => {
        dispatch(set_current_tab("add"));
    };

    useEffect(() => {
        if(CURRENT_QUIZ && !IS_QUIZ_LOADING){
            setPassages(CURRENT_QUIZ.passages);
            window.jQuery = $;
            console.log('[jQuery] Sortable called');
            window.jQuery('#sortable').sortable({
                containment: ".jquery__list-container",
                forcePlaceholderSize: true,
                refreshPositions: true,
                handle: ".drag-handler",
                cursor: "move",
                placeholder: "ui-state-highlight",
                axis: "y",
                items: '.card-list',
                revert: "invalid",
                start: function () {
                    
                },        
                change: function () {
                    
                },
                stop: function() {
                    let changed = false;
                    let newItems = [];
                    document.querySelectorAll('#sortable li').forEach((li,index) => {
                        if(li.dataset.id !== passages[index].key) {
                            changed = true;                 
                        }    

                        for(let i=0; i<passages.length; i++){
                            if(passages[i].key === li.dataset.id){
                                newItems.push(passages[i]);
                                break;
                            }
                        }

                    });

                    if(changed){
                        setOrderChanged(changed); 
                        setOldOrder(passages); 
                        setPassages(passages);
                    }
                    
                }
            });
        }
    },[CURRENT_QUIZ, IS_QUIZ_LOADING]);

    return (<>
        <div className={passages.length <= 0? "card" : "card bg-transparent"}>
            <div className="card-header border-0">
                <h3 className="card-title">
                    List of Reading Passages
                </h3>
                
                <button className="btn btn-sm btn-primary align-self-center" onClick={addPassageTab}>
                    <i className="fa fa-thin fa-plus"></i> Add Passsage
                </button>
                
            </div>
            {!IS_QUIZ_LOADING && passages.length <= 0 && 
            <div className="card-body">
                <svg width="100" height="45" viewBox="0 0 100 45" fill="#E3FCF7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5366 8C5.61282 8 0 13.6073 0 20.5244C0 27.4145 5.59098 33.0487 12.4878 33.0487C19.3846 33.0487 24.9756 38.6343 24.9756 45.5244C24.9756 52.4145 30.5666 58 37.4634 58H87.4634C94.3872 58 100 52.3927 100 45.4756V20.5244C100 13.6073 94.3872 8 87.4634 8H62.439C55.5422 8 49.9512 13.6099 49.9512 20.5C49.9512 27.3632 44.3821 32.9513 37.5122 32.9513C30.6423 32.9513 25.0732 27.3632 25.0732 20.5C25.0732 13.6099 19.4334 8 12.5366 8Z"></path>
                </svg>
                <div className="text-center pt-10 mb-20">
                    <h2 className="fs-2 fw-bold mb-7">0 Reading Passage found</h2>
                    <p className="text-gray-400 fs-6 fw-semibold mb-10">
                        There are no customers added yet. <br />Kickstart your CRM by adding a your first customer
                    </p>
                    <button className="btn btn-primary" onClick={addPassageTab}>
                        <i className="fa fa-thin fa-plus"></i> Add First Passage
                    </button>
                </div> 
            </div>}

            {!IS_QUIZ_LOADING && passages.length > 0 &&     
            <div className="card-body jquery__list-container p-0 m-0">
                <ul id="sortable" className="p-4 m-0"> 
                    {passages.map((p,index) => {
                        return (<li key={index} className="card mb-3 card-list border-0" data-id={index}>
                            <div className="card-header">

                                <div className="card-title drag-handler cursor-drag">
                                    <div className="btn-light-primary btn-icon drag-icon mb-0 d-flex flex-row align-items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 7C5.88071 7 7 5.88071 7 4.5C7 3.11929 5.88071 2 4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88071 3.11929 7 4.5 7Z" fill="currentColor"></path><path opacity="0.3" d="M14 4.5C14 5.9 12.9 7 11.5 7C10.1 7 9 5.9 9 4.5C9 3.1 10.1 2 11.5 2C12.9 2 14 3.1 14 4.5ZM18.5 2C17.1 2 16 3.1 16 4.5C16 5.9 17.1 7 18.5 7C19.9 7 21 5.9 21 4.5C21 3.1 19.9 2 18.5 2ZM4.5 9C3.1 9 2 10.1 2 11.5C2 12.9 3.1 14 4.5 14C5.9 14 7 12.9 7 11.5C7 10.1 5.9 9 4.5 9ZM11.5 9C10.1 9 9 10.1 9 11.5C9 12.9 10.1 14 11.5 14C12.9 14 14 12.9 14 11.5C14 10.1 12.9 9 11.5 9ZM18.5 9C17.1 9 16 10.1 16 11.5C16 12.9 17.1 14 18.5 14C19.9 14 21 12.9 21 11.5C21 10.1 19.9 9 18.5 9ZM4.5 16C3.1 16 2 17.1 2 18.5C2 19.9 3.1 21 4.5 21C5.9 21 7 19.9 7 18.5C7 17.1 5.9 16 4.5 16ZM11.5 16C10.1 16 9 17.1 9 18.5C9 19.9 10.1 21 11.5 21C12.9 21 14 19.9 14 18.5C14 17.1 12.9 16 11.5 16ZM18.5 16C17.1 16 16 17.1 16 18.5C16 19.9 17.1 21 18.5 21C19.9 21 21 19.9 21 18.5C21 17.1 19.9 16 18.5 16Z" fill="currentColor"></path>
                                        </svg>
                                        <h4 className="mx-2">{p.title}</h4>    
                                    </div>
                                    
                                </div>

                                <div className="card-title">
                                    <button className="btn btn-sm btn-light-primary btn-icon" onClick={() => editPassage(index)}>
                                        <i className="fa fa-edit"></i>
                                    </button>
                                </div> 

                            </div>
                            
                        </li>)
                    })}             
                </ul>                          
            </div>}

            {orderChanged && <div className="card-footer d-flex flex-row" style={{justifyContent: 'space-between'}}>
                <button className="btn btn-light-danger btn-sm" onClick={resetOrder}>
                    Reset order
                </button>
                <button className="btn btn-primary btn-sm">
                    Save order
                </button>
            </div>}

        </div>
    </>);
};

const AddPassages = () => {
    const dispatch                                              = useDispatch();
    const { CURRENT_QUIZ }                                      = useSelector( state => state.storage );
    const { THEME }                                             = useSelector( state => state.theme );
    const { AUTH_TOKENS }                                       = useSelector( state => state.auth );
    const [title,setTitle]                                      = useState("");
    const [html,setHtml]                                        = useState("<h1>Hellow passage </h1>");
    const [sampleAnswer,setSampleAnswer]                        = useState("<p>Sample answer</p>");
    const [enableSampleAnswer,setEnableSampleAnswer]            = useState(false);
    const [status,setStatus]                                    = useState(true);
    const [statusText,setStatusText]                            = useState("Published");
    const [loading,setLoading]                                  = useState(false);
    const [htmlEditor,setHtmlEditor]                            = useState(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading} />);
    const [sampleAnswerHtmlEditor,setSampleAnswerHtmlEditor]    = useState(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);

    // submit reading passage
    const submitPassage = (ev) => {
        ev.preventDefault();

        addPassage({
            // headers
            "authorization": "Bearer "+AUTH_TOKENS.accessToken,
            "token": "sitetoken "+process.env.REACT_APP_SITE_TOKEN
        },"/"+CURRENT_QUIZ._id,
        {
            title: title,
            content: html,
            sampleAnswer: {
                status: enableSampleAnswer,
                content: sampleAnswer
            },
            status: statusText
        },
        () => {

        },(res) => {
            console.log(res);
            if(res.status){ 
                if(res.hasJson){           
                    
                }
            }
        },(err) => {

        });
        
            
    };

    // status update
    const statusUpdate = (check) => {
        setStatus(check);
        if(check){
            setStatusText("Published");
        } else {
            setStatusText("Pending");
        }
    };

    // set list tab
    const setListTab = () => {
        dispatch(set_current_tab("list"));
    };

    useEffect(() => {
        if(THEME === "light"){
            setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading}  />);
            setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
        } else if(THEME === "dark"){
            setHtmlEditor(<LoadEditorDark html={html} setHtml={setHtml} setLoading={setLoading} />);
            setSampleAnswerHtmlEditor(<LoadEditorDark html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
        } else {
            setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading} />);
            setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
        }
        
    },[THEME]);

    return (<>
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">
                    Add Reading Passage
                </h3>
                
                <button className="btn btn-sm btn-light-primary align-self-center" onClick={setListTab}>
                    <i className="fa fa-thin fa-chevron-left"></i> List Passsages
                </button>
                
            </div>
            <Form onSubmit={(event) => submitPassage(event)}>   
                <div className="card-body">
                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Title (optional)</div>
                        </div>
                        
                        <div className="col-xl-9">
                            
                            {!loading && <input type="text" className="form-control form-control-solid" name="title" value={title} placeholder={"Add passage title"} onChange={(event) => setTitle(event.target.value)} />}
                            
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Passage content</div>
                        </div>
                        
                        <div className="col-xl-9">
                            {!loading && <>{htmlEditor}</>}
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">
                                <div className="form-check form-switch form-check-custom form-check-solid">
                                    <input className="form-check-input" type="checkbox" id="status" name="status" checked={enableSampleAnswer} onChange={(event) => setEnableSampleAnswer(event.target.checked)} />
                                    <label className="form-check-label  fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                        <span>Sample Answer </span>
                                        {enableSampleAnswer? 'Enabled' : 'Disabled'}  
                                    </label>
                                    
                                </div>
                                <div className="form-text">
                                    
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className={enableSampleAnswer? "col-xl-9" : "d-none col-xl-9"}>
                            {!loading && <>{sampleAnswerHtmlEditor}</>}
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                        </div>
                        
                        <div className="col-xl-9">
                            <div className="form-check form-switch form-check-custom form-check-solid">
                                <input className="form-check-input" type="checkbox" id="status" name="status" checked={status} onChange={(event) => statusUpdate(event.target.checked)} />
                                <label className="form-check-label fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                    {statusText}  
                                </label>                                 
                            </div>
                        </div>
                    
                    </div>
                    {/* END::ROW */}
                    
                </div>
                <div className="card-footer p-4 d-flex flex-row justify-content-between">
                    <button className="btn btn-light-danger btn-sm pull-left float-left" type="button">Reset</button>
                    <button className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Save</button>                       
                </div>
            </Form>
        </div>
    </>);
};


// edit passage by given passage and index
const EditPassage = () => {
    const dispatch                                              = useDispatch();    
    const { CURRENT_QUIZ , CURRENT_EDITABLE_ID, IS_QUIZ_LOADING }  = useSelector( state => state.storage);
    const { THEME }                                             = useSelector( state => state.theme );
    const { AUTH_TOKENS }                                       = useSelector( state => state.auth );
    const [title,setTitle]                                      = useState("");
    const [html,setHtml]                                        = useState("");
    const [sampleAnswer,setSampleAnswer]                        = useState("");
    const [htmlEditor,setHtmlEditor]                            = useState(<></>);
    const [sampleAnswerHtmlEditor,setSampleAnswerHtmlEditor]    = useState(<></>);
    const [enableSampleAnswer,setEnableSampleAnswer]            = useState(false);
    const [status,setStatus]                                    = useState(true);
    const [statusText,setStatusText]                            = useState("Published");
    const [loading,setLoading]                                  = useState(true);

    const editPassage = (ev) => {
        ev.preventDefault();
        
    };

    // status update
    const statusUpdate = (check) => {
        setStatus(check);
        if(check){
            setStatusText("Published");
        } else {
            setStatusText("Pending");
        }
    };

    // set list tab
    const setListTab = () => {
        dispatch(set_current_tab("list"));
    };

    useEffect(() => {
        if(!IS_QUIZ_LOADING && CURRENT_QUIZ){

            let passage = CURRENT_QUIZ.passages[CURRENT_EDITABLE_ID];
            setTitle(passage.title);
            setHtml(passage.content);
            setStatusText(passage.status);

            if(passage.status === "published"){
                setStatus(true);
            } else if(passage.status === "pending"){
                setStatus(false);
            } else {
                setStatusText("published");
                setStatus(true);
            }

            setSampleAnswer(passage.sampleAnswer.content);
            setEnableSampleAnswer(passage.sampleAnswer.status);
            setHtmlEditor(<LoadEditorLight html={passage.content} setHtml={setHtml} setLoading={setLoading} />);
            setSampleAnswerHtmlEditor(<LoadEditorLight html={passage.sampleAnswer.content} setHtml={setSampleAnswer} setLoading={setLoading} />);
            setLoading(false);


        }
    },[]);

    useEffect(() => {
        if(!loading){
            if(THEME === "light"){
                setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading}  />);
                setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
            } else if(THEME === "dark"){
                setHtmlEditor(<LoadEditorDark html={html} setHtml={setHtml} setLoading={setLoading} />);
                setSampleAnswerHtmlEditor(<LoadEditorDark html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
            } else {
                setHtmlEditor(<LoadEditorLight html={html} setHtml={setHtml} setLoading={setLoading} />);
                setSampleAnswerHtmlEditor(<LoadEditorLight html={sampleAnswer} setHtml={setSampleAnswer} setLoading={setLoading} />);
            }
        }
        
    },[THEME]);


    return (<>
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">
                    Edit Reading Passage
                </h3>
                
                <button type="button" className="btn btn-sm btn-light-primary align-self-center" onClick={setListTab}>
                    <i className="fa fa-thin fa-chevron-left"></i> List Passsages
                </button>
                
            </div>
            <Form onSubmit={(event) => editPassage(event)}>   
                <div className="card-body">
                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Title (optional)</div>
                        </div>
                        
                        <div className="col-xl-9">
                            {!loading && 
                                <input type="text" className="form-control form-control-solid" name="title" value={title} placeholder={"Add passage title"} onChange={(event) => setTitle(event.target.value)} />
                            }
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Passage content</div>
                        </div>
                        
                        <div className="col-xl-9">
                            {<>{htmlEditor}</>}
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">
                                <div className="form-check form-switch form-check-custom form-check-solid">
                                    <input className="form-check-input" type="checkbox" id="status" name="status" checked={enableSampleAnswer} onChange={(event) => setEnableSampleAnswer(event.target.checked)} />
                                    <label className="form-check-label  fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                        <span>Sample Answer </span>
                                        {enableSampleAnswer? 'Enabled' : 'Disabled'}  
                                    </label>
                                    
                                </div>
                                <div className="form-text">
                                    
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className={enableSampleAnswer? "col-xl-9" : "d-none col-xl-9"}>
                            {<>{sampleAnswerHtmlEditor}</>}
                        </div>
                    
                    </div>
                    {/* END::ROW */}

                    {/* BEGIN::ROW */}
                    <div className="row mb-8">
                    
                        <div className="col-xl-3">
                            <div className="fs-6 fw-semibold mt-2 mb-3">Status</div>
                        </div>
                        
                        <div className="col-xl-9">
                            <div className="form-check form-switch form-check-custom form-check-solid">
                                <input className="form-check-input" type="checkbox" id="status" name="status" checked={status} onChange={(event) => statusUpdate(event.target.checked)} />
                                <label className="form-check-label fw-semibold text-gray-400 ms-3 d-flex flex-column" htmlFor="status">
                                    {statusText}  
                                </label>                                 
                            </div>
                        </div>
                    
                    </div>
                    {/* END::ROW */}
                    
                </div>
                <div className="card-footer p-4 d-flex flex-row justify-content-between">
                    <button className="btn btn-light-danger btn-sm pull-left float-left" type="button">Reset</button>
                    <button className="btn btn-light-primary btn-sm pull-right float-right" type="submit">Save</button>                       
                </div>
            </Form>
        </div>
    </>);
};




