import React from 'react'
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

function NavItem(props) {
    const name = props.name
    return (
        <div className="header-nav__item">
            <NavLink to={`/${name}`} className='header-main'>{name}</NavLink>
        </div>
    )

}


function Nav(props) {
    const list = ['Blog', 'Chat', 'Todo', 'Video', 'Game']

    return (
        <nav className="header-nav">
            {
                list.map((item, key) => {
                    return <NavItem key={key} name={item}/>
                })
            }
        </nav>
    )
}

export default Nav