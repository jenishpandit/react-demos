    import { Button , Modal, Tag} from "antd";
    import { useEffect, useState } from "react";
    import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";

    const Game = () => {
    const [state, setState] = useState({
        playerVal: null,
        computerVal: null,
        playerScore: 0,
        compScore: 0,
    });

    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const { playerVal, computerVal, playerScore, compScore } = state;


    useEffect(()=>{
        if(playerScore === 3 || compScore === 3){
          setShowWinnerModal(true);
        }
    },[playerScore,compScore])

    const logic = (playerVal:any, computerVal:any) => {
        if (playerVal === computerVal) {
        return 0;
        } else if (
        (playerVal === "ROCK" && computerVal === "SCISSORS") ||
        (playerVal === "SCISSORS" && computerVal === "PAPER") ||
        (playerVal === "PAPER" && computerVal === "ROCK")
        ) {
        return 1;
        } else {
        return -1;
        }
    };

    const decision = (playerChoice:any) => {
        const choices = ["ROCK", "PAPER", "SCISSORS"];
        const compChoice = choices[Math.floor(Math.random() * choices.length)];
        const val = logic(playerChoice, compChoice);

        if (val === 1) {
        setState((prevState:any) => ({
            ...prevState,
            playerVal: playerChoice,
            computerVal: compChoice,
            playerScore: prevState.playerScore + 1,
        }));
        } else if (val === -1) {
        setState((prevState:any) => ({
            ...prevState,
            playerVal: playerChoice,
            computerVal: compChoice,
            compScore: prevState.compScore + 1,
        }));
        } else {
        setState((prevState:any) => ({
            ...prevState,
            computerVal: compChoice,
            playerVal: playerChoice,
        }));
        }
    };

    const resetGame = () =>{
        setState({
           playerVal:null,
           computerVal:null,
           playerScore:0,
           compScore:0, 
        })
        setShowWinnerModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Rock, Paper, Scissors Game</h1>
        <div className="flex space-x-5">
            <Button
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold h-10 w-30 rounded "
            style={{height:'50px'}}
            onClick={() => decision("ROCK")}
            >
            <FaHandRock  style={{marginLeft:'9px'}}/>  Rock
            </Button>
            <Button
            className="bg-green-500 hover:bg-green-800 text-white font-bold h-10 w-30 rounded "
            style={{height:'50px'}}
            onClick={() => decision("PAPER")}
            >
            <FaHandPaper  style={{marginLeft:'9px'}}/>  Paper
            </Button>
            <Button
            className="bg-red-500 hover:bg-red-800 text-white font-bold h-10 w-30 rounded "
            style={{height:'50px'}}
            onClick={() => decision("SCISSORS")}
            >
            <FaHandScissors  
            style={{marginLeft:'15px' }}/> Scissors
            </Button>
        </div>
        <div className="mt-8">
            <p className="text-xl font-bold">Your choice: {playerVal}</p>
            <p className="text-xl font-bold">Computer's choice: {computerVal}</p>
            <p className="text-xl font-bold">Your Score: {playerScore}</p>
            <p className="text-xl font-bold">Computer Score: {compScore}</p>
        </div>
        <Modal
            visible={showWinnerModal}
            title='Game Over!'
            onCancel={()=>resetGame()}
            footer={[
                <Button key='try again' onClick={() => resetGame()}>
                    Try Again
                </Button>,
            ]}
            >
                <p className="text-xl font-bold  p-2">
                    Winner🎉🎉
                </p>
            <Tag color="red" className="h-10 w-50"> 
               <p className="text-2xl">{playerScore === 3 ? "You are the winner!" : "Computer wins!"}</p></Tag>
        </Modal>
        </div>
    );
    };

    export default Game;
