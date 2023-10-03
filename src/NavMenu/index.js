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
    // Add more menu items as needed
];

const pathToKeyMap = menuItems.reduce((acc, item) => {
    acc[item.path] = item.key;
    return acc;
}, {});

const NavMenu = () => {

    const location = useLocation()
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
