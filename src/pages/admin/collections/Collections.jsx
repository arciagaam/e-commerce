import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
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

const Collections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const getData = async () => {

      const docRef = collection(db, 'collections');
      const docSnap = await getDocs(docRef);
      const temp = [];

      docSnap.forEach(snap => {
        temp.push({...snap.data(), id:snap.id});
      })

      setCollections(temp);
    }
    getData();
  }, [])

  const handleRowSelect = (id) => {
      navigate(`${id}`);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <p>Collections</p>

        <div className="flex flex-row gap-5">
          {/* <button>Export</button>
          <button>Import</button> */}
          <button onClick={() => { navigate('add') }}>Create Collection</button>
        </div>
      </div>

      <table>
        <thead>
          <tr className='text-left bg-primary'>
            <th className='p-2'>Collection Title</th>
            <th>Products</th>
          </tr>
        </thead>

        <tbody>
          {collections.map((collection, index) => {
            return <TableRow key={index} collection={collection} handleRowSelect={handleRowSelect} />
          })}
        </tbody>
      </table>
    </div>
  )
}

const TableRow = ({ collection, handleRowSelect }) => {
  return (
    <tr onClick={()=>{handleRowSelect(collection.id)}} className='border-b cursor-pointer'>
      <td className='p-1'>{collection.title}</td>
      <td>{collection.description}</td>
    </tr>
  )
}

export default Collections