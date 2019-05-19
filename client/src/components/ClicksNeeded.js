import React from 'react';

const ClicksNeeded = ({ clicksLeft }) => {
    return (
        <div className="clicks-needed">
            <span>
                clicks to next win: <strong className="colored"> {clicksLeft} </strong>
            </span>
        </div>
    )
}

export default ClicksNeeded;