import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p>Die Seite, die du suchst, existiert nicht.</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to="/" className="text-white">
                        Dashboard
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Error;
