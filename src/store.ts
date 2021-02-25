import { observable, runInAction } from "mobx";
import { StatusName, Task, User } from "./types";


const loadJSON = async (fileName: string) => {
    const response = await fetch(`/files/${fileName}.json`);
    const json = await response.json();
    return json;
};

export class Store {
    @observable
    tasks: Task[];
    statuses: StatusName[];
    users: User[];

    constructor() {
        this.tasks = [];
        this.statuses = [];
        this.users = [];            
    }

    async load(){
        // const statusesResponse = await fetch("/files/statuses.json") ;
        // const statuses = await response.json();
        const [{tasks}, {statuses}, {users}] = await Promise.all([
            loadJSON("tasks"),
            loadJSON("statuses"),
            loadJSON("users"),
        ]);
        // const result = await Promise.all([
        //     loadJSON("tasks"),
        //     loadJSON("statuses"),
        //     loadJSON("users"),
        // ]);
        // const tasks = result[0].tasks
        
        runInAction(()=>{
            this.tasks = tasks;
            this.statuses = statuses;
            this.users = users;      
        });
    }
}

export const store = new Store;
