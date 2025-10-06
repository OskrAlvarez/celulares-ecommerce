import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.email("El correo electronico suministrado no es valido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  phone: z.string().optional(),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
