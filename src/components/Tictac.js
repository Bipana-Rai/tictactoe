import React, { useState } from 'react'


function Tictac() {
    const box = 9;
    const ar = Array.from({ length: box }, (_, index) => index)
    const [choosemove, setchoosemove] = useState(true)
    const [move, setmove] = useState('X')
    const [team, setTeam] = useState(Array(box).fill(""))
    const [clicked, setclicked] = useState(Array(box).fill(null))
    const [isnext, setIsnext] = useState(true)
    const [visible, setvisible] = useState(true)
    const [visibleh, setvisibleh] = useState("hidden")
    const [winning, setwinning] = useState(null)

    const chooseteam = (e) => {
        if (choosemove === true) {
            const val = e.target.value;
            if (val === 'x') {
                setmove('X')
                setIsnext(true)
            }
            else {
                setmove('O')
                setIsnext(false)
            }
            console.log()
        }
    }

    const winningmove = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    const calculatewinner = (team) => {
        for (let index = 0; index < winningmove.length; index++) {
            const [a, b, c] = winningmove[index]
            if (team[a] && team[a] === team[b] && team[a] === team[c]) {
                return team[a];
            }
            console.log(team[a])

        }

    }
    const gamestart = (i) => {
        if (winning) return
        setmove(isnext ? "O" : "X")
        setvisible(false)
        setchoosemove(false)
        if (clicked[i] === null) {
            setTeam((prev) => {
                const newteam = [...prev]
                newteam[i] = isnext ? "X" : "O"
                const winner = calculatewinner(newteam)
                if (winner) {
                    setvisibleh("visible")

                }
                setwinning(winner)
                return newteam
            })

            setclicked((prev) => {
                const newclicked = [...prev]
                newclicked[i] = move
                return newclicked
            })
            setIsnext(!isnext)

        }
    }

    const refreshgame = () => {
        window.location.reload();
    }



    return (
        <>
            <div className="main d-flex flex-column  align-items-center ">
                <h3 className='text-center'>Tic Tac Toe</h3>
                <h4 className='text-center'>Choose your move</h4>
                <span>
                    <button className='btn btn-success' value='x' onClick={chooseteam}>Team X</button>
                    <button className='btn btn-danger  ms-5' value='o' onClick={chooseteam}>Team O</button>
                </span>
                <div className='h'>
                    <h2 style={{ visibility: visible ? "visible" : "hidden" }}>You are {`${move}`}</h2>
                    <h5 style={{ visibility: !visible ? "visible" : "hidden" }}>{`${move}`}'s turn</h5>
                </div>

                <div className='forgrid'>
                    {
                        ar.map((i) => {
                            return <div className='box' onClick={() => gamestart(i)}>{team[i]}</div>
                        })
                    }

                </div>
                <div className='winmove'>
                    <h1 style={{ visibility: visibleh }} >{winning} wins</h1>
                    <button className='btn btn-primary' onClick={refreshgame}>Restart</button>
                </div>
            </div>
        </>
    )

}



export default Tictac