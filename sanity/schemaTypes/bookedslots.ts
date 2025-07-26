import { defineType, defineField } from 'sanity';

export const bookedSlot = defineType({
  name: 'bookedSlot',
  title: 'Booked Slot',
  type: 'document',
  fields: [
    defineField({
      name: 'emp_no',
      title: 'Employee Number',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Employee Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Booking Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slot',
      title: 'Slot',
      type: 'string',
      options: {
        list: ['M1', 'M2', 'A1', 'A2'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'purpose',
      title: 'Purpose / Remarks',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: ['pending', 'approved', 'rejected'],
        layout: 'dropdown',
      },
      initialValue: 'pending',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slot',
      media: 'date',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: `${title} booked ${subtitle}`,
        subtitle: `Date: ${media}`,
      };
    },
  },
});
