const checkWinner = require('./winner')

const Square = ({id, newState}) => {
    const [color, setColor] = React.useState('pink');
    const [status, setStatus] = React.useState(null);
    const XorO = ["O", "X"];

    const palet = ['red', 'blue', 'green'];
    const getRandomColor = () => palet[Math.floor(Math.random()*3)];

    React.useEffect(() => {
        console.log(`Render ${id}`);
        return () => console.log(`unmounting Square ${id}`);
    });
    // Keeping track of the Square state
    return (
        <button 
            onClick = {e => {
                let col = getRandomColor();
                setColor(col);
                let nextPlayer = newState(id);
                setStatus(nextPlayer);
                e.target.style.background = col;
            }}
        > 
            <h1>{XorO[status]}</h1> 
        </button>
    );
};

const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [state, setState] = React.useState([Array(9).fill(null)]);
    const [mounted, setMounted] = React.useState(true);
    const [random, setRandom] = React.useState(0);

    let status = `Player ${player}`;
    let winner = checkWinner(state);
    if(winner != null) status = `Player ${winner} wins`;

     const toggle = () => setMounted(!mounted);
     const reRender = () => setRandom(Math.random());

    const newState = idOfSquare => {
        let thePlayer = player;
        state[idOfSquare] = player;
        setState(state);
        let nextPlayer = (player + 1) % 2;
        setPlayer(nextPlayer);
        setState([...state, obj]);
        console.log(`adding state ${JSON.stringify(state)}`);
        status = `Player ${nextPlayer}`;
        return thePlayer;
    };

    function renderSquare(i) {
        return <Square id={i} player ={player} newState={newState}></Square>;
    }

    return (
        <div className="game-board">
            <div className="grid-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="grid-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="grid-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div id="info">
                <button onClick = {toggle}>Show/Hide Row</button>
                <button onClick={reRender}>Re-render</button>
                <h1> {status} </h1>
            </div>
        </div> 
    );
};

ReactDOM.render(<Board/>, document.getElementById("root"));