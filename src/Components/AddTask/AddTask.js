import React,  {useState} from 'react'
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';




const AddTask = props => {
    const [newTask, setNewTask] = useState({id: "", content:''});


    const handleAddTask = (e) =>{
        e.preventDefault()
  
        const copiedColumns = props.columns;
        copiedColumns[props.columnId].items.push(newTask)
     
        props.setColumns(copiedColumns) //this works but does not refresh
        // props.setColumns({...props.columns[props.columnId].items, newTask})
        props.forceUpdate();
    }

    const handleInputChange = (event) =>{
        const {name, value} = event.target

        newTask.id = uuid();

        setNewTask({...newTask, [name]: value})
    }

    return (
        <div>
            <form className="border border-light p-5">
            <div className="row">
                <div className="col-sm-9">
                     <input key={props.columnId} className="form-control mb-4" name="content" onChange={handleInputChange} value={newTask.content} id="newTask" type="text" placeholder="enter new task" />

                </div>
                <div className="col-sm-3">
                    <button className="btn btn-info btn-block" onClick={handleAddTask} type="submit">+</button>

                </div>
            </div>
            
           
            </form>
        </div>
    )
}

AddTask.propTypes = {

}

export default AddTask
