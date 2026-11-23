import { z } from "zod";
import { buyerTypes, referralSources } from "@/data/brochure";

const trimmed = (max: number, msg: string) => z.string({ error: msg }).trim().min(1, msg).max(max, msg);

export const brochureSchema = z.object({
  firstName: trimmed(80, "Please enter your first name."),
  surname: trimmed(80, "Please enter your surname."),
  email: z.email({ error: "Please enter a valid email address." }).trim().max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s()-]{7,22}$/, "Please enter a valid phone number."),
  postcode: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Please enter a 4-digit postcode."),
  buyerType: z.enum(buyerTypes, { error: "Please choose a buyer type." }),
  referral: z.enum(referralSources, { error: "Please tell us how you heard about Marea." }),
});

export type BrochureLead = z.infer<typeof brochureSchema>;
