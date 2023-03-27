import React from 'react'

const TableRow = ({ table, id, name, description, status, inventory, type, order, handleRowSelect, handleDeleteItem }) => {

  const handleDelete = (id, e) => {
    e.stopPropagation();
    handleDeleteItem(id);
    location.reload();
  }
  
  switch (table) {
    case 'collections': {
      return (
        <tr onClick={() => { handleRowSelect(id) }} className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200'>
          <td className='p-1 px-3'>{name}</td>
          <td>{description}</td>
          <td><button onClick={(e) => handleDelete(id, e)}>Delete</button></td>
        </tr>
      )
      break;
    }
    
    case 'products': {
      return (
        <tr onClick={() => { handleRowSelect(id) }} className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200'>
          <td className='p-1'>{name}</td>
          <td>{status}</td>
          <td>{inventory}</td>
          <td>{type}</td>
          <td><button onClick={(e) => handleDelete(id, e)}>Delete</button></td>
        </tr>
      )
      break;
    }
    
    case 'profileOrders': {
      const order_date = order.order_date.toDate().toLocaleDateString();
      return (
        <tr onClick={() => { handleRowSelect(id) }} className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200'>
          <td className='p-1'>{id}</td>
          <td>{order_date}</td>
          <td className='flex flex-col'>{order.products.map((product, index) => {

            return (<p key={index}>{product.name}</p>)
          })}</td>
          <td>₱{order.total_price}</td>
        </tr>
      )
      break;
    }
    
    case 'orders': {
      const order_date = order.order_date.toDate().toLocaleDateString();

      return (
        <tr onClick={() => { handleRowSelect(id) }} className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200'>
          <td className='p-1'>{id}</td>
          <td>{order_date}</td>
          <td>Order {order.status}</td>
          <td>{order.payment_method}</td>
          <td>₱{order.total_price}</td>
        </tr>
      )
      break;
    }
  }


}

export default TableRow