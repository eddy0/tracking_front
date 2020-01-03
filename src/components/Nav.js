import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {NavLink, withRouter} from "react-router-dom";

const {Header, Content} = Layout;


const Nav = (props) => {
    const location = props.location.pathname
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[`${location}`]}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="/todo"><NavLink to={'/'}>Home</NavLink></Menu.Item>
                    <Menu.Item key="/todo/add"><NavLink to={'todo/add'}>Add</NavLink></Menu.Item>
                </Menu>
            </Header>
            <div style={{padding: '0 50px', marginTop: 64}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Todo</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </Layout>
    );
};

export default withRouter(Nav);