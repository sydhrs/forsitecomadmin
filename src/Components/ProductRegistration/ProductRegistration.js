import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Upload, message, Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct} from "../../Slices/productsSlice";
import './ProductRegistration.css'
import {selectProductCategories} from "../../Selectors";
import {setProductCategories} from "../../Slices/productCategoriesSlice";
import jsonData from '../../data.json'

const { Option } = Select;

const ProductRegistration = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [category, setCategory] = useState(null)
    const productCategories = useSelector(selectProductCategories)

    useEffect(() => {
        if(productCategories?.length === 0)
        {
            dispatch(setProductCategories(jsonData.categories))
        }
    }, []);

    const onFinish = (values) => {
        const productData = {
            name: values.name,
            description: values.description,
            quantity: parseInt(values.quantity),
            price: parseFloat(values.price),
            category: values.category,
            image: imageFile,
        };

        dispatch(addProduct(productData));

        form.resetFields();
        setImageFile(null);

        message.success('Product added successfully!');
    };


    const uploadProps = {
        beforeUpload: (file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageBuffer = reader.result; // ArrayBuffer representing the image
                    setImageFile(imageBuffer);
                    resolve(false); // Prevent default upload behavior
                };
                reader.readAsArrayBuffer(file);
            });
        },
    };


    console.log(imageFile)



    const validateNonNegativePrice = (rule, value, callback) => {
        if (value >= 0 || !value) {
            callback();
        } else {
            callback('Price must be a non-negative number');
        }
    };

    const validateNonNegativeQuantity = (rule, value, callback) => {
        if (value >= 0 || !value) {
            callback();
        } else {
            callback('Quantity must be a non-negative number');
        }
    };

    const handleChange = (value) => {
        setCategory(value);
    };

    return (
        <Form className='product-registration-container' form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Product Name" rules={[{ required: true, message: 'Please enter product name' }]}>
                <Input className="custom-input" placeholder='Enter product name'/>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter product description' }]}>
                <Input.TextArea className="custom-input" placeholder='Enter product description' />
            </Form.Item>
            <Form.Item name="quantity" label="Initial Stock Level"
                       rules={[
                           { required: true, message: 'Please enter initial stock level' },
                           { validator: validateNonNegativeQuantity }
                       ]}
            >
                <Input type="number" className="custom-input" placeholder='Enter product quantity'/>
            </Form.Item>
            <Form.Item name="price" label="Price"
                       rules={[
                           { required: true, message: 'Please enter product price' },
                           { validator: validateNonNegativePrice }
                       ]}
            >
                <Input step="0.01" className="custom-input" placeholder='Enter product price'/>
            </Form.Item>
            <Form.Item name="category" label="Category"
                       rules={[
                           { required: true, message: 'Please enter product category' },
                       ]}
            >
                <Select
                    className='custom-category-select'
                    placeholder='Select product category'
                    onChange={handleChange}
                    value={category}
                >
                    {productCategories?.map((opt) => (
                        <Option key={opt.id} value={opt.name}>
                            {opt.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
                <div className='form-buttons'>
                <Form.Item name="image" label="Product Image">
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>
                <div className='action-btns'>
                        <Button className='cancel-btn' key="cancel">
                            Cancel
                        </Button>
                        <Button className='submit-btn' type="primary" htmlType="submit">
                            Add Product
                        </Button>
                </div>

            </div>

        </Form>
    );
};

export default ProductRegistration;
