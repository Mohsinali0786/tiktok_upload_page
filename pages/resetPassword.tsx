import React, { useEffect } from 'react';

const ResetPassword = () => {
    return (
        <>
            <div className='w-full h-full md:fixed left-0 top-0 mb-10 sm:pt-2 lg:pt-0 bg-[white] justify-center md none'>
                <div className="flex justify-center h-screen w-screen items-center">
                    <div className="w-100 flex flex-col p-5 border-2 rounded" >
                        <h1 className="text-start text-2xl font-medium font-['Minora Bold'] text-500 mb-2">Forgot Password?</h1>
                        <h1 className="text-start text-base	font-semibold opacity-80 font-['Minora Bold'] mb-6">Enter your registered email ID to reset the password</h1>
                        <div className="w mb-6">
                            <label htmlFor="email" className='font-semibold opacity-80'>Email</label>
                            <input type="email" name="email" id="email" className="w-full py-2 px-2 bg-white-200 font-['Minora Bold'] h-10 border-solid border-2 mt-2 border-lightgray-600 placeholder:font-normal rounded hover:ring-1 outline-blue-500" placeholder="Enter your Email"/>
                        </div>
                        <div className="">
                            <button type="submit" className="py-2 w-full bg-[#5847ff] rounded text-blue-50 font-bold h-10 hover:bg-blue-700"> Reset Password</button>
                        </div>
                        <h4 className="mt-3 font-semibold opacity-80">Don&apos;t have an account? <a href="" className='font-semibold opacity-80 underline hover:no-underline text-[#5847ff]'>sign in</a></h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
