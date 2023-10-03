import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    AppstoreOutlined,
    ContainerOutlined,
} from '@ant-design/icons';
import {BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';
import './App.css';
import RevenueAnalysis from './Components/RevenueAnalysis/RecoveryAnalysis';
import InventoryManagement from './Components/InventoryManagement/InventoryManagement';
import ProductRegistration from './Components/ProductRegistration/ProductRegistration';
import NavMenu from "./NavMenu";

const { Sider, Content } = Layout;


const App = () => {

    return (
        <Router>
            <Layout>
                    <NavMenu />
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
