const Click = require('./models/Click');
const Winner = require('./models/Winner');

const thresholds = [500, 200, 100];

checkPlayerWin = (clickCount) => {
    const win = thresholds.find((threshold) => {
        return clickCount % threshold === 0;
    });
    //if prototype.find returns undefined make it null
    return win === undefined ? null : win;
}

calculateClicksToNextWin = (clickCount) => {
    const clicksLeft = thresholds[2] - clickCount % thresholds[2];
    return clicksLeft;
}

exports = module.exports = function (io) {

    emitPlayerCount = () => {
        io.emit('players', Object.keys(io.sockets.sockets).length);
    }

    emitClickCount = (to) => {
        Click.countDocuments({}, (err, count) => {
            if (err) throw err;

            const clicksLeft = calculateClicksToNextWin(count);
            if (to === 'all') {
                io.emit('clicks', clicksLeft);
            } else {
                io.to(to).emit('clicks', clicksLeft);
            }
        });
    }

    emitWinners = (to) => {
        Winner.find({}, (err, winners) => {
            if (err) throw err;

            if (to === 'all') {
                io.emit('winners', winners);
            } else {
                io.to(to).emit('winners', winners);
            }
        });
    }

    emitWinToWinner = (to, win) => {
        io.to(to).emit('wins', win);
    }

    emitSocketId = (to) => {
        io.to(to).emit('id', to);
    }

    io.on('connection', socket => {
        console.log(`Player connected : [${socket.id}]`);
        emitSocketId(socket.id);
        emitClickCount(socket.id);
        emitWinners(socket.id);
        emitPlayerCount();

        socket.on('disconnect', () => {
            console.log(`Player disconnected : [${socket.id}]`);
            emitPlayerCount();
        })

        socket.on('clicks', () => {
            Click({ clicker_id: socket.id }).save((err) => {
                if (err) throw err;

                Click.countDocuments({}, (err, count) => {
                    if (err) throw err;

                    const win = checkPlayerWin(count);

                    if (win) {
                        Winner({ winner_id: socket.id, win: win, clickCount: count }).save((err) => {
                            if (err) throw err;
                            emitWinners('all');
                            emitWinToWinner(socket.id, win);
                        });
                    }
                    emitClickCount('all');
                });
            });
        });
    });
}