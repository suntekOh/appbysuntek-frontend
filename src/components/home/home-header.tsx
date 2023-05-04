import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import {
    Form as RouterForm, Link, useNavigate
} from "react-router-dom";
import { ProductCategories } from '../../services/fake-api';
import { decodeHtml } from '../../services/utils';
import Button from 'react-bootstrap/esm/Button';
import { BsSearch } from "react-icons/bs";
import Nav from 'react-bootstrap/esm/Nav';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import React from 'react';
import { HomeHeaderType, HomeNavMenu } from '../../models/enums';
import { useErrorBoundary } from 'react-error-boundary';
import { getUserNameFromAuth, useAuth } from '../auth/authProvider';

const CustomToggle = React.forwardRef(({ children, onClick }:
    { children: React.ReactElement[], onClick: React.MouseEventHandler<HTMLAnchorElement> }, ref: any) => {

    const firstRowText = children.filter((i) => i != null && i.props.className == 'first-row').shift()?.props?.children;
    const secondRowText = children.filter((i) => i != null && i.props.className == 'second-row').shift()?.props?.children;

    return (
        <div className="account-dropdown">
            <div className="firstrow-text">
                {firstRowText}
            </div>
            <a
                href=""
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
                className="dropdown-toggle"
            >
                {secondRowText}
            </a>
        </div>
    );

}
);

const CustomMenu = React.forwardRef(
    ({ children, style, className, homeHeaderType }:
        { children: React.ReactElement[], style: any, className: any, homeHeaderType: HomeHeaderType }, ref: any) => {

        return (
            <div
                ref={ref}
                style={style}
                className={className}
            >
                {homeHeaderType === HomeHeaderType.Annonymous ?
                    <Row className="first-row">
                        <Col>
                            <RouterForm action="/auth/signin">
                                <Button className="signin-submit" type="submit">
                                    <span>
                                        Sign in
                                    </span>
                                </Button>
                            </RouterForm>
                            <div className="signup-body">
                                New Customer?
                                <Link to="/auth/signup" relative="path" className="signup-link">
                                    Start here.
                                </Link>
                            </div>
                        </Col>
                    </Row> : null
                }
                <Row>
                    <Col className="border-line-right">
                        {children.filter((i) => i.props.className == 'first-col')}
                    </Col>
                    <Col className="border-line-left">
                        {children.filter((i) => i.props.className == 'second-col')}
                        {homeHeaderType === HomeHeaderType.Authenticated ? <Dropdown.Item eventKey={HomeNavMenu.SignOut} className="second-col">Sign Out</Dropdown.Item> : null}
                    </Col>
                </Row>
            </div>
        );
    },
);

export default function HomeHeader({ productCategories, homeHeaderType }: { productCategories: Array<ProductCategories>, homeHeaderType: HomeHeaderType }) {
    const { showBoundary } = useErrorBoundary();
    const auth = useAuth();
    const navigate = useNavigate();
    const userName = getUserNameFromAuth();

    const accountdropdownFirstRowText = homeHeaderType === HomeHeaderType.Authenticated ? `Hello, ${userName}` : "Hello, sign in";

    function handleSignOut() {
        try {
            auth.signout(() => {
                navigate("/", { replace: true });
            })

        } catch (err: any) {
            showBoundary(err);
        }
    }

    return (
        <div className="d-flex justify-content-between sticky-top py-1 home-header">
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                className="w-100"
            >
                <Nav.Item className="d-flex">
                    <RouterForm action="/" className="d-flex">
                        <button type="submit" className="btn btn-link p-2 text-white">Home</button>
                    </RouterForm>
                </Nav.Item>
                <Nav.Item className="d-flex flex-grow-1">
                    <InputGroup className="flex-grow-1 w-auto my-1 mx-2 home-search-bar-form">
                        <Form.Select aria-label="Default select example" className="d-inline-block text-truncate home-category-dropdown">
                            {productCategories.map(item => (
                                <option key={item.categoryId} value={item.categoryId}>{decodeHtml(item.name)}</option>
                            ))}
                        </Form.Select>
                        <Form.Control className="flex-grow-1 home-search-bar-input" aria-label="Text input with dropdown button" placeholder="Search appbysuntek.online" />
                        <Button className="home-search-bar-submit">
                            <BsSearch className="text-dark" />
                        </Button>
                    </InputGroup>
                </Nav.Item>
                <Dropdown
                    className="home-navbar1 px-1 mx-1"
                    onSelect={(key, event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (key == HomeNavMenu.SignOut.toString()) {
                            handleSignOut();
                        } else {
                            alert(key);
                        }
                    }}
                >
                    <Dropdown.Toggle as={CustomToggle}>
                        <div className="first-row">{accountdropdownFirstRowText}</div>
                        <div className="second-row">Account & Lists</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu} className="custom-menu" homeHeaderType={homeHeaderType}>
                        <Dropdown.Item eventKey={HomeNavMenu.None} className="first-col">Red</Dropdown.Item>
                        <Dropdown.Item eventKey={HomeNavMenu.None} className="first-col">Blue</Dropdown.Item>
                        <Dropdown.Item eventKey={HomeNavMenu.None} className="first-col">Orange</Dropdown.Item>
                        <Dropdown.Item eventKey={HomeNavMenu.None} className="first-col">Red-Orange</Dropdown.Item>
                        <Dropdown.Item eventKey={HomeNavMenu.None} className="second-col">Red2</Dropdown.Item>
                        <Dropdown.Item eventKey={HomeNavMenu.None} className="second-col">Blue2</Dropdown.Item>
                        <Dropdown.Item eventKey={HomeNavMenu.None} className="second-col">Orange2</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </div>
    );
}

