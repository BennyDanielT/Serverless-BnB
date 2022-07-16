import React from 'react'
import { orderItems } from '../../../services/Menu/kitchen.service';
import { useNavigate } from "react-router-dom";
import './basket.css'

export default function Basket(props) {
  const {cartItems,onAdd,onRemove} = props;
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce((a,c)=>a + c.selling_price * c.qty,0);
  const handleOrder = async (orderCart) => {
      const orderRequest = {};
      const order = [];
      orderRequest['user_id'] = "preet";
      //orderRequest['user_id'] = localStorage.get();
      for(var i=0;i<cartItems.length;i++) {
        const item = cartItems[i];
        const orderItem = {};
        orderItem['item_id'] = item['item_id'];
        orderItem['quantity'] = item['qty'];
        order.push(orderItem);
      }
      orderRequest['order'] = order;
      const response = await orderItems(orderRequest);
      if(response.success) {
        navigate("/notifications");
      }else{
        alert('Order not placed, please retry');
      }
  }
  return (

    <aside className='basket-block basket-col-1'>
      <h2 className='basket-title'>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is Empty</div>}
      </div>
      {cartItems.map((item)=>(
        <div key = {item.item_id} className="basket-row">
          <div className='basket-col-2'>{item.item_name}</div>
          <div className='basket-col-2'>
            <button onClick={()=>onAdd(item)} className="add">+</button>
            <button onClick={()=>onRemove(item)} className="remove">-</button>
          </div>
          <div className='basket-col-2 text-right'>
            {item.qty} x ${item.selling_price.toFixed(2)}
          </div>
        </div>
      ))}
      {cartItems.length!==0 && (
        <>
          <hr></hr>
          <div className='basket-row'>
              <div className='basket-col-2'>Order Total</div>
              <div className='basket-col-1 text-right'>{`$ ${itemsPrice.toFixed(2)}`}</div>
          </div>
          <div className='basket-row'>
              <button className='basket-col-1' onClick={()=>handleOrder(cartItems)}>Order</button>
          </div>

        </>
      )}
    </aside>
  )
}
