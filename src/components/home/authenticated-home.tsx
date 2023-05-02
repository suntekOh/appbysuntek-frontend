import {
    useNavigate,
    Form,
    useLoaderData,
} from "react-router-dom";
import { getUserNameFromAuth, useAuth } from '../auth/authProvider';
import { useErrorBoundary } from "react-error-boundary";
import HomeHeader from "./home-header";
import HomeFooter from "./home-footer";
import { ProductCategories } from "../../services/fake-api";
import { HomeHeaderType } from "../../models/enums";


export async function action() {
    return null;
}

export function loader(props: { request: any }) {
    return null;
}

export default function AuthenticatedHome() {
    const productCategories = useLoaderData() as Array<ProductCategories>;


    return (
        <div className="container-fluid px-0">
            <div className="d-flex flex-column vh-100">
                <div className="container-fluid px-0">
                    <div className="d-flex flex-column vh-100">
                        <HomeHeader productCategories={productCategories} homeHeaderType={HomeHeaderType.Authenticated} />

                        <div className="flex-grow-1 d-flex flex-wrap px-2">
                            welcome to protected page!
                        </div>

                        <HomeFooter />
                    </div>
                </div>
            </div>
        </div>
    );
}

