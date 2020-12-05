import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import InventoryCard from '../InventoryCard/InventoryCard'
import AddColumn from '../addColumn/AddColumn';

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


const KanbanBoard = props => {
    const {columnsFromBackend} = props
    const [columns, setColumns] = useState(columnsFromBackend);


    const handleAddColumn = () =>{
        const newColumn = {
            [uuid()]:{
                name: "banana",
                items:[]
            }
        }
  
        props.setColumns(...columnsFromBackend, newColumn)
    
     
    }

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
                      width: 350, 
                      minHeight: 500
                    }}>
                      <div style={{display: 'flex', flexDirection:'column', alignItems:'center' }}>
                      {/* <h2>{column.name}</h2> */}
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
                                  {/* {item.content} */}
                                  <InventoryCard />   
                                 

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
        <div>
            {/* <AddColumn setColumns = {props.setColumns} columns = {columnsFromBackend}/> */}
            < button class="btn btn-info btn-block" onClick={handleAddColumn} type="submit">Save</button>
        </div>
   
    
    </div>
  );
    
}

KanbanBoard.propTypes = {

}

export default KanbanBoard
