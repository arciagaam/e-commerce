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
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
        <p className='text-xl font-bold'>Collections</p>

        <div className="flex flex-row gap-5">
          {/* <button>Export</button>
          <button>Import</button> */}
          <button onClick={() => { navigate('add') }} className='bg-accent-default text-white py-2 px-3 rounded-md hover:bg-accent-light'>Create Collection</button>
        </div>
      </div>
      
      <div className="flex bg-white p-5 rounded-md shadow-sm">
        <table className='w-full rounded-md overflow-hidden'>
          <thead>
            <tr className='text-left bg-accent-default text-white'>
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
    </div>
  )
}

const TableRow = ({ collection, handleRowSelect }) => {
  return (
    <tr onClick={()=>{handleRowSelect(collection.id)}} className='border-b cursor-pointer hover:bg-accent-light transition-bg duration-200'>
      <td className='p-1 px-3'>{collection.title}</td>
      <td>{collection.description}</td>
    </tr>
  )
}

export default Collections