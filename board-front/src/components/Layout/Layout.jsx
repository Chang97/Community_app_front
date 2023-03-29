import React from "react";
import { Fragment } from "react";
import NavigationLayout from "./NavigationLayout.jsx";

const Layout = (props) => {
    return (
    <Fragment>
        <NavigationLayout />
        <main>{props.children}</main>
    </Fragment>
    );
};

export default Layout;