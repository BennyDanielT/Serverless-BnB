import React from 'react'
import { Button } from 'react-bootstrap'
import './item.css'
export default function Item(props) {
  const {item,onAdd} = props
  return (
    <div>
        <img className='item-img-small' src = {item.image_url} alt=""></img>
        <h4>{item.item_name}</h4>
        <div>${item.selling_price}</div>
        <div className= "button-container" >
            <Button className='item-button' variant = 'warning' size='sm' onClick={()=>onAdd(item)}> Add to Cart </Button>
        </div>
    </div>
  )
}
