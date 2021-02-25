import React, {useEffect} from 'react';
import TodoList from './TodoList';
import {store} from '../store';
import { observer } from 'mobx-react-lite';

const App: React.FC = observer(
  () => {
    useEffect(()=>{
      store.load();
    }, []);

    return (
      <div>
        <TodoList todos={store.tasks} />
      </div>
    );
  }
)

export default App;