import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
/**
 * tutorial source : 
 * https://codesandbox.io/s/jovial-leakey-i0ex5?file=/src/App.js
 * https://www.youtube.com/watch?v=Vqa9NMzF3wc&t=180s&ab_channel=LogRocket
 */


const itemsFromBackend =[
  {id: uuid(), content:'first task'},
  {id: uuid(), content:'second task'},
  {id: uuid(), content:'third task'},

]





const columnsFromBackend =
  {
    [uuid()]:{
      name:'Todo',
      items : itemsFromBackend
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

  const onDragEnd = (result, columns , setColumns) =>{
    if(!result.destination) return; 
    const {source, destination} = result;

    if(source.droppableId !== destination.droppableId){
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems= [...sourceColumn.items];
      const destItems =[...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns, 
        [source.droppableId]:{
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]:{
          ...destColumn,
          items: destItems
        }
      })

    }else{
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0 , removed);
      setColumns({
        ...columns,
        [source.droppableId]:{
          ...column,
          items: copiedItems
        }
      })
  

    }

  }



function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="App" style={{display: 'flex', justifyContent:'center', height:'100%'}}>
        <DragDropContext onDragEnd = {result =>{ onDragEnd(result, columns, setColumns)}} >

          {Object.entries(columns).map(([id, column])=>{
            return (
             <div style={{margin: 8}}>
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot)=>{
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef} 
                    style={{ background: snapshot.isDraggingOver?'lightblue': 'lightgrey', 
                      padding: 4, 
                      width: 250, 
                      minHeight: 500
                    }}>
                      <div style={{display: 'flex', flexDirection:'column', alignItems:'center' }}>
                      <h2>{column.name}</h2>
                      </div>
                      {column.items.map((item, index)=>{
                        return (
                          <Draggable key = {item.id} draggableId= {item.id} index ={index}>
                            {(provided, snapshot)=>{
                              return (
                                <div
                                  ref = {provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style ={{
                                    userSelect:'none',
                                    padding: 16,
                                    margin:'0 0 8px 0',
                                    minHeight:'50px',
                                    // backgroundColor: snapshot.isDragging?'#263b4a': '#456C86',
                                    backgroundColor: snapshot.isDragging?'#6A8CC3': '#35558A',
                                    color: 'white',
                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                    ...provided.draggableProps.style
                                  }}
                                >
                                  {item.content}

                                </div>
                              )
                            }}
                       
                 
                          </Draggable>
                          
                        )
                      })}
                     
                    </div>
                  )
                }

                }
              </Droppable>
              </div>
            )
          })}

        </DragDropContext>
    
    </div>
  );
}

export default App;
