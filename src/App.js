import React, {useState} from 'react';

import InventoryCard from './Components/InventoryCard/InventoryCard';
import KanbanBoard from './Components/KanbanBoard/KanbanBoard';
import {v4 as uuid} from 'uuid';



/**
 * tutorial source : 
 * https://codesandbox.io/s/jovial-leakey-i0ex5?file=/src/App.js
 * https://www.youtube.com/watch?v=Vqa9NMzF3wc&t=180s&ab_channel=LogRocket
 */

function App() {
  const [companyId, setCompanyId] = useState({});
  const [spaceId, setSpaceId] = useState({});
  
  // const columnsFromBackend =
  // {
  //   [uuid()]:{
  //     name:'Todo',
  //     items : [
  //         {id: uuid(), content:'first task'},
  //     ]
  //   },
  //   [uuid()]:{
  //     name:'In Progress',
  //     items : [
  //         {id: uuid(), content:'second task'},
  //     ]
  //   },
  //   [uuid()]:{
  //     name:'Done',
  //     items : []
  //   }
  
  // }
  const [columns, setColumns] = useState({});
  // const [columns, setColumns] = useState({});
  // console.log(columns)
  return (
    <div>
  
              <KanbanBoard columns = {columns} setColumns = {setColumns}/>

    
          
            
        
        {/* <KanbanDashboard columns = {columns} setColumns={setColumns} /> */}

    </div>
  )
    
    
}

export default App;
