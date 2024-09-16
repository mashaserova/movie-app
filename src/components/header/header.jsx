import React, { useState } from 'react';
import { Tabs } from 'antd';

const Header = ({ activeTab, updateActiveTab, onSearchSubmit }) => {
    const [query, setQuery] = useState(''); //строка для инпута

    const handleChange = async (event) => {
        onSearchSubmit(event.target.value);
        setQuery(event.target.value);
    };
    return (
        <header>
            <Tabs
                className="tabs-list"
                defaultActiveKey="1"
                onChange={(key) => updateActiveTab(key)}
                items={[
                    {
                        label: 'Search',
                        key: 'search',
                        className: 'tabs-list__item',
                    },
                    {
                        label: 'Rated',
                        key: 'rated',
                        className: 'tabs-list__item',
                    },
                ]}
            />
            {activeTab === 'search' && (
                <form>
                    <input
                        className="search"
                        id="search"
                        placeholder="What movie are u looking for?"
                        value={query}
                        onInput={handleChange}
                    />
                </form>
            )}
        </header>
    );
};

export default Header;
