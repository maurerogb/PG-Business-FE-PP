"use client"

import React, { useState } from 'react'
import PersonalForm from './profile/personal-info-form'
import PasswordForm from './profile/password'

export default function page() {
  const [email, setEmail] = useState<any>("")
  const [isModalOpen, setVerifyModal] = useState<boolean>(false)

  return (
    <div className="flex flex-col items-center w-full gap-12 px-8">
      <div className="flex flex-col items-center gap-4">
        <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Personal Information</p>
        <PersonalForm setVerifyModal={setVerifyModal} setEmail={setEmail} email={email} />
      </div>
      <div className="flex flex-col items-center gap-4 mb-12">
        <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Password</p>
        <PasswordForm />
      </div>

    </div>
  )
}
