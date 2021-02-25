import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { store } from '../store';
import { Task, TaskStatus } from '../types';

export interface TodoItemProps {
    n: number;
    todo: Task;
}

const Item = styled.li`
  display: flex;  
  justify-content: space-between;
  align-items: center;  
`

const TodoItem: React.FC<TodoItemProps> = observer(({n, todo: task}) => {
  const modifyTitle = () => {
    task.title += "!";
  };
  const complete = () => {
    task.status = TaskStatus.completed;
  };
  const cancel = () => {
    task.status = TaskStatus.canceled;
  };
  const close = () => {
    task.status = TaskStatus.closed;
  };


  const user = store.users.find((user)=> user.id === task.contractor_id);
  const status = store.statuses.find((status)=> status.id === task.status);


  return (
    <Item className="list-group-item" onClick={modifyTitle} >
        <strong>{n}</strong>
        <p>{task.title}</p>
        <span> Статус: {status?.title ?? "Не найден"}</span>
        {
            user && 
            <>    
                <span> {user.first_name} </span>
                <span> {user.last_name} </span>
            </>    
        }
        <span> Выполнена </span>
        { 
            task.status === TaskStatus.created &&
            <>
                <button type="button" className="btn-dark" onClick={complete}>Выполнить</button>
                <button type="button" className="btn-light" onClick={close}>Отменить</button>
            </>
        }
        { 
            task.status === TaskStatus.completed &&
            <button type="button" className="btn-dark" onClick={cancel}>Закрыть</button>            
        }
    </Item>
  );
});

export default TodoItem;
