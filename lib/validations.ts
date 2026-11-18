import { z } from "zod";

const currentYear = new Date().getFullYear();

export const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, "Title must contain at least 2 characters."),

  type: z
    .string()
    .refine((value) => value === "opensource" || value === "school", {
      message: "Please select a valid project type.",
    }),

  description: z
    .string()
    .trim()
    .min(3, "Description must contain at least 3 characters."),

  technologies: z
    .string()
    .trim()
    .min(2, "At least one technology is required."),

  yearCompleted: z.coerce
    .number()
    .int("Year must be a whole number.")
    .gte(2000, "Year must be 2000 or later.")
    .lte(currentYear, `Year cannot be greater than ${currentYear}.`),

  link: z.string().trim().url("Please enter a valid URL.").or(z.literal("")),
});
