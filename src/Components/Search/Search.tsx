import React from 'react';

import './search.css';
import useOnClickOutside from '../hooks/onClickOutside';
import Input from '../Input';

interface Props<T> {
    list: T[];
    accessor: (arg: T) => string;
    renderList?: (arg: T[]) => React.ReactElement;
}

export default function Search<T>({
    list,
    accessor,
    renderList = (list) => (
        <ul className="list-group">
            {list.map(item => (
                <li key={accessor(item)} className="list-group-item">
                    {accessor(item)}
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
        return list.filter(item => {
            return new RegExp(searchText.toLowerCase()).test(accessor(item).toLowerCase())
        })
    }, [searchText]);

    return (
        <div ref={ref} className="search-wrapper">
            <Input
                label="Search"
                onChange={(value) => setSearchText(value)}
                onFocus={onFocus}
            />
            {shouldShowList &&
                <div className="search-result-list border p-3">
                    <h6>Search Results</h6>
                    <div>
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
