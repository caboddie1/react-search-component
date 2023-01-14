import React from 'react';

interface Props {
    label: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
}

export default function Input({ 
    label, 
    onChange = () => null,
    onFocus = () => null
}: Props) {

    const [value, setValue] = React.useState<string>(''); 

    React.useEffect(() => {
        onChange(value);
    }, [value]);

    return (
        <div className="form-floating mb-3">
            <input 
                type="text" 
                className="form-control" 
                placeholder="name@example.com" 
                id="search-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => onFocus()}
            />
            <label htmlFor="search-input">
                {label}
            </label>
        </div>
    )
}
