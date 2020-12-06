import React, {useState} from 'react';

import InventoryCard from './Components/InventoryCard/InventoryCard';
import KanbanBoard from './Components/KanbanBoard/KanbanBoard';
import {v4 as uuid} from 'uuid';

/**
 * tutorial source : 
 * https://codesandbox.io/s/jovial-leakey-i0ex5?file=/src/App.js
 * https://www.youtube.com/watch?v=Vqa9NMzF3wc&t=180s&ab_channel=LogRocket
 */


// const itemsFromBackend =[
//   {id: uuid(), content:'first task'},
//   {id: uuid(), content:'second task'},
//   {id: uuid(), content:'third task'},
//   {id: uuid(), content:'first task'},
//   {id: uuid(), content:'second task'},
//   {id: uuid(), content:'third task'},
//   {id: uuid(), content:'first task'},
//   {id: uuid(), content:'second task'},
//   {id: uuid(), content:'third task'},

// ]

function App() {
  const [companyId, setCompanyId] = useState({});
  const [spaceId, setSpaceId] = useState({});
  
  const columnsFromBackend =
  {
    [uuid()]:{
      name:'Todo',
      items : []
    },
    [uuid()]:{
      name:'In Progress',
      items : []
    },
    [uuid()]:{
      name:'Done',
      items : []
    }
  
  }
  const [columns, setColumns] = useState(columnsFromBackend);
  // console.log(columns)
  return (
    <div>
      <KanbanBoard columnsFromBackend = {columns} setColumns = {setColumns}/>
    </div>
  )
    
    
}

export default App;
