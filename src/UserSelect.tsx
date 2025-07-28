import { useContext } from "react"
import { UserSelectContext } from "./UserSelectContext"

const UserList: IUserList = {
    users: [{name: "", iconPath: "src,assets/images/users/none.png", id: 0},
    {name: "Saya Yaya", iconPath: "src/assets/images/users/Saya.png", id: 1},
    {name: "Yohara Iosevka", iconPath: "src/assets/images/users/Yohara.png", id: 2},
    {name: "S'khara Dismal", iconPath: "src/assets/images/users/Skhara.png", id: 3},
    {name: "Kiwi Iriq", iconPath: "src/assets/images/users/Kiwi.png", id: 4},
    {name: "Alexandra Atessa", iconPath: "src/assets/images/users/Alexandra.png", id: 5},
    {name: "Val Haliber", iconPath: "src/assets/images/users/Val.png", id: 6},
    {name: "Archie Asalie", iconPath: "src/assets/images/users/Archie.png", id: 7},
    {name: "Darkia Stellia", iconPath: "src/assets/images/users/Darkia.png", id: 8},
    {name: "Gregeor Chapman", iconPath: "src/assets/images/users/Gregeor.png", id: 9}],
    currentUserID: 0
}

function UserSelect() {
    const context = useContext(UserSelectContext)

    return (
        <div>
            <select name="userID" onChange={updateListeners}>
                {context.list.users.map((user: IUser) => <option value={user.id}>{user.name}</option> )}
            </select>
        </div>
    )

    function updateListeners(e) {
        e.preventDefault()
        context.listener(e.target.value)
    } 
}

export { UserList }
export default UserSelect