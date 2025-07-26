'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';
import { useSession } from 'next-auth/react';
import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

const SlotBookingPage = () => {
  const { user } = useUser();
  const { data: session } = useSession();

  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loading, setLoading] = useState(false);


  const fetchSlotAvailability = async (date: string) => {
  const query = `*[_type == "slot_booking" && date == $date][0]`;
  const result = await sanity.fetch(query, { date });

  if (!result) {
    alert('No slot booking data found for the selected date.');
  }

  setSlots(result);
};


  useEffect(() => {
    if (selectedDate) {
      fetchSlotAvailability(selectedDate);
    } else {
      setSlots(null);
    }
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedSlot || !slots || slots[selectedSlot] <= 0) {
      alert('Slot not available or not selected.');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/bookSlot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emp_no: user?.emp_no,
        name: user?.name,
        role: user?.role,
        slot: selectedSlot,
        date: selectedDate,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Slot booked successfully!');
      fetchSlotAvailability(selectedDate);
    } else {
      alert(`Booking failed: ${data.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Slot Booking</h1>

      <div className="bg-gray-100 p-4 rounded">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Emp No:</strong> {user?.emp_no}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <div>
        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {slots && (
        <div className="space-y-3">
          <p className="font-semibold">Available Slots on {selectedDate}:</p>
          {['m1', 'm2', 'a1', 'a2'].map((slot) => (
            <div key={slot} className="flex justify-between items-center">
              <label>
                <input
                  type="radio"
                  name="slot"
                  value={slot}
                  checked={selectedSlot === slot}
                  onChange={() => setSelectedSlot(slot)}
                  disabled={slots[slot] <= 0}
                />{' '}
                {slot.toUpperCase()} - Available: {slots[slot]}
              </label>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleBooking}
        disabled={!selectedSlot || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        {loading ? 'Booking...' : 'Book Slot'}
      </button>
    </div>
  );
};

export default SlotBookingPage;
