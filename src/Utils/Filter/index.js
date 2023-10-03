import {Select} from "antd";
import './styles.css'

const { Option } = Select;
const DropdownFilter = ({handleChange, selectedOption, placeholder, filtersList}) => {


    return (
        <Select
            className='custom-select'
            placeholder={placeholder}
            onChange={handleChange}
            value={selectedOption}
        >
            <Option value="all">All Categories</Option>
            {filtersList?.map((opt) => (
                <Option key={opt.id} value={opt.name}>
                    {opt.name}
                </Option>
            ))}
        </Select>
    )
}

export default DropdownFilter