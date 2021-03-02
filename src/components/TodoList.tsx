import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import {store} from '../store'
import TodoItem from './TodoItem';



const List = styled.ul`
    list-style-type: none;
    padding: 0;
    max-width: 700px;
    margin: 0 auto;
`

const TodoList: React.FC = observer(() => (
    <List className="list-group">
        <li className="list-group-item">
            <select 
                className="form-select" 
                defaultValue={store.filterStatus}
                onChange={
                    (event) => store.filterStatus = Number(event.target.value)
                }
            >
                <option value={0} key={0}>
                    Все
                </option>                                        
                {
                    store.statuses.map((status) => (
                        <option value={status.id} key={status.id}>
                            {status.title}
                        </option>                        
                    ))
                }
            </select>
            <select 
                className="form-select" 
                defaultValue={store.filterName }
                onChange={
                    (event) => store.filterName = Number(event.target.value)
                }
            >
                <option value={"0"} key={0}>
                    Все
                </option>                                        
                {
                    store.users.map((user) => (
                        <option value={user.id} key={user.id}>
                            {user.first_name}{user.last_name}
                        </option>                        
                    ))
                }
            </select>
            <input 
                type="text" 
                className="form-control" 
                defaultValue={store.filterSearch}
                onChange={
                    (event) => store.filterSearch = event.target.value
                }
            />
        </li>

        {
            store.filteredTasks.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} n={index+1} />
            ))
        }
    </List>
));

export default TodoList;
