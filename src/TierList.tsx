import { useContext, useState } from "react"
import { DndContext, pointerWithin } from "@dnd-kit/core"
import { useDroppable } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable"
import UserSelect, { UserList } from "./UserSelect"
import { UserSelectContext } from "./UserSelectContext"

function TierList () {
    interface ITierRowProps {
        row: ITierRow,
        list: ITierRow[]
    }

    const TierRow = ({props}: {props: ITierRowProps}) => {
        const {setNodeRef} = useDroppable({
            id: props.row.itr,
            data: {
                isTier: true
            }
        })
        return (
            <SortableContext items={props.list[props.row.itr].rowItems} strategy={horizontalListSortingStrategy}>
                <div ref = {setNodeRef} className="flex w-full bg-back-2" id={`tier-row-${props.row.itr}`} >
                    <div className="min-w-24 min-h-24 flex-none flex items-center h-auto" id={`tier-label-${props.row.itr}`}><p className="mx-auto text-2xl">{props.row.tierlabel}</p></div>
                    <div id={`tier-items-${props.row.itr}`} className="border-l-2 border-gray flex-1 flex flex-wrap">
                        {props.list[props.row.itr].rowItems.map((item) => <TierItem props={{id: item.id, itemPath: item.itemPath, itemLocation: props.row.itr}} />)}
                    </div>
                </div>
            </SortableContext>
        )
    }

    const TierItem = ({props}: {props: ITierItem}) => {
        const {attributes, listeners, setNodeRef, transform} = useSortable({
            id: props.id,
            data: {
                location: props.itemLocation,
                isTier: false,
                item: props
            }
        })
        const style = transform ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
        } : undefined;
        return(
            <img id={`item-${props.id}`} src={`${props.itemPath}`} className="size-24 object-contain flex-none" ref={setNodeRef} style={style} {...listeners} {...attributes}/>
        )
    }

    const [currentTierList, updateCurrentTierList] = useState<ITierRow[]>([ 
        {tierlabel: "S", itr: 0, rowItems: []},
        {tierlabel: "A", itr: 1, rowItems: []},
        {tierlabel: "B", itr: 2, rowItems: []},
        {tierlabel: "C", itr: 3, rowItems: []},
        {tierlabel: "D", itr: 4, rowItems: []},
        {tierlabel: "E", itr: 5, rowItems: []},
        {tierlabel: "F", itr: 6, rowItems: []},
        {tierlabel: "unsorted", itr: 7, rowItems: []}
    ])
    
    const workingList = currentTierList

    const userSelectContext = useContext(UserSelectContext)
    const [userContext, setUserContext] = useState({list: UserList, listener: updateList})
    
    return (
        <>
            <UserSelectContext value={userContext}>
                <UserSelect />
                {(userContext.list.currentUserID > 0 && currentTierList) ? 
                    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} collisionDetection={pointerWithin}>
                        <div className="border-2 border-gray divide-y-2 divide-gray w-6xl mb-8">
                            {currentTierList.map((tier, index) => {
                                if (index > 6) return
                                return <TierRow props={{row: tier, list: currentTierList}} />
                            })}
                        </div>
                        <div className="flex flex-wrap flex-none w-6xl">
                            <SortableContext items={currentTierList[7].rowItems} strategy={horizontalListSortingStrategy}>
                                {currentTierList && currentTierList[7].rowItems.map((item) => <TierItem props={{id: item.id, itemPath: item.itemPath, itemLocation: 7}} />)}
                            </SortableContext>
                        </div>
                    </DndContext> 
                : null}
            </UserSelectContext>
        </>
    )

    function updateList(userID: number) {
        //Pull list by userID
        console.log(userID)
        console.log(userContext.list.currentUserID)
        console.log(currentTierList)

        if (userID > 0) {
            const raisu: ITierItem = {id: "raisu", itemPath: "src/assets/images/a.jpg", itemLocation: 7}
            const hard: ITierItem = {id: "gorila", itemPath: "src/assets/images/hard.png", itemLocation: 7}
            const gigaraisu: ITierItem[] = [raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu, raisu]
            updateCurrentTierList(currentList => [ {tierlabel: "S", itr: 0, rowItems: userID == 1 ? gigaraisu : []},
                {tierlabel: "A", itr: 1, rowItems: []},
                {tierlabel: "B", itr: 2, rowItems: []},
                {tierlabel: "C", itr: 3, rowItems: []},
                {tierlabel: "D", itr: 4, rowItems: []},
                {tierlabel: "E", itr: 5, rowItems: []},
                {tierlabel: "F", itr: 6, rowItems: []},
                {tierlabel: "unsorted", itr: 7, rowItems: [raisu, hard]}
            ])
            const newUserContext = userContext
            newUserContext.list.currentUserID = userID
            setUserContext(newUserContext)
            console.log("updated")
            console.log(currentTierList)
        }
    }

    function handleDragOver(event) {
        const {active, over} = event
        let overLocation = 7
        if (over != null) {
            overLocation = over.data.current.isTier ? over.id : over.data.current.location
        }
        const activeLocation = active.data.current.location
        if (overLocation == activeLocation) return

        workingList[overLocation].rowItems.push(currentTierList[activeLocation].rowItems.splice(currentTierList[activeLocation].rowItems.findIndex(item => item.id == active.id), 1)[0])
        active.data.current.location = overLocation
        updateCurrentTierList(currentList => [...workingList])
    }

    function handleDragEnd(event) {
        const {active, over} = event
        if (over == null || active.id == over.id) return

        const currentRow = workingList[active.data.current.location].rowItems
        const oldIndex = currentRow.findIndex(item => item.id == active.data.current.item.id)
        const newIndex = over.data.current.isTier ? currentRow.length : currentRow.findIndex(item => item.id == over.data.current.item.id)

        workingList[active.data.current.location].rowItems = arrayMove(currentRow, oldIndex, newIndex)
        updateCurrentTierList(currentList => [...workingList])
    }
}

export default TierList