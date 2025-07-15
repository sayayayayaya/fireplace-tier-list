import { useState } from "react"

interface ITierRow {
    tierlabel: string,
    itr: number,
    items: ITierItem[]
}

interface ITierItem {
    itemName: string,
    itemPicturePath: string
}

const TierRow = ({props}: {props: ITierRow}) => {
    return (
        <div id={`tier-row-${props.itr}`} >
            <div id={`tier-label-${props.itr}`}>{props.tierlabel}</div>
            <div id={`tier-items-${props.itr}`}></div>
        </div>
    )
}

const pullLastSavedList: (() => ITierRow[]) = (() => {

    return [
        {tierlabel: "S", itr: 1, items: []},
        {tierlabel: "A", itr: 2, items: []},
        {tierlabel: "B", itr: 3, items: []},
        {tierlabel: "C", itr: 4, items: []},
        {tierlabel: "D", itr: 5, items: []},
        {tierlabel: "F", itr: 6, items: []},
    ]
})


function TierList () {
    const [currentTierList, updateCurrentTierList] = useState<ITierRow[]>(pullLastSavedList())
    
    const [isShown, toggleElement] = useState<boolean>(true)

    return (
        <>
            {currentTierList.map((tier, index) => <TierRow props={{tierlabel: tier.tierlabel, itr: index, items: tier.items}} />)}
            <button onClick={() => {
                updateCurrentTierList(currentTierList.slice(0, 5))
            }} >kill F</button>
            <button onClick={() => {
                updateCurrentTierList(pullLastSavedList())
            }}>Load</button>
        </>
    )
}

export default TierList