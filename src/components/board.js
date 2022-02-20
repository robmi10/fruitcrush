import { useState, useEffect } from "react"
import "../board.scss"
import banana from "../images/newbanana.png"
import blueberrie from "../images/newblueberry.png"
import cherry from "../images/newcherry.png"
import greenapple from "../images/newgreenapple.png"
import peach from "../images/newpeach.png"
import purplegrape from "../images/newgrape.png"
import blank from "../images/blank.png"
import Scoretable from "./Scoretable"


const width = 8
const fruitColors = [
    blueberrie,
    peach,
    greenapple,
    cherry,
    banana,
    purplegrape,
]

export default function Board(){
    const [currentColorMix, SetcurrentColorMix] = useState([])
    const [DraggedSquared, SetDraggedSquared] = useState(null)
    const [DraggedSquaredReplaced, SetDraggedSquaredReplaced] = useState(null)
    const [scoreGet, setScoreGet] = useState(0)

    const [fourthColumnstatus, setFourthColumnstatus] = useState(false)
    const [thirdColumnstatus, setThirdColumnstatus] = useState(false)
    const [FourthRowstatus, setFourthRowstatus] = useState(false)
    const [thirdRowstatus, setThirdRowstatus] = useState(false)

    const checkFourthRow = () =>{
        for(let i = 0; i < 64; i++){
            const RowOfFour = [i, i + 1,  i + 3]
            const isBlank = currentColorMix[i] === blank

            const decideColor = currentColorMix[i]
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

            if(notValid.includes(i)) continue

            if(RowOfFour.every(square => currentColorMix[square] === decideColor && !isBlank)){
                console.log("inside get checkFourthRow points")
                setFourthRowstatus(true)
                setScoreGet(()=> scoreGet + 4)
                RowOfFour.forEach(square => currentColorMix[square] = blank) 
                
            return true
            }
        }
        return false
    }

    const checkThirdRow = () =>{
        for(let i = 0; i < 64; i++){
            const RowOfThree = [i, i + 1,  i + 2]
            const isBlank = currentColorMix[i] === blank

            const decideColor = currentColorMix[i]
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

            if(notValid.includes(i)) continue

            if(RowOfThree.every(square => currentColorMix[square] === decideColor && !isBlank)){
                console.log("inside get checkThirdRow points")
                setThirdRowstatus(true)
                setScoreGet(()=> scoreGet + 3)
                RowOfThree.forEach(square => currentColorMix[square] = blank)
                
            return true
         
            }
        }
        return false
    }

    const checkThirdColumn = () =>{
        for(let i = 0; i < 47; i++){
            const columnOfThree = [i, i + width,  i + width * 2]

            const decideColor = currentColorMix[i]
            const isBlank = currentColorMix[i] === blank

            if(columnOfThree.every(square => currentColorMix[square] === decideColor && !isBlank)){
                console.log("inside get checkThirdColumn points")
                setThirdColumnstatus(true)
                setScoreGet(()=> scoreGet + 3)
                columnOfThree.forEach(square => currentColorMix[square] = blank)
                
            return true
                
            }
        }
        return false
    }

    const checkFourthColumn = () =>{
        var status = null
        for(let i = 0; i < 39; i++){
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decideColor = currentColorMix[i]
            const isBlank = currentColorMix[i] === blank

            if(columnOfFour.every(square => currentColorMix[square] === decideColor && !isBlank)){
                console.log("inside get checkFourthColumn points")
                setFourthColumnstatus(true)
                setScoreGet(()=> scoreGet + 4)
                status = true

                columnOfFour.forEach(square => currentColorMix[square] = blank)
                
            return true
            }
            
        }

        return false
    }

    const moveDownSquare = () =>{
        for(let i = 0; i <= 55; i++){

            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const IsFirstrwow = firstRow.includes(i)

            if(IsFirstrwow && currentColorMix[i] === blank){
               let getRandomColour = Math.floor(Math.random() * fruitColors.length)
               currentColorMix[i] = fruitColors[getRandomColour]
            }

            if((currentColorMix[i + width]) === blank){
                currentColorMix[i + width] = currentColorMix[i]
                currentColorMix[i] = blank
            }
        }
    }

    const drag_start = (e) =>{
     
        SetDraggedSquared(e.target)

    }

  /*   const drag_check = (e) =>{
       const IsFourthColumn = checkFourthColumn()
       const IsThirdColumn = checkThirdColumn()
       const IsThirdRow = checkThirdRow()
       const IsFourthRow = checkFourthRow()

       console.log("IsFourthColumn -->", IsFourthColumn)
       console.log("IsThirdColumn -->", IsThirdColumn)
       console.log("IsThirdRow -->", IsThirdRow)
       console.log("IsFourthRow -->", IsFourthRow)
       moveDownSquare()

    } */

    const drag_drop = (e) =>{
        SetDraggedSquaredReplaced(e.target)
    }

    const drag_end = (e) =>{

        const squareDraggeddId = parseInt(DraggedSquared.getAttribute('dataid'))
        const squareReplacedId = parseInt(DraggedSquaredReplaced.getAttribute("dataid"))
        
        const AcceptedMoves = [
            squareDraggeddId - 1,
            squareDraggeddId - width,
            squareDraggeddId + 1,
            squareDraggeddId + width, 
        ]

        console.log("current wwidth", width)

        const AcceptedMove = AcceptedMoves.includes(squareReplacedId)

        console.log("AcceptedMove --->", AcceptedMove)
        console.log("AcceptedMove ->", AcceptedMove)

        const IsFourthColumn = checkFourthColumn()
        const IsThirdColumn = checkThirdColumn()
        const IsThirdRow = checkThirdRow()
        const IsFourthRow = checkFourthRow()
        console.log("----------------------------------")
        console.log("IsFourthColumn -->", IsFourthColumn)
        console.log("IsThirdColumn -->", IsThirdColumn)
        console.log("IsThirdRow -->", IsThirdRow)
        console.log("IsFourthRow -->", IsFourthRow)
        console.log("----------------------------------")

        if(squareReplacedId && AcceptedMove && (IsFourthColumn || IsThirdColumn || IsThirdRow || IsFourthRow)){
            console.log("inside get points")
            console.log("curr squareReplacedId -->", squareReplacedId)
            console.log("curr squareDraggeddId -->", squareDraggeddId)
    
            SetDraggedSquared(null)
            SetDraggedSquaredReplaced(null)
            
        }else{
            console.log("inside else")
        }
    }

    const create_board =() =>{
        const randomColorMix = []
        for (let i = 0; i < width * width; i++){
            const randomColor = fruitColors[Math.floor(Math.random() * fruitColors.length)]
            randomColorMix.push(randomColor)
        }
        SetcurrentColorMix(randomColorMix)
    }

    useEffect(() => {
       create_board()
    }, [])

    useEffect(() => {

        const timer = setInterval(() => {
            checkFourthColumn()
            checkThirdColumn()
            checkThirdRow()
            checkFourthRow()
            moveDownSquare()
            SetcurrentColorMix([...currentColorMix])

        }, 100);
        return () => clearInterval(timer)
     }, [checkFourthColumn, checkThirdColumn, checkThirdRow, checkFourthRow, currentColorMix])

    return(
        <div className="app">
            <div className ="game">
                {currentColorMix.map((option, i) =>(
                    <img
                    key = {i}
                    src={option}
                    alt = {option}
                    dataid = {i}
                    draggable = {true}
                    onDragStart = {drag_start}
                    onDragOver ={(e)=> e.preventDefault()}
                    onDragEnter ={(e)=> e.preventDefault()}
                    onDragLeave ={(e)=> e.preventDefault()}
                    onDrop = {drag_drop}
                    onDragEnd = {drag_end}
                    />

                ))}

            </div>

            <Scoretable score ={scoreGet}/>

        </div>
    )
}