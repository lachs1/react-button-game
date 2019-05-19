import React from 'react';

const Button = ({ processClick, isLoading }) => {
    return (
        <div>
            <button className="button" onClick={processClick} disabled={isLoading}> click me to play :) </button>
        </div>
    )
}

export default Button;