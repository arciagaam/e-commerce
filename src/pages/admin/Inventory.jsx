import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
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

const Inventory = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
        <p className='text-xl font-bold'>Inventory</p>
      </div>

      <div className="flex bg-white p-5 rounded-md shadow-sm">
        <table className='w-full rounded-md overflow-hidden'>
          <thead>
            <tr className='text-left bg-accent-default text-white'>
              <th className='p-2'>Product</th>
              <th>Available</th>
              <th>On hand</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => {
              return <TableRow key={index} product={product} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = ({ product }) => {
  return (
    <tr className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200'>
      <td className='p-1'>{product.name}</td>
      <td>{product.inventory}</td>
      <td>{product.inventory}</td>
    </tr>
  )
}
export default Inventory