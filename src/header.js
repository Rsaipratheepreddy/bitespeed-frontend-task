// header.js
import './common.css'
import { useStore } from './store';
import { useState } from 'react';

export const Header = () => {
    const { validateNodes, error } = useStore();
    const [success, setSuccess] = useState(false);

    const handleSave = () => {
        if (validateNodes()) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div className="header-con">
            {error ? (
                <div style={{ color: 'red', marginLeft: '20px' }}>{error}</div>
            ) : success ? (
                <div style={{ color: 'green', marginLeft: '20px' }}>Changes saved successfully!</div>
            ) : null}
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
};