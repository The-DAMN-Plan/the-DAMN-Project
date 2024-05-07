import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function Years() {
    const budgetId = useParams();
    const dispatch = useDispatch();
    const years = useSelector(s=>s.years);
    function fetchYears() {
        dispatch({
            type: 'GET_YEARS',
            payload: budgetId
        });
    };

    useEffect(()=>{
        fetchYears();
    });

    console.log(years);
    
    return (
        <h1>years page</h1>
    )
    
}