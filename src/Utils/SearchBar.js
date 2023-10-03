import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ onSearch }) => {
    return (
        <div style={{ marginBottom: 16, marginTop: 20 }}>
            <Input
                placeholder="Search by product name"
                prefix={<SearchOutlined />}
                onChange={e => onSearch(e.target.value)}
                allowClear
            />
        </div>
    );
};

export default SearchBar