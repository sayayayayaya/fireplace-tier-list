import { useState } from "react"
import { DndContext } from "@dnd-kit/core";
import {useDroppable, useDraggable} from '@dnd-kit/core';


interface ITierRow {
    tierlabel: string,
    itr: number,
    rowItems: ITierItem[]
}

interface ITierItem {
    itemName: string,
    itemPath: string,
    itemLocation: number
}

interface ITierRowProps {
    row: ITierRow,
    list: ITierRow[]
}

const TierRow = ({props}: {props: ITierRowProps}) => {
    const {setNodeRef} = useDroppable({
        id: props.row.itr
    })
    return (
        <div className="flex w-full bg-back-2" id={`tier-row-${props.row.itr}`} >
            <div className="min-w-24 min-h-24 flex-none flex items-center h-auto" id={`tier-label-${props.row.itr}`}><p className="mx-auto text-2xl">{props.row.tierlabel}</p></div>
            <div ref={setNodeRef} id={`tier-items-${props.row.itr}`} className="border-l-2 border-gray flex-1 flex flex-wrap">
                {props.list[props.row.itr].rowItems.map((item) => <TierItem props={{itemName: item.itemName, itemPath: item.itemPath, itemLocation: props.row.itr}} />)}
            </div>
        </div>
    )
}

const TierItem = ({props}: {props: ITierItem}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.itemName,
        data: {
            location: props.itemLocation
        }
    })
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;
    return(
        <img id={`item-${props.itemName}`} src={`${props.itemPath}`} className="size-24 object-contain flex-none" ref={setNodeRef} style={style} {...listeners} {...attributes}/>
    )
}

let raisu: ITierItem = {itemName: "raisu", itemPath: "src/assets/images/a.jpg", itemLocation: 7}
let hard: ITierItem = {itemName: "gorila", itemPath: "src/assets/images/hard.png", itemLocation: 7}
const gigaraisu: ITierItem[] = [raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu]

const pullLastSavedList: (() => ITierRow[]) = (() => {
    return [
        {tierlabel: "S", itr: 0, rowItems: []},
        {tierlabel: "A", itr: 1, rowItems: []},
        {tierlabel: "B", itr: 2, rowItems: []},
        {tierlabel: "C", itr: 3, rowItems: []},
        {tierlabel: "D", itr: 4, rowItems: []},
        {tierlabel: "E", itr: 5, rowItems: []},
        {tierlabel: "F", itr: 6, rowItems: []},
        {tierlabel: "unsorted", itr: 7, rowItems: [raisu, hard]}
    ]
})

// let characters: ITierItem[] = [
//     raisu, hard
// ]

    

function TierList () {
    const [currentTierList, updateCurrentTierList] = useState<ITierRow[]>(pullLastSavedList())
    // const [currentTierList, updateCurrentTierList] = useState<ITierRow[]>(currentList)
    
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="border-2 border-gray divide-y-2 divide-gray w-6xl mb-8">
                {currentTierList.map((tier, index) => {
                    if (index > 6) return
                    return <TierRow props={{row: tier, list: currentTierList}} />
                })}
            </div>
            <div className="flex flex-wrap flex-none w-6xl">
                {currentTierList && currentTierList[7].rowItems.map((item) => <TierItem props={{itemName: item.itemName, itemPath: item.itemPath, itemLocation: 7}} />)}
            </div>
        </DndContext>
    )

    function handleDragEnd(event) {
        const {active, over} = event
        console.log(event, currentTierList)

        let newList = currentTierList

        newList[over ? over.id : 7].rowItems.push(currentTierList[active.data.current.location].rowItems.splice(currentTierList[active.data.current.location].rowItems.findIndex(item => item.itemName == active.id), 1)[0])
        updateCurrentTierList(currentList => [...newList])

    }
}

export default TierList