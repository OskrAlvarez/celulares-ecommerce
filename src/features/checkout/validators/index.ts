import { z } from 'zod'

export const AdressSchema = z.object({
  adressLine1: z.string().min(1, 'La dirección es Requerida').max(100, 'La dirección no debe exceder los 100 caracteres'),
  adressLine2: z.string().max(100, 'La dirección no debe exceder los 100 caracteres').optional(),
  city: z.string().min(1, 'La ciudad es requerida').max(50, 'La ciudad no debe exceder los 50 caracteres'),
  state: z.string().min(1, 'El estado es requerido').max(50, 'El estado no debe exceder los 50 caracteres'),
  postalCode: z.string().max(10, 'El codigo postal no debe exceder los 10 caracteres').optional(),
  country: z.string().min(1, 'El Pais es Requerido')
})

export type AdressFormValues = z.infer<typeof AdressSchema>
