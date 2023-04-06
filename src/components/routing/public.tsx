import "bootstrap/dist/css/bootstrap.css";
import "../../css/site.css"
import "../../css/layout.css"
import {
    Form,
} from "react-router-dom";

export default function Public() {
    return (
        <div className="container-fluid px-0">
            <div className="d-flex flex-column vh-100">
                <div className="d-flex justify-content-between fixed-top py-1 custom-header-bg">
                    <Form action="/">
                        <button type="submit" className="btn btn-link p-2">Home</button>
                    </Form>
                    <ul className="nav">
                        <li className="nav-item">
                            <Form action="/auth/login">
                                <button type="submit" className="btn btn-link">Already a user?</button>
                            </Form>
                        </li>
                    </ul>
                </div>

                <div className="flex-grow-1 d-flex flex-wrap content-padding-top px-2">
                    welcome to public page!
                </div>

                <div className="d-flex flex-wrap custom-footer-bg">
                    <div className="p-3 bd-custom-gray">Flex item</div>
                    <div className="p-3 bd-custom-gray">Flex item</div>
                    <div className="p-3 bd-custom-gray">Flex item</div>
                </div>
            </div>
        </div>
    );
}

