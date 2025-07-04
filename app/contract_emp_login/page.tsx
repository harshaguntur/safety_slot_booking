'use client';

import { writeClient } from '@/sanity/lib/write-client';
import React, { useState } from 'react';

type ContractWorker = {
  name: string;
  contractor_name: string;
  agency: string;
  pass_valid_upto: string;
  department: string;
  employee_photo: File | null;
};

const ContractWorkerForm: React.FC = () => {
  const [formData, setFormData] = useState<ContractWorker>({
    name: '',
    contractor_name: '',
    agency: '',
    pass_valid_upto: '',
    department: '',
    employee_photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files?.[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload image to Sanity first if photo is selected
      let imageRef = null;

      if (formData.employee_photo) {
        const imageData = await writeClient.assets.upload('image', formData.employee_photo);
        imageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageData._id,
          },
        };
      }

      const result = await writeClient.create({
        _type: 'contract_worker',
        name: formData.name,
        emp_no: {
          _type: 'slug',
          current: formData.name.toLowerCase().replace(/\s+/g, '-'),
        },
        contractor_name: formData.contractor_name,
        agency: formData.agency,
        pass_valid_upto: formData.pass_valid_upto,
        department: formData.department,
        employee_photo: imageRef,
      });

      console.log('Saved:', result);
      alert('Contract worker added successfully!');
    } catch (error) {
      console.error('Error saving contract worker:', error);
      alert('Error saving data.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Contract Worker Form</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contractor Name</label>
        <input
          type="text"
          name="contractor_name"
          value={formData.contractor_name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Agency</label>
        <input
          type="text"
          name="agency"
          value={formData.agency}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pass Valid Upto</label>
        <input
          type="date"
          name="pass_valid_upto"
          value={formData.pass_valid_upto}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Employee Photo</label>
        <input
          type="file"
          name="employee_photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ContractWorkerForm;
