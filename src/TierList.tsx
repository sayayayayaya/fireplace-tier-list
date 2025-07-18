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
        <div className="flex w-full bg-back-2" id={`tier-row-${props.itr}`} >
            <div className="min-w-24 min-h-24 flex-none flex items-center h-auto" id={`tier-label-${props.itr}`}><p className="mx-auto text-2xl">{props.tierlabel}</p></div>
            {/* should the images' ids be based on the character name? */}
            <div id={`tier-items-${props.itr}`} className="border-l-2 border-gray flex-1 flex flex-wrap">{props.items.map((item, index) => <img id={`row-${props.itr}-item-${index}`} src={`${item.itemPicturePath}`} className="size-24 object-contain flex-none"/>)}</div>
        </div>
    )
}

const pullLastSavedList: (() => ITierRow[]) = (() => {
    const riasu = {itemName: "raisu", itemPicturePath: "src/assets/images/a.jpg"}
    return [
        {tierlabel: "S", itr: 1, items: [riasu, riasu, riasu,riasu, riasu, riasu,riasu, riasu, riasu,riasu, riasu, riasu,riasu, riasu, riasu,riasu, riasu, riasu,riasu, riasu, riasu]},
        {tierlabel: "A", itr: 2, items: []},
        {tierlabel: "B", itr: 3, items: [riasu]},
        {tierlabel: "C", itr: 4, items: []},
        {tierlabel: "D", itr: 5, items: []},
        {tierlabel: "E", itr: 6, items: []},
        {tierlabel: "F", itr: 7, items: [riasu, riasu]},
    ]
})


function TierList () {
    const [currentTierList, updateCurrentTierList] = useState<ITierRow[]>(pullLastSavedList())
    
    return (
        <>
            <div className="border-2 border-gray divide-y-2 divide-gray w-6xl">
                {currentTierList.map((tier, index) => <TierRow props={{tierlabel: tier.tierlabel, itr: index, items: tier.items}} />)}
                {/* <button onClick={() => {
                    updateCurrentTierList(currentTierList.slice(0, 5))
                }} >kill F</button>
                <button onClick={() => {
                    updateCurrentTierList(pullLastSavedList())
                }}>Load</button> */}
            </div>
        </>
    )
}

export default TierList