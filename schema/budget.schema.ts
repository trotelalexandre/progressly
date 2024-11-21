import z from "zod";

export const AddTranssactionFormSchema = z.object({
  currency: z.string({
    required_error: "The transaction currency is required!",
  }),
  amount: z
    .number({
      required_error: "The transaction amount is required!",
    })
    .min(0),
  date: z.date({
    required_error: "The transaction date is required!",
  }),
  category: z.string({
    required_error: "The transaction category is required!",
  }),
  note: z.string().optional(),
});

export const EditTranssactionFormSchema = z.object({
  id: z.number({
    required_error: "The transaction id is required!",
  }),
  currency: z.string({
    required_error: "The transaction currency is required!",
  }),
  amount: z
    .number({
      required_error: "The transaction amount is required!",
    })
    .min(0),
  date: z.date({
    required_error: "The transaction date is required!",
  }),
  category: z.string({
    required_error: "The transaction category is required!",
  }),
  note: z.string().optional(),
});
