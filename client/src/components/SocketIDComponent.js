import React from 'react';

const SocketIDComponent = ({ socketId }) => {

    return (
        <div className="socket-id">
            <span>
                your player id: <strong className="colored"> {socketId}</strong>
            </span>
        </div>
    )
}

export default SocketIDComponent;