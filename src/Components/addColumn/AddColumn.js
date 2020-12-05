import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid';


const AddColumn = props => {

    const [newColumn ,setNewColumn] = useState({id: null, columnName : '' , items:[]});

    const handleAddColumn = (e) =>{
        e.preventDefault()
        // todo props.setAddColumns
        const setNewColumnId = {
            [uuid()]:{
                name: newColumn.columnName,
                items:[]
            }
        }

        props.setColumns({...props.columns, ...setNewColumnId})
    }
    
    const handleInputChange = (event) =>{
        const { name, value } = event.target

        // setUser({ ...user, [name]: value })
        setNewColumn({...newColumn, [name]: value})

    }
    return (
        <div>
            <form class="border border-light p-5">

                <input type="text" name="columnName" value = {newColumn.columnName} onChange={handleInputChange} id="columnNameInput" class="form-control mb-4" placeholder="Enter Column name here.. " />

             < button class="btn btn-info btn-block" onClick={handleAddColumn} type="submit">Save</button>
            </form>
            
        </div>
    )
}

AddColumn.propTypes = {

}

export default AddColumn
