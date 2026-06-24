import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { addFundingData } from '@/lib/action/addFunding'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
   const data ={
   ... metadata,
   session_id
   }
   const res = await addFundingData(data)
   console.log(res);
    
    return (
      <section className="min-h-screen flex items-center justify-center p-6 bg-red-50">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-red-100">
          <div className="mb-6 flex justify-center">
            {/* Heart/Blood Donation Icon */}
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">Thank You, Hero!</h1>
          <p className="text-gray-500 mb-6 italic">Your contribution saves lives.</p>
          
          <div className="bg-red-50 p-4 rounded-xl mb-6 text-sm text-gray-700">
            <p>
              A confirmation email has been sent to <strong>{customerEmail}</strong>. 
              Your noble support helps us keep the blood supply ready for those in need.
            </p>
          </div>

          <Link 
            href="/funding-page" 
            className="inline-block w-full py-3 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition duration-300 font-bold shadow-lg shadow-red-200"
          >
            Back to Home
          </Link>
        </div>
      </section>
    )
  }
}