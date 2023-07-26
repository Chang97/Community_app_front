import React, { useState, useEffect } from "react";
import MenuService from "../service/MenuService";

const MenuContext = React.createContext({
    menuId : '',
    menuCd : '',
    menuNm : ''
});

export const MenuContextProvider = (props) => {
    const menuData = MenuService.getAllMenus();
    
    const [menuObj, setMenuObj] = useState({
        menuId : '',
        menuCd : '',
        menuNm : ''
    });

    if (menuData) {
        setMenuObj(menuData);
    }
    
    useEffect(() => {
        MenuService.getAllMenus().then((res) => {
            setMenuObj(res.data);
        })
    }, []);

    const contextValue = {
        menuId : menuObj.menuId,
        menuCd : menuObj.menuCD,
        menuNm : menuObj.menuNm
    };

    return (
        <MenuContext.Provider value={contextValue}>
        {props.children}
        </MenuContext.Provider>
    );
};
export default MenuContext;
