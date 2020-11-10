import React from 'react';
import './Header.css'
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from '@material-ui/icons/Search';
import {useStateValue} from "./StateProvider";


function Header(props) {

    const [{ user }] = useStateValue()

    return (
        <div className="header">
            <div className="header__left">
                {/*Avatar for logged in user*/}
                <Avatar
                    className="header__avatar"
                    alt={user?.displayName}
                    src={user?.photoURL}
                />
            </div>
            <div className="header__search">
                {/*Search icon*/}
                <SearchIcon/>
                {/*input*/}
                <input placeholder="Search here..."/>
            </div>
            <div className="header__right">
            </div>
        </div>
    );
}

export default Header;