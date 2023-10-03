import React from 'react';
import {Chart, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar} from 'recharts';
import { Card, Select, Row, Col } from 'antd';
import jsonData from '../../data.json';
import './RevenueAnalysis.css';
import TotalDisplayCard from "./TotalDisplayCard"; // Import your styles

const { Option } = Select;

const RevenueAnalysis = () => {
    const { categories, salesData, revenueTrendsData } = jsonData;

    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const filteredData = selectedCategory === 'all' ? salesData : salesData.filter(item => item.category === selectedCategory);

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    const displayTotalValues = [
        {
            title: "Total Orders",
            value: salesData.reduce((sum, item) => sum + item.orders, 0)
        },
        {
            title: "Total Sales",
            value: salesData.reduce((sum, item) => sum + item.sales, 0)
        },
    ]

    return (
        <div className="revenue-analysis-container">
            <Row gutter={16}>
                {
                        displayTotalValues.map(item =>
                            <Col span={12} style={{marginBottom: 16}}>
                                <TotalDisplayCard title={item.title} value={item.value} />
                            </Col>
                        )
                }
            </Row>
            <Card title="Inventory Trends" style={{marginBottom: 16}}>
                <Select
                    value={selectedCategory}
                    className="select-category"
                    onChange={value => setSelectedCategory(value)}
                >
                    <Option value="all">All Categories</Option>
                    {categories.map(category => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
                <div className="revenue-chart">
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" className="recharts-text" />
                        <YAxis className="recharts-text" />
                        <Tooltip wrapperClassName="recharts-tooltip-wrapper" />
                        <Legend
                            wrapperStyle={{ color: '#333' }}
                            iconSize={20}
                            iconType="circle"
                            className="recharts-legend"
                        />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
                        <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
                        <Line type="monotone" dataKey="inventory" stroke="#ffc658" name="Inventory" />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
            <Card title="Revenue Trends">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#EE296D" name="Revenue" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default RevenueAnalysis;
