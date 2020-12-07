import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import InventoryCard from '../InventoryCard/InventoryCard'
import AddColumn from '../addColumn/AddColumn';
import './KanbanBoard.css'




const KanbanBoard = props => {
    const {columns, setColumns} = props


    useEffect(() => {
      const loadedObject = JSON.parse(localStorage.getItem('myData'))
      console.log(loadedObject)
      try {
         if(Object.entries(loadedObject).length !== 0 ){
            setColumns(loadedObject)
          }
        
      } catch (error) {
        console.log("no entry found")
      }

    }, [])

    const array_move =(arr, old_index, new_index) =>{
      while (old_index < 0) {
          old_index += arr.length;
      }
      while (new_index < 0) {
          new_index += arr.length;
      }
      if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
              arr.push(undefined);
          }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing purposes
  };
    // const [columns, setColumns] = useState(columnsFromBackend);
    const onDragEnd = (result, columns , setColumns, type) =>{
      // console.log("old columns: ",columns)
        if(!result.destination) return; 
        const {source, destination} = result;
        // console.log(type)
    
        if(source.droppableId !== destination.droppableId && type==="task"){
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
    
        }else if(type==="task"){
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
    
        if(type=== "column" ){
          let copiedColumns = Object.entries(columns)
          // const movedColumn = columns[draggableId];
          const toIndex = destination.index;
          const fromIndex = source.index;
        
          // sortedObject = [...copiedColumns.splice(toIndex,1)]
          const sortedObject = array_move(copiedColumns, fromIndex, toIndex)
          
          let sendThisToState ={};
          for (let index = 0; index < sortedObject.length; index++) {
              
              sendThisToState[sortedObject[index][0]]= sortedObject[index][1];
            
          }
          console.log(sendThisToState)
          setColumns(sendThisToState)
    
        }

      }
    



    return (
  
           <div>
      
                  <div className="scrolling-wrapper-flexbox">
                  <DragDropContext onDragEnd = {result =>{ onDragEnd(result, columns, setColumns, result.type)}} >
               <Droppable droppableId="all-columns" type="column" direction="horizontal">{(provided, snapshot) =>(
               <div {...provided.droppableProps} ref={provided.innerRef} >
                    <div classname="scrolls" style={{display: 'flex', justifyContent:'center',  height:'100%'}}>                  
                      {Object.entries(columns).map(([id, column], index)=>{
                        // console.log("index: ", index)
                        return (
                          <Draggable draggableId = {id} index ={index}>
                            {(provided) =>(
                            <div  ref = {provided.innerRef}
                            {...provided.draggableProps}
                            >
                              <div style={{margin: 8}}>
                                          <div style={{display: 'flex', flexDirection:"column", alignItems:'center' }}>
                                          <h2 {...provided.dragHandleProps}>{column.name}</h2>
                                          </div>
                                          <Droppable droppableId={id} key={id} direction="vertical" type="task" >
                                            {(provided, snapshot) =>(
                                            <div className="card" {...provided.droppableProps} ref={provided.innerRef} 
                                            style={{ background: snapshot.isDraggingOver?'lightblue': 'lightgrey', 
                                              padding: 4, 
                                              width: 350, 
                                              minHeight: 500
                                            }}>
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
                                                              {/* <InventoryCard />    */}
                                                              

                                                            </div>
                                                          )
                                                        }}
                                                    
                                              
                                                      </Draggable>
                                                      
                                                    )
                                                  })}
                                          </div>)}
                                          </Droppable>
                                          
                                      

                                </div>
                            </div>)}
                          </Draggable>
                        )
                      })}
                
                
                  
                    <div>
                        <AddColumn setColumns = {props.setColumns} columns = {props.columns}/>
                        {/* < button class="btn btn-info btn-block" onClick={handleAddColumn} type="submit">Save</button> */}
                    </div>
              
                
                </div>
         </div>)}</Droppable>
      </DragDropContext>
                  </div>
       
       
           
 
    </div>

    
     
  );
  
}

KanbanBoard.propTypes = {

}

export default KanbanBoard
