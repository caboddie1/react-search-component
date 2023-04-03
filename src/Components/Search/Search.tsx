import React from 'react';

import './search.css';
import useOnClickOutside from '../hooks/onClickOutside';
import Input from '../Input';

interface Props<T> {
    list: T[];
    onClick?: (item: T) => void;
    accessor: (arg: T) => string;
    renderList?: (arg: T[]) => React.ReactElement;
    resultLimit?: number;
}

export default function Search<T>({
    list,
    accessor,
    onClick,
    resultLimit,
    renderList = (list) => (
        <ul className="list-group">
            {list.map(item => (
                <li key={accessor(item)} className="list-group-item p-0">
                    <button className='btn' onClick={() => onClick ? onClick(item) : null}>
                        {accessor(item)}
                    </button>
                </li>
            ))}
        </ul>
    )
}: Props<T>) {

    const [searchText, setSearchText] = React.useState<string>('');
    const [showList, setShowList] = React.useState<boolean>(false);

    const ref = React.useRef(null);

    useOnClickOutside(ref, () => setShowList(false));

    function onFocus() {
        setShowList(true);
    }

    const shouldShowList = React.useMemo(() => {
        return showList && searchText.length > 0;
    }, [showList, searchText]);

    const results = React.useMemo(() => {
        const searchResults = list.filter(item => {
            return new RegExp(searchText.toLowerCase()).test(accessor(item).toLowerCase())
        })

        return resultLimit ? searchResults.slice(0, resultLimit) : searchResults;

    }, [searchText]);

    return (
        <div ref={ref} className="search-wrapper">
            <Input
                label="Search"
                onChange={(value) => setSearchText(value)}
                onFocus={onFocus}
            />
            {shouldShowList &&
                <div className="result-list-wrapper border p-3">
                    <h6>Search Results</h6>
                    <div className="result-list pe-2">
                        {results.length > 0  ?
                            renderList(results)
                        :
                            <p>No results found</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
