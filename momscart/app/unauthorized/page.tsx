"use client"
import React from 'react';
import { ShoppingCart, Lock, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router=useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Cart Icon with Lock */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <ShoppingCart className="w-24 h-24 text-green-600 mx-auto" strokeWidth={1.5} />
            <div className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-3">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Aisle Closed
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            401 - Unauthorized Access
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 text-left">
            <p className="text-sm text-orange-800">
              <span className="font-semibold">Oops!</span> It looks like you don't have permission to access this section of our store.
            </p>
          </div>

          <div className="text-gray-700 mb-8 space-y-2 text-left">
            <p className="text-sm">You might need to:</p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-2">
              <li>Sign in to your account</li>
              <li>Verify your membership status</li>
              <li>Contact store management for access</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3" >
            <button onClick={()=>router.push("/signin")} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
              Sign In to Continue
            </button>
            
            <button  onClick={()=>router.push("/")} className="w-full bg-white hover:bg-gray-50 text-green-600 font-semibold py-3 px-6 rounded-lg border-2 border-green-600 transition duration-200 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@grocerystore.com" className="text-green-600 hover:underline">
            support@grocerystore.com
          </a>
        </p>
      </div>
    </div>
  );
}