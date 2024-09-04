import React, {useState} from 'react';
import { Tabs, Pagination } from "antd";

const Header = ( { updateActiveTab, currentPage, updateCurrentPage, onSearchSubmit, totalResults } ) => {
    const [query, setQuery] = useState(''); //строка для инпута

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSearchSubmit(query);
    };
    const handlePageChange = (currentPage) => {
        updateCurrentPage(currentPage);
    };
    return (
        <header>
            <Tabs
                className='tabs-list'
                defaultActiveKey='1'
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
                        className: 'tabs-list__item'
                    }
                ]}
            />
            <form onSubmit={handleSubmit}>
                <input
                    className="search"
                    id="search"
                    placeholder="What movie are u looking for?"
                    onChange={(event) => {setQuery(event.target.value)}}
                />
            </form>
            {totalResults > 0 && (
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={totalResults}
                    showSizeChanger={false}
                    pageSize={20}
                />
            )}
        </header>
    )
}

export default Header