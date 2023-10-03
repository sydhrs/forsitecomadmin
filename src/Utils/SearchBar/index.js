import React, {useState} from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './styles.css'
const SearchBar = ({ onSearch }) => {
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        setIsActive(false);
    };

    return (
        <div className={`search-bar-container ${isActive ? 'active' : ''}`}>
            <Input
                className={`search-bar ${isActive ? 'active' : ''}`}
                placeholder="Search by product name"
                prefix={<SearchOutlined className="search-icon" />}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => onSearch(e.target.value)}
                allowClear
            />
        </div>
    );
};

export default SearchBar