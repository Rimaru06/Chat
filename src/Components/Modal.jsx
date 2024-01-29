import React from 'react'

import { AiOutlineClose } from 'react-icons/ai'
const Modal = ({ onclose, isOpen, children }) => {
    return (
        <>
            {isOpen && (
                <div className=' grid place-items-center backdrop-blur h-screen w-screen absolute top-0 z-40' >
                    <div className='z-50 relative  min-h-[200px] min-w-[300px] bg-white p-4 mx-auto'>
                        <div className='flex justify-end'>
                            <AiOutlineClose onClick={onclose} className='text-2xl cursor-pointer ' />
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal