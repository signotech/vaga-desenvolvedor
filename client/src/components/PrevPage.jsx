import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

export default function PrevPage() {
    const navigate = useNavigate();

    function goToPreviousPage() {
        navigate(-1);
    }

    return (
        <button onClick={goToPreviousPage} className="btn-floating light-blue pulse">
            <Icon>arrow_back</Icon>
        </button>
    )
}