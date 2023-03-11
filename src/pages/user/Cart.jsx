import React from 'react'

const Cart = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <p className='self-center'>My Cart</p>

      <div className="flex flex-row">

        <div className="flex flex-col w-[60%] bg-slate-100">

          <CartItem />

        </div>

        <div className="flex flex-col flex-1 bg-slate-50 gap-5">

          <div className="flex flex-row gap-2">
            <p>Estimated Total</p>
            <p>Php 1,232.00</p>
          </div>

          <button>Checkout</button>

        </div>

      </div>

    </div>
  )
}

const CartItem = () => {
  return (

    <div className="flex flex-row py-5 px-4 gap-5 justify-between">

      <div className="flex flex-row flex-1 gap-10">
        <div className="flex flex-col">
          <div className="aspect-square h-[160px]">
            <img className='object-cover' src="/images/cat1.png" alt="prod" />
          </div>
        </div>

        <div className="flex flex-col justify-between">

          <div className="flex flex-row gap-10">
            <div className="flex flex-col">
              <div className="flex flex-row gap-10">
                <p>Product Name</p>
                <p>Product Price</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-row gap-20">
          <p>Quantity</p>
          <p>Total</p>
        </div>

        <div className="flex flex-row gap-2">
          <p>Edit</p>
          <p>Remove</p>
        </div>
      </div>
    </div>

  )
}

export default Cart