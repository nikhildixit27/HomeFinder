import React, { useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "Nikhil Dixit",
        email: "nikhildixit2125@gmail.com"
    });
    const { name, email } = formData;
    function logOut() {
        auth.signOut();
        navigate("/");
    }

    return (
        <>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>

                <div className='w-full md:w-[50%] mt-6 px-3'>
                    <form>
                        {/* {Name input} */}
                        <input type="text" id='name' value={name} disabled className='mb-6 w-full px-16px py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' />

                        {/* {Email input} */}
                        <input type="email" id='email' value={email} disabled className='mb-6 w-full px-16px py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' />

                        <div className="flex justify-between whitespace-nowrap mb-6 text-sm sm:text-lg">
                            <p className='flex items-center'>Do you want to change your name?
                                <span className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 cursor-pointer'>Edit</span>
                            </p>
                            <p className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer ' onClick={logOut}>Sign Out</p>
                        </div>

                    </form>

                </div>
            </section>
        </>
    )
}
