import { Loader } from "@/components";
import { useLogin, useUser } from "@/features/auth";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";
import { Link, Navigate } from "react-router-dom";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "mck03399@laoia.com",
    password: "1234567",
  });

  const { mutate, isPending } = useLogin();
  const { session, isLoading } = useUser()
  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValues;
    mutate({
      email,
      password,
    });
  };


  if (isLoading) return <Loader />

  if (session) return <Navigate to='/' />
  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
      <h1 className="text-4xl font-bold capitalize">Iniciar Sesión</h1>
      <p className="text-sm font-medium">¡Que bueno tenerte de vuelta!</p>
      {isPending ? (
        <div className="w-full h-full flex justify-center mt-20">
          <LuLoader className="animate-spin" size={60} />
        </div>
      ) : (
        <>
          <form onSubmit={onLogin} className="flex flex-col items-center gap-4 w-full mt-2 sm:w-[400px] lg:w-[500px]">
            <div className="form-control w-full">
              <input
                value={formValues.email}
                onChange={onChangeFormValues}
                placeholder="jonhdoe@mail.com"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                type="text"
                name="email"
              />
            </div>
            <div className="form-control w-full">
              <input
                value={formValues.password}
                onChange={onChangeFormValues}
                placeholder="******"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                type="password"
                name="password"
              />
            </div>
            <div className="form-control w-full">
              <button className="bg-indigo-600 text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="text-sm text-stone-800">
            ¿Aún no tienes cuenta?
            <Link to={"/register"} className="underline ml-2">
              Regístrate
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
