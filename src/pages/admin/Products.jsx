import React, { useEffect, useState } from 'react';
import {auth, db} from './../../firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {

    const getData = async () => {

      const docRef = collection(db, 'products');
      const docSnap = await getDocs(docRef);

      const temp = []

      docSnap.forEach(snap => {
        temp.push(snap.data());
      })

      setProducts(temp);
    }
    
    getData();
    
  }, [])

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <p>Products</p>

        <div className="flex flex-row gap-5">
          {/* <button>Export</button>
          <button>Import</button> */}
          <button>Add Product</button>
        </div>
      </div>

      <table>
        <thead>
          <tr className='text-left bg-primary'>
            <th className='p-2'>Product</th>
            <th>Status</th>
            <th>Inventory</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
            {products.map(product => {
              return <TableRow product={product}/>
            })}
        </tbody>
      </table>


    </div>
  )
}

const TableRow = ({ product }) => {
  return (
    <tr className='border-b'>
      <td className='p-1'>{product.name}</td>
      <td>{product.status}</td>
      <td>{product.inventory}</td>
      <td>{product.type}</td>
    </tr>
  )
}

export default Products