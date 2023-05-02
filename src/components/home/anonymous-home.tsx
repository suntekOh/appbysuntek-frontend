import {
    useLoaderData
} from "react-router-dom";
import { ProductCategories } from '../../services/fake-api';
import HomeHeader from './home-header';
import HomeFooter from './home-footer';
import { HomeHeaderType } from "../../models/enums";


export default function AnonymousHome() {
    const productCategories = useLoaderData() as Array<ProductCategories>;
   
    return (
        <div className="container-fluid px-0">
            <div className="d-flex flex-column vh-100">
                <HomeHeader productCategories={productCategories} homeHeaderType={HomeHeaderType.Annonymous} />

                <div className="flex-grow-1 d-flex flex-wrap px-2">
                    welcome to public page!
                </div>

                <HomeFooter />
            </div>
        </div>
    );
}

