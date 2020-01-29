import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {NavLink, withRouter} from "react-router-dom";

const {Header} = Layout;


const Nav = (props) => {
    const location = props.location.pathname

    return (
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[`${location}`]}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="/todo"><NavLink to={'/'}>Home</NavLink></Menu.Item>
                    <Menu.Item key="/todo/add"><NavLink to={'/todo/add'}>Add</NavLink></Menu.Item>
                    <Menu.Item key="/awb"><NavLink to={'/awb'}>AWB List</NavLink></Menu.Item>
                </Menu>
            </Header>
    );
};

export default withRouter(Nav);