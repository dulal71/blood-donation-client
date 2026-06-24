'use client'
import { Button, Modal } from '@heroui/react';
import React, { useState } from 'react';
import { BiRocket } from 'react-icons/bi';

const FundingCheckoutModal = () => {
    const [amount,setAmount]=useState('')
    return (
         <Modal>
      <Button variant="danger">Found Now</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <BiRocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Welcome to Blood Donation</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
             <div className="space-y-2">
    <label className="text-sm font-medium">
      Enter Funding Amount
    </label>

    <input
      type="number"
      name="amount"
      value={amount}
      min="1"
      onChange={(e)=>setAmount(e.target.value)}
      placeholder="Enter amount"
      className="w-full rounded-lg border px-3 py-2 outline-none"
      required
    />
  </div>
            </Modal.Body>
            <Modal.Footer>
              <form action="/api/checkout_sessions" method="POST">
      <input type="hidden" name='amount' value={amount}></input>
      <section>
        <button className='bg-red-700 px-2 text-white rounded-2xl' type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    );
};

export default FundingCheckoutModal;