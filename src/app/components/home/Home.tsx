import React from 'react';
import './Home.scss'
import {navigation} from "../App/app-navigation";
import {Link} from "react-router-dom";

export const Home = () => {
    return (
        <div className='home'>
            {
                navigation.map((itemMenu, index) => (
                    itemMenu.text !== "Главная"
                    &&
                    <div key={`home-${itemMenu.text}-${index}`} className='home__card'>
                        <div className='home__title'>
                            {itemMenu.text}
                        </div>
                        <div className='home__body'>
                            {
                                itemMenu.items.map((submenuItem) => (
                                    <Link key={`home-link-${submenuItem.text}-${index}`} to={submenuItem.path}
                                          className='home__link'>
                                        {submenuItem.text}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
};


