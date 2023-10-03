import React, {useEffect, useState} from 'react';
import { Table, Input, Button, Space, Form, Tooltip } from 'antd';
import jsonData from '../../data.json';
import './InventoryManagement.css'
import SearchBar from "../../Utils/SearchBar";
import DropdownFilter from "../../Utils/Filter";
import {EditFilled} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectedCategories, selectProducts} from "../../Selectors";
import {setProducts} from "../../Slices/productsSlice";
import EditProductModal from "./EditProductModal";


const InventoryManagement = () => {

    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openModal, setOpenModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const categories = useSelector(selectedCategories)

    useEffect(() => {
        dispatch(setProducts({products: jsonData.products, categories: jsonData.categories}))
    }, []);


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
        {
            title: 'Actions',
            render: (_, item) => (
                <Tooltip title="Edit Product Quantity">
                    <Button
                        className="update-inventory"
                        icon={<EditFilled />}
                        onClick={() => {
                            setSelectedProduct(item);
                            setOpenModal(true);
                        }}
                    />
                </Tooltip>
            ),
        }
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
            <EditProductModal openModal={openModal} setOpenModal={setOpenModal} selectedProduct={selectedProduct}/>
        </div>
    );
};

export default InventoryManagement;
