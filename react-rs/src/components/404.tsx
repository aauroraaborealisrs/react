import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div>Чет вы не туда натыкали вообще</div>
            <Link to="/">Вернуться обратно</Link>
        </>
    );
}