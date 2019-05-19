import React from 'react';
import WINS from '../tools';

const Alert = ({ alertMessage, closeAlert }) => {
    return (
        <div className="win-alert">
            {alertMessage !== null &&
                <div className="alert-content">
                    <span>Congratulations! You have won a <strong className={WINS[alertMessage].color}>{WINS[alertMessage].dc}</strong> price! I hope you enjoy this amazing price ;)</span>
                    <button className="alert-button" onClick={closeAlert}>Continue</button>
                </div>
            }
        </div>
    )
}

export default Alert;