import React from "react";
import MainNavigation from "./MainNavigation.jsx";
import LoginNavigation from "./LoginNavigation.jsx";

const NavigationLayout = (props) => {
    return (
    <header>
        <MainNavigation />
        <LoginNavigation />
    </header>
    );
};

export default NavigationLayout;