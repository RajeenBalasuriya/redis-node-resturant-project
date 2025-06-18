import { url } from "inspector";
import { z } from "zod";
import { email } from "zod/v4";

export const ResturantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  cuisines: z.array(z.string()).min(1),
});

export const ResturantDetailSchema = z.object({
  links: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      url: z.string().min(1),
    })
  ),
  contact: z.object({
    phone: z.string().min(1),
    email: z.string().email("Invalid email format").optional(),
  }),
});

export type Resturant=z.infer<typeof ResturantSchema>;
export type ResturantDetail = z.infer<typeof ResturantDetailSchema>;