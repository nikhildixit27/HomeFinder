import React from 'react'
import {FcGoogle} from 'react-icons/fc'

export default function OAuth() {
    return (
        <button className='w-full flex items-center justify-center bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-200 ease-in-out'>
            <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
            Continue with Google
        </button>
    )
}
