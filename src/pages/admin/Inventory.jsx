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
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <p>Inventory</p>
      </div>

      <table>
        <thead>
          <tr className='text-left bg-primary'>
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
  )
}

const TableRow = ({ product }) => {
  return (
    <tr className='border-b'>
      <td className='p-1'>{product.name}</td>
      <td>{product.inventory}</td>
      <td>{product.inventory}</td>
    </tr>
  )
}
export default Inventory