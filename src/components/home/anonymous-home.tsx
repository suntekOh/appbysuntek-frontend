import {
    useLoaderData
} from "react-router-dom";
import { ProductCategories } from '../../services/fake-api';
import HomeHeader from './home-header';
import HomeFooter from './home-footer';
import { HomeHeaderType } from "../../models/enums";
import DrawerAppBar, { DrawerAppBarProps } from "../DrawerAppBar";


export default function AnonymousHome() {
    const productCategories = useLoaderData() as Array<ProductCategories>;

    const props: DrawerAppBarProps  = 
    { // make sure all required component's inputs/Props keys&types match
        window: undefined,
        homeHeaderType: HomeHeaderType.Annonymous
    }
   
    return (
        <DrawerAppBar {...props} >
        </DrawerAppBar>
    );
}

