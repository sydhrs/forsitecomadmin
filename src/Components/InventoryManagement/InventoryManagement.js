import React, { useState } from 'react';
import { Table, Input, Button, Space, Modal, Form, Tooltip } from 'antd';
import jsonData from '../../data.json';
import './InventoryManagement.css'
import SearchBar from "../../Utils/SearchBar";
import DropdownFilter from "../../Utils/Filter";

const { confirm } = Modal;

const InventoryManagement = () => {

    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const {products, categories} = jsonData


    const filteredProducts = products.filter((product) => {
        const searchFilter = product.name.toLowerCase().includes(searchText.toLowerCase());
        const categoryFilter = selectedCategory === 'all' || product.category === selectedCategory;
        return searchFilter && categoryFilter;
    });


    const columns = [
        {
            title: 'Product name',
            dataIndex: 'name',
            key: 'name',
            render: (title) => (
                <Tooltip title={title} overlayClassName='custom-tooltip'>
                    {title.length > 20 ? `${title.substring(0, 30)}...` : title}
                </Tooltip>
            )
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: {
                compare: (a, b) => a.quantity - b.quantity,
                multiple: 2,
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: {
                compare: (a,b) => {
                    const priceA = parseFloat(a.price.replace('$', ''))
                    const priceB = parseFloat(b.price.replace('$', ''))
                    return priceA - priceB
                },
                multiple: 1
            }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Inventory status',
            dataIndex: 'inventoryStatus',
            key: 'inventoryStatus',
        },
    ]

    const paginationConfig = {
        pageSize: 5
    }

    const handleSearch = value => {
        setSearchText(value);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    return (
        <div className="inventory-management-container">
            <div className='search-filters-container'>
                <SearchBar onSearch={handleSearch}/>
                <DropdownFilter placeholder={'Select Category'} filtersList={categories} handleChange={handleCategoryChange} selectedOption={selectedCategory}/>
            </div>
            <Table
                dataSource={filteredProducts}
                columns={columns}
                rowKey="id"
                pagination={paginationConfig}
            />
        </div>
    );
};

export default InventoryManagement;
