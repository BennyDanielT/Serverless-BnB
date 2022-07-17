import React,{ useState, useEffect } from 'react'
import { getMenuItems } from '../../../services/Menu/kitchen.service';
import Item from '../Item/Item';
import './main.css'
export default function Main(props) {

  const {onAdd} = props;
  const[menuItems,setMenuItems] = useState([]);
 
  const getDataFromMenuApi = async() => {
    try {
      const menu = await getMenuItems();
      setMenuItems(menu.data.data);
    } catch (error) {
      console.log(error.message); 
    }
  }
  useEffect(() => {
    getDataFromMenuApi();
  }, []);

  return (
    <main className='main-block main-col-2'>
      <h2 className='menu-title'>Menu</h2>
      <div className="main-row">
          {
            menuItems.map((item)=>(
              <Item key={item.item_id} item={item} onAdd={onAdd}></Item>
            ))
          }
      </div>
    </main>
  )
}
