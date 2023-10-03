import React, { useState } from 'react';
import { Table, Input, Button, Space, Modal, Form, Tooltip } from 'antd';
import jsonData from '../../data.json';
import './InventoryManagement.css'
import SearchBar from "../../Utils/SearchBar";

const { confirm } = Modal;

const InventoryManagement = () => {

    const [searchText, setSearchText] = useState('');
    const {products} = jsonData

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

    return (
        <div>
            <SearchBar onSearch={handleSearch}/>
            <Table
                dataSource={products}
                columns={columns}
                rowKey="id"
                pagination={paginationConfig}
            />
        </div>
    );
};

export default InventoryManagement;
