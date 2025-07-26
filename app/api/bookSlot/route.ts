// /app/api/bookSlot/route.ts (App Router syntax)
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  const { emp_no, name, date, slot, purpose } = await req.json();

  const slotField = slot.toLowerCase(); // 'm1', 'm2', etc.

  // 🔍 Check slot availability
  const slotDoc = await sanity.fetch(
    `*[_type == "slot_booking" && date == $date][0]`,
    { date }
  );

  if (!slotDoc) {
    return NextResponse.json({ error: 'Slot document not found for date' }, { status: 404 });
  }

  if (slotDoc[slotField] <= 0) {
    return NextResponse.json({ error: 'Selected slot is full' }, { status: 400 });
  }

  // 🔄 Update slot count
 await sanity
  .patch(slotDoc._id)
  .dec({ [slotField]: 1 })
  .commit();


  // ✅ Save booking to `bookedSlot`
  const newBooking = await sanity.create({
    _type: 'bookedSlot',
    emp_no,
    name,
    date,
    slot: slot.toUpperCase(),
    purpose,
    status: 'pending', // initialValue from schema
  });

  return NextResponse.json({ message: 'Slot booked successfully', booking: newBooking });
}
