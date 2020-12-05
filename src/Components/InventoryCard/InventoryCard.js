import React from 'react'
import PropTypes from 'prop-types'
import './InventoryCard.css'

const InventoryCard = props => {
    return (
        <div>
             <div class="row">
            {/* <div class="col "> 
                <img class ="product-image" src="images/HPV-vaccine-_Gardasil2016JAPAN-03.jpg" alt="" srcset="" />
            </div> */}
            <div class="col"> 
                <div class="row">
                    <h3>HPV vaccine</h3>
                </div>
                <div class ="row">
    
                    <p> hpv vaccine description here</p>
                </div>
                <div class ="row">
                    <div class="col location">
                        <p>Location</p>
                        <b>H6-15-4</b>
                    </div>
                    <div class="col inventory-on-hand">
                        <p>Inventory</p>
                        <b>16</b>
                    </div>
                    <div class="col safety-stock">
                        <p>Safety stock</p>
                        <b> 30</b>
                    </div>
                </div>
                
            </div>
    
        </div>

    
        </div>
    )
}

InventoryCard.propTypes = {

}

export default InventoryCard
