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
  query,
  where,
} from "firebase/firestore";
import TableRow from '../../../components/TableRow';

const Collections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [deleteCollectionId, setDeleteCollectionId] = useState('');

  const deleteCollection = (id) => {
    setDeleteCollectionId(id);
  }

  useEffect(() => {
    const getData = async () => {

      const docRef = collection(db, 'collections');
      const docSnap = await getDocs(docRef);
      const temp = [];

      docSnap.forEach(snap => {
        temp.push({ ...snap.data(), id: snap.id });
      })

      setCollections(temp);
    }
    getData();
  }, []);

  const handleRowSelect = (id) => {
    navigate(`${id}`);
  }

  useEffect(() => {

    const deleteCollectionItem = async () => {
      if (deleteCollectionId) {
        const docRef = doc(db, 'collections', deleteCollectionId);

        await deleteDoc(docRef).then(async () => {
          const collectionRef = collection(db, 'products');
          const q = query(collectionRef, where('collection', '==', deleteCollectionId));
          const product = await getDocs(q);
          product.forEach(async (item) => {
            const itemRef = doc(db, 'products', item.id);
            // const itemSnap = await getDoc(itemRef);
            await updateDoc(itemRef, {
              collection: ''
            });
          });

          console.log('Deleted collection successfully!');
        })
      }
    }

    deleteCollectionItem();



  }, [deleteCollectionId]);

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
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {collections.map((collection, index) => {
              return <TableRow
                key={index}
                table={'collections'}
                id={collection.id}
                name={collection.title}
                description={collection.description}
                handleRowSelect={handleRowSelect}
                handleDeleteItem={deleteCollection}

              />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Collections