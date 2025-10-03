import { supabase } from "@/common/supabase/client";

interface AuthLogin {
  email: string;
  password: string;
}

interface AuthRegister {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export async function signUp({
  email,
  password,
  fullName,
  phone,
}: AuthRegister) {
  try {
    // 1. Crear o Registrar el usuario
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const userId = data.user?.id;
    if (!userId) {
      throw new Error("Error al obtener el ID del usuario");
    }
    // 2. Autenticar el usuario
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      throw new Error("Email or Password incorrectos: " + signInError.message);
    }

    // 3. Insertar el Rol por defecto - CUSTOMER (cliente)
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: userId,
      role: "customer",
    });

    if (roleError) {
      throw new Error("Error al registrar el Rol del Usuario");
    }

    // 4. Insertar los datos del usuario en la tabla customers - CLIENTES
    const { error: customerError } = await supabase.from("customers").insert({
      user_id: userId,
      full_name: fullName,
      email,
      phone,
    });

    if (customerError) {
      throw new Error("Error al registrar los datos del usuario");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function signIn({ email, password }: AuthLogin) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("Email or Password incorrectos");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function singOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Error al Finalizar la session");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function getSession() {
  try {
    const {data, error} = await supabase.auth.getSession()

    if (error) {
      throw new Error("Error al obtener la session");
    }

    return data.session

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
