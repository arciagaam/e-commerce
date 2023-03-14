import React from 'react'

const TableRow = ({ table, id, name, description, status, inventory, type, handleRowSelect, handleDeleteItem }) => {

  const handleDelete = (id, e) => {
    e.stopPropagation();
    handleDeleteItem(id);
    // location.reload();
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
    }
  }


}

export default TableRow