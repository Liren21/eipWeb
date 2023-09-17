import React from 'react';
import Toolbar, {Item} from 'devextreme-react/toolbar';
import Button, {ButtonTypes} from 'devextreme-react/button';
import UserPanel from '../user-panel/UserPanel';
import './Header.scss';
import {Template} from 'devextreme-react/core/template';
import {Link} from "react-router-dom";


interface HeaderProps {
    menuToggleEnabled: boolean;
    title?: string;
    toggleMenu: (e: ButtonTypes.ClickEvent) => void;
}

export default function Header({menuToggleEnabled, title, toggleMenu}: HeaderProps) {
    return (
        <header className={'header-component'}>
            <Toolbar className={'header-toolbar'}>
                <Item
                    visible={menuToggleEnabled}
                    location={'before'}
                    widget={'dxButton'}
                    cssClass='header__menu'
                >
                    <Button icon="menu" stylingMode="text" onClick={toggleMenu}/>
                    <Link to={'/home'} className='header__title'>{title}</Link>
                </Item>
                <Item
                    location={'after'}
                    locateInMenu={'auto'}
                    menuItemTemplate={'userPanelTemplate'}
                >
                    <Button
                        className={'user-button authorization'}
                        width={210}
                        height={'100%'}
                        stylingMode={'text'}
                    >
                        <UserPanel menuMode={'context'}/>
                    </Button>
                </Item>
                <Template name={'userPanelTemplate'}>
                    <UserPanel menuMode={'list'}/>
                </Template>
            </Toolbar>
        </header>
    )
}
