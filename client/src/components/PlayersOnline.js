import React from 'react';

const PlayersOnline = ({ playersOnline }) => {

    return (
        <div className="players-online">
            <span>
                players online: <strong className="colored"> {playersOnline} </strong>
            </span>
        </div>
    )
}

export default PlayersOnline;