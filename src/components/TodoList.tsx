import React from 'react';
import styled from 'styled-components';
import { Task } from '../types';
import TodoItem from './TodoItem';

export interface TodoListProps {
    todos: Task[];
}

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    max-width: 700px;
    margin: 0 auto;
`

const TodoList: React.FC<TodoListProps> = ({todos}) => (
    <List className="list-group">
        {
            todos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} n={index+1} />
            ))            
        }
    </List>
);

export default TodoList;
