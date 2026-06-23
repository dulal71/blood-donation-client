'use client'; // Required for Next.js App Router interactivity

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Forbidden= () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div>
                    {/* Shield/Lock Icon */}
                    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-50 text-red-500 mb-4">
                        <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        403 - Forbidden
                    </h1>
                    
                    <p className="mt-3 text-sm text-gray-500 max-w-sm mx-auto">
                        You do not have permission to access this resource. Please verify your credentials or contact your administrator.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex justify-center items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Go Back
                    </button>
                    
                    <Link
                        href="/"
                        className="inline-flex justify-center items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;