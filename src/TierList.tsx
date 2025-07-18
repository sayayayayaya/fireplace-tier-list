import { useState } from "react"


interface ITierRow {
    tierlabel: string,
    itr: number,
    items: ITierItem[]
}

interface ITierItem {
    itemName: string,
    itemPath: string
}

const TierRow = ({props}: {props: ITierRow}) => {
    return (
        <div className="flex w-full bg-back-2" id={`tier-row-${props.itr}`} >
            <div className="min-w-24 min-h-24 flex-none flex items-center h-auto" id={`tier-label-${props.itr}`}><p className="mx-auto text-2xl">{props.tierlabel}</p></div>
            {/* should the images' ids be based on the character name? */}
            <div id={`tier-items-${props.itr}`} className="border-l-2 border-gray flex-1 flex flex-wrap">{props.items.map((item, index) => <img id={`row-${props.itr}-item-${index}`} src={`${item.itemPath}`} className="size-24 object-contain flex-none"/>)}</div>
        </div>
    )
}

const raisu = {itemName: "raisu", itemPath: "src/assets/images/a.jpg"}
const hard = {itemName: "gorila", itemPath: "src/assets/images/hard.png"}
const gigaraisu: ITierItem[] = [raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu]

const pullLastSavedList: (() => ITierRow[]) = (() => {
    return [
        {tierlabel: "S", itr: 1, items: [raisu, raisu, raisu]},
        {tierlabel: "A", itr: 2, items: []},
        {tierlabel: "B", itr: 3, items: [raisu]},
        {tierlabel: "C", itr: 4, items: []},
        {tierlabel: "D", itr: 5, items: []},
        {tierlabel: "E", itr: 6, items: []},
        {tierlabel: "F", itr: 7, items: [raisu, raisu]},
    ]
})

const characters: ITierItem[] = [
    raisu, hard, hard, raisu, hard, raisu, raisu, raisu, hard, raisu, hard, raisu, hard, hard, hard, hard
]


function TierList () {
    const [currentTierList, updateCurrentTierList] = useState<ITierRow[]>(pullLastSavedList())
    
    return (
        <>
            <div className="border-2 border-gray divide-y-2 divide-gray w-6xl mb-8">
                {currentTierList.map((tier, index) => <TierRow props={{tierlabel: tier.tierlabel, itr: index, items: tier.items}} />)}
                {/* maybe dont lay these all out once we have saving/loading, have a distinct "unrated" tier and load that the same as the others???? */}
                {/* <button onClick={() => {
                    updateCurrentTierList(currentTierList.slice(0, 5))
                }} >kill F</button>
                <button onClick={() => {
                    updateCurrentTierList(pullLastSavedList())
                }}>Load</button> */}
            </div>
            <div className="flex flex-wrap flex-none w-6xl">
                {characters.map((item, index) => <img id={`unrated-item-${index}`} src={`${item.itemPath}`} className="size-24 object-contain flex-none m-0.5"/>)}
            </div>
        </>
    )
}

export default TierList