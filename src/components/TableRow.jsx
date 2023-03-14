import React from 'react'

const TableRow = ({ collection, handleRowSelect, handleDeleteCollection }) => {

  const handleCollectionDelete = (id, e) => {
    e.stopPropagation();
    handleDeleteCollection(id);
  }

  return (
    <tr onClick={()=>{handleRowSelect(collection.id)}} className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200'>
      <td className='p-1 px-3'>{collection.title}</td>
      <td>{collection.description}</td>
      <td><button onClick={(e) => handleCollectionDelete(collection.id, e)}>Delete</button></td>
    </tr>
  )
}

export default TableRow