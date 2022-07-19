import { Link, useParams } from 'react-router-dom';

function ConfirmGameModal({players}) {
    const gameId = useParams().gameId
    console.log(gameId);
    return(
        <Link state={{players}} to={`/gamepage/${gameId}`}>Let's Play!</Link>
    )
}

export default ConfirmGameModal;