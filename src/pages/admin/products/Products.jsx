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
import TableRow from '../../../components/TableRow';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [deleteProductId, setDeleteProductId] = useState('');

  const deleteProduct = (id) => {
    setDeleteProductId(id);
  }

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

  const handleRowSelect = (id) => {
    navigate(`${id}`);
  }

  useEffect(() => {

    const deleteProductItem = async () => {
      if (deleteProductId) {
        const docRef = doc(db, 'products', deleteProductId);

        await deleteDoc(docRef).then(async () => {

          console.log('Deleted product successfully!');

          const collectionRef = collection(db, 'users');
          const cSnap = await getDocs(collectionRef);

          cSnap.forEach(async (c) => {
            const cartRef = collection(db, `users/${c.id}/cart`);
            const cartSnap = await getDocs(cartRef);

            cartSnap.forEach(async (cart) => {
              if (cart.data().product_id == deleteProductId) {
                const cartDocRef = doc(db, `users/${c.id}/cart`, cart.id);
                await deleteDoc(cartDocRef).then(() => {
                  console.log('Specific product deleted from carts');
                })
              }
            });
          });

        })
      }
    }

    deleteProductItem();

  }, [deleteProductId]);

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
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => {
              return <TableRow
                key={index}
                table={'products'}
                id={product.id}
                name={product.name}
                status={product.status}
                inventory={product.inventory}
                type={product.type}
                handleRowSelect={handleRowSelect}
                handleDeleteItem={deleteProduct}

              />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products