import React from 'react'
import Spinner from "assets/img/Spinner.svg"
import Image from "next/image";


const Preloader = () => {
    return (
        <div className='flex flex-col items-center pt-[20%] bg-[#828B8E85] w-full h-full fixed top-0 left-0 z-50'>
            <div className='w-fit h-fit flex flex-col items-center'>
                <Image className="mb-[8px]" src={Spinner} alt={"animated loader"} />
                <p className='text-[#111827] text-[16px] font-[700] leading-5'>
                    Loading...
                </p>
            </div>


        </div>
    )
}

export default Preloader