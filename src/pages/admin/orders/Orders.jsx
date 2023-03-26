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

const Orders = () => {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const handleRowSelect = (id) => {
    navigate(`${id}`);
  }

  useEffect(() => {
    const getOrders = async () => {
      const ordersRef = collection(db, 'orders');
      const ordersDoc = await getDocs(ordersRef);

      const data = [];

      ordersDoc.forEach((order) => {
        data.push({ ...order.data(), id: order.id });
      })

      console.log(data);
      setOrders(data);
    }
    getOrders();
  }, [])

  useEffect(() => {
    console.log(orders);
  }, [orders])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center bg-white p-5 rounded-md shadow-sm">
        <p className='text-xl font-bold'>Orders</p>

      </div>

      <div className="flex bg-white p-5 rounded-md shadow-sm">
        <table className='w-full rounded-md overflow-hidden'>
          <thead>
            <tr className='text-left bg-accent-default text-white'>
              <th className='p-2'>Order ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Payment method</th>
              <th>Total Price</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => {
              return <TableRow
                key={index}
                table={'orders'}
                id={order.id}
                order={order}
                handleRowSelect={handleRowSelect}
              />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders