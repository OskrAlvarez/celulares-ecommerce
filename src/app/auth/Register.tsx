import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useRegister,
  userRegisterSchema,
  useUser,
  type UserRegisterFormValues,
} from "@/features/auth";

import { LuLoader } from "react-icons/lu";
import { Loader } from "@/components";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
    resolver: zodResolver(userRegisterSchema),
  });

  const { mutate, isPending } = useRegister();
  const { session, isLoading } = useUser();

  const onRegister = handleSubmit((data) => {
    const { email, fullName, password, phone } = data;
    mutate({
      email,
      password,
      fullName,
      phone,
    });
  });

  if (isLoading) return <Loader />;

  if (session) return <Navigate to="/" />;

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
      <h1 className="text-4xl font-bold capitalize">Registrate</h1>
      <p className="text-sm font-medium">Por favor, Rellena los campos</p>

      {isPending ? (
        <div className="w-full h-full flex justify-center mt-20">
          <LuLoader className="animate-spin" size={60} />
        </div>
      ) : (
        <>
          <form
            onSubmit={onRegister}
            className="flex flex-col items-center gap-4 w-full mt-2 sm:w-[400px] lg:w-[500px]"
          >
            <div className="form-control w-full">
              <input
                placeholder="jonhdoe@mail.com"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 text-center">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <input
                placeholder="Jonh Doe"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                type="text"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 text-center">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <input
                placeholder="+58-4245789865"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                type="text"
                {...register("phone")}
              />
            </div>
            <div className="form-control w-full">
              <input
                placeholder="******"
                className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 text-center">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <button className="bg-indigo-600 text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="text-sm text-stone-800">
            Ya tienes cuenta?
            <Link to={"/login"} className="underline ml-2">
              Registrarme
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
