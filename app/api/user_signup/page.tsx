'use client';

import { writeClient } from '@/sanity/lib/write-client';
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

type Employee = {
  emp_no: number;
  name: string;
  designation: string;
  department: string;
  password: string;
  role: string;
};

const EmployeeForm: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>({
    emp_no: 0,
    name: '',
    designation: '',
    department: '',
    password: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: name === 'emp_no' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Hash the password before storing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(employee.password, salt);

      // 2. Create user with hashed password
      const result = await writeClient.create({
        _type: 'user',
        emp_no: employee.emp_no,
        name: employee.name,
        designation: employee.designation,
        department: employee.department,
        password: hashedPassword,
        role: employee.role,
      });

      console.log('Created User:', result);
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Employee Form</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Emp No</label>
        <input
          type="number"
          name="emp_no"
          value={employee.emp_no}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Designation</label>
        <input
          type="text"
          name="designation"
          value={employee.designation}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={employee.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <input
          type="text"
          name="role"
          value={employee.role}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default EmployeeForm;
