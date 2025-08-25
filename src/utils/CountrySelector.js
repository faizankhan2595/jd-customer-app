import { Select } from 'antd';
import { CountryContext } from 'CountryContext';
import React, { useContext } from 'react';

function CountrySelector({ value, onChange }) {
    const { countryList } = useContext(CountryContext);

    return (
        <Select
            showSearch
            value={value}
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Search and select a country"
        >
            {countryList.map((country) => (
                <Select.Option key={country.id} value={country.id}>
                    {country.name}
                </Select.Option>
            ))}
        </Select>
    );
}

export default CountrySelector;
