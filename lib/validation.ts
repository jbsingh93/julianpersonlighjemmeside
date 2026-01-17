import { z } from 'zod';

export const contactFormSchema = z.object({
  navn: z.string()
    .min(2, 'Navn skal være mindst 2 tegn')
    .max(100, 'Navn må ikke være længere end 100 tegn'),
  email: z.string()
    .email('Ugyldig email adresse')
    .max(100, 'Email må ikke være længere end 100 tegn'),
  emne: z.string()
    .min(1, 'Vælg venligst et emne'),
  besked: z.string()
    .min(10, 'Besked skal være mindst 10 tegn')
    .max(1000, 'Besked må ikke være længere end 1000 tegn'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
