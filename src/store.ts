import { action, computed, observable, runInAction } from "mobx";
import { StatusName, Task, TaskStatus, User } from "./types";


const loadJSON = async (fileName: string) => {
    const response = await fetch(`/files/${fileName}.json`);
    const json = await response.json();
    return json;
};

export class Store {
    @observable
    tasks: Task[];
    @observable
    statuses: StatusName[];
    users: User[];
    
    @observable
    filterStatus: 0 | TaskStatus;

    @observable
    filterName: number;

    @observable
    filterSearch: string;

    constructor() {
        this.tasks = [];
        this.statuses = [];
        this.users = [];
        this.filterStatus = 0;
        this.filterSearch = "";
        this.filterName = 0;
    }

    @computed
    get filteredTasks() {
        if (this.filterStatus || this.filterSearch || this.filterName) {
            return this.tasks.filter((task) => (
                (!this.filterStatus || task.status === this.filterStatus) && 
                new RegExp(this.filterSearch, "i").test(task.title) &&                
                (!this.filterName || task.contractor_id === this.filterName)
            ));
        }
        return this.tasks;
    }


    // @action
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
