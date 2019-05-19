import React from 'react';
import WINS from '../tools';

const WinnerList = ({ winners }) => {
    const winnerList = [...winners].reverse().map((winner) => {
        let iso = new Date(winner.date);
        return (
            <li key={winner.date} className={WINS[winner.win].color} >
                [{iso.toLocaleDateString()} {iso.toLocaleTimeString()}] : {winner.winner_id} has just won {WINS[winner.win].dc} price!
          </li>
        )
    });

    return (
        <div className="winners">
            <strong>recent winners:</strong>
            <ul className="winner-list">
                {winnerList.length > 0 ? winnerList : 'No winners yet. Be the first one to win!'}
            </ul>
        </div>
    )
};

export default WinnerList;