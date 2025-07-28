declare interface IUser {
    name: string,
    iconPath: string,
    id: number
}

declare interface IUserList {
    users: IUser[],
    currentUserID: number
}

interface ITierRow {
    tierlabel: string,
    itr: number,
    rowItems: ITierItem[]
}

interface ITierItem {
    id: string,
    itemPath: string,
    itemLocation: number
}
