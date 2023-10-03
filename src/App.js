import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    AppstoreOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import './App.css';
import RevenueAnalysis from './Components/RevenueAnalysis/RecoveryAnalysis';
import InventoryManagement from './Components/InventoryManagement/InventoryManagement';
import ProductRegistration from './Components/ProductRegistration/ProductRegistration';

const { Sider, Content } = Layout;

const App = () => {
    return (
        <Router>
            <Layout>
                <Sider width={300} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} >
                    <div className="logo">
                        <img alt={'logo'} src={'./forsitlogo.svg'}/>
                        <span className='logo-text'>Admin Dashboard</span>
                    </div>
                    <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<DesktopOutlined />}>
                            <Link to="/revenue-analysis">Revenue Analysis</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<AppstoreOutlined />}>
                            <Link to="/inventory-management">Inventory Management</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ContainerOutlined />}>
                            <Link to="/product-registration">Product Registration</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                    <Layout style={{ marginLeft: 300, padding: '20px' }}>
                    <Content style={{ overflow: 'auto', minHeight: '100vh' }}>
                        <Routes>
                            <Route path="/" element={<Navigate to={"/revenue-analysis"} />}/>
                            <Route path="revenue-analysis" element={<RevenueAnalysis />} />
                            <Route path="inventory-management" element={<InventoryManagement />} />
                            <Route path="product-registration" element={<ProductRegistration />} />
                        </Routes>
                    </Content>
                    </Layout>
            </Layout>
        </Router>
    );
};

export default App;
