import React from 'react';
import { Layout, Menu } from 'antd';
import {Link, useLocation} from 'react-router-dom';
import {
    DesktopOutlined,
    AppstoreOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;


const menuItems = [
    { key: 'revenue-analysis', icon: <DesktopOutlined />, label: 'Revenue Analysis', path: '/revenue-analysis' },
    { key: 'inventory-management', icon: <AppstoreOutlined />, label: 'Inventory Management', path: '/inventory-management' },
    { key: 'product-registration', icon: <ContainerOutlined />, label: 'Product Registration', path: '/product-registration' },
];

const pathToKeyMap = {};


const NavMenu = () => {

    const location = useLocation()

    menuItems.forEach(item => {
        pathToKeyMap[item.path] = item.key;
    });

    const selectedKey = pathToKeyMap[location.pathname] || '';

    return (
        <Sider width={300} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} >
            <div className="logo">
                <img alt={'logo'} src={'./forsitlogo.svg'}/>
                <span className='logo-text'>Admin Dashboard</span>
            </div>
            <Menu mode="vertical" theme="dark" defaultSelectedKeys={[selectedKey]}>
                {menuItems.map(item => (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.path}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default NavMenu;
