import { z } from "zod";

export const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, "Title must contain at least 2 characters."),

  description: z
    .string()
    .trim()
    .min(3, "Description must contain at least 3 characters."),

  technologies: z
    .string()
    .trim()
    .min(1, "At least one technology is required."),

  link: z.string().trim().url("Please enter a valid URL.").or(z.literal("")),
});
