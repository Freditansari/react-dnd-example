import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import KanbanBoard from '../KanbanBoard/KanbanBoard'

const onDragEnd = (result, columns , setColumns) =>{


}



const KanbanDashboard = props => {
    return (
        <div>
            
            
            <DragDropContext onDragEnd = {result =>{ onDragEnd(result, props.columns, props.setColumns)}}>
                <Droppable droppableId ="all-columns" direction="horizontal" type="column">
                    {(provided) =>(<div {...provided.droppableProps} innerRef ={provided.innerRef}>

                         <Draggable>
                            <KanbanBoard columns = {props.columns} setColumns = {props.setColumns}/>
                         </Draggable>
                         {provided.placeholder}
                     </div>)}
                 </Droppable>

            </DragDropContext>
        </div>
    )
}

KanbanDashboard.propTypes = {

}

export default KanbanDashboard
