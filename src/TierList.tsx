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
        <div className="flex w-full" id={`tier-row-${props.itr}`} >
            <div className="size-32 flex-none" id={`tier-label-${props.itr}`}>{props.tierlabel}</div>
            {/* should the images' ids be based on the character name? */}
            <div id={`tier-items-${props.itr}`} className="flex-1 flex">{props.items.map((item, index) => <img id={`row-${props.itr}-item-${index}`} src={`${item.itemPicturePath}`} className="size-32 object-contain flex-none"/>)}</div>
        </div>
    )
}

const pullLastSavedList: (() => ITierRow[]) = (() => {
    return [
        {tierlabel: "S", itr: 1, items: [{itemName: "raisu", itemPicturePath: "src/assets/images/a.jpg"}]},
        {tierlabel: "A", itr: 2, items: []},
        {tierlabel: "B", itr: 3, items: []},
        {tierlabel: "C", itr: 4, items: []},
        {tierlabel: "D", itr: 5, items: []},
        {tierlabel: "F", itr: 6, items: []},
    ]
})


function TierList () {
    const [currentTierList, updateCurrentTierList] = useState<ITierRow[]>(pullLastSavedList())
    
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