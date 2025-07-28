import { createContext } from "react";

interface IUserContextProps {
    list: IUserList,
    listener: {(userID: number): void}
}

const UserSelectContext = createContext<IUserContextProps>({list: {users: [], currentUserID: -1}, listener: () => {}})

export {UserSelectContext}