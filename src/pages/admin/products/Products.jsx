import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
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
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  useEffect(() => {

    const getData = async () => {

      const docRef = collection(db, 'products');
      const docSnap = await getDocs(docRef);

      const temp = []

      docSnap.forEach((snap) => {
        temp.push({ ...snap.data(), id: snap.id });
      })

      setProducts(temp);
    }

    getData();

  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
        <p className='text-xl font-bold'>Products</p>

        <div className="flex flex-row gap-5">
          {/* <button>Export</button>
          <button>Import</button> */}
          <button onClick={() => { navigate('add') }} className='bg-accent-default text-white py-2 px-3 rounded-md hover:bg-accent-light'>Add Product</button>
        </div>
      </div>

      <div className="flex bg-white p-5 rounded-md shadow-sm">
        <table className='w-full rounded-md overflow-hidden'>
          <thead>
            <tr className='text-left bg-accent-default text-white'>
              <th className='p-2'>Product</th>
              <th>Status</th>
              <th>Inventory</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => {
              return <TableRow key={index} product={product} navigate={navigate} />
            })}
          </tbody>
        </table>
      </div>


    </div>
  )
}

const TableRow = ({ product, navigate }) => {
  return (
    <tr className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200' onClick={() => { navigate(`${product.id}`) }}>
      <td className='p-1'>{product.name}</td>
      <td>{product.status}</td>
      <td>{product.inventory}</td>
      <td>{product.type}</td>
    </tr>
  )
}

export default Products