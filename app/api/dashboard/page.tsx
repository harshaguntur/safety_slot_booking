
'use client';
import React from 'react'

import { useUser } from '@/app/context/UserContext';
import { useSession } from 'next-auth/react';

const dashboard  = () => {

  const { user } = useUser();
  
  
  const { data: session } = useSession();
  return (
    <>
     <div>dashboard </div>

      <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Authenticated as: {session?.user?.name}</p>
      <p>Authenticated as: {user?.emp_no}</p>
      <p>Authenticated as: {user?.role}</p>
      

    </div>
    </>
   
  )
}

export default dashboard 