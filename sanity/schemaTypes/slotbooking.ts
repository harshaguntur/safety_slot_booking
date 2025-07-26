import { defineField, defineType } from "sanity";

export const slot_booking = defineType({
  name: "slot_booking",
  title: "Slot Booking",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "m1",
      title: "M1 Slot",
      type: "number",
      initialValue: 20,
      validation: (Rule) => Rule.required().min(0).max(20),
    }),

    defineField({
      name: "m2",
      title: "M2 Slot",
      type: "number",
      initialValue: 20,
      validation: (Rule) => Rule.required().min(0).max(20),
    }),

    defineField({
      name: "a1",
      title: "A1 Slot",
      type: "number",
      initialValue: 20,
      validation: (Rule) => Rule.required().min(0).max(20),
    }),

    defineField({
      name: "a2",
      title: "A2 Slot",
      type: "number",
      initialValue: 20,
      validation: (Rule) => Rule.required().min(0).max(20),
    }),
  ],
});
