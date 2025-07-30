// header.js
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
      <div className="flex w-full justify-end max-h-[70px] bg-gray-100 p-2.5 gap-5">
            {error ? (
                <div className="text-red-500 ml-5">{error}</div>
            ) : success ? (
                <div className="text-green-500 ml-5">Changes saved successfully!</div>
            ) : null}
            <button 
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
            >
                Save Changes
            </button>
        </div>
    );
};