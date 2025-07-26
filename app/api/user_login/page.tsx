'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter(); 
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("checking credentials ");
    console.log(empId, password);
    
   const result = await signIn('credentials', {
  redirect: false,
  emp_no: empId,  
  password,
});


    console.log("result have arrived ");
    

    if (result?.ok) {
      router.push('/api/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Login</h2>

      <div>
        <label>Emp ID</label>
        <input
          type="text"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
