import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { AdressFormValues } from "../validators";

interface Props {
  register: UseFormRegister<AdressFormValues>;
  errors: FieldErrors<AdressFormValues>;

  name: keyof AdressFormValues;
  className?: string;
  placeholder: string;
}
export function InputAddress({
  register,
  errors,
  name,
  className,
  placeholder,
}: Props) {
  return (
    <>
      <div
        className={`border border-slate-200 rounded-md overflow-hidden ${
          errors[name] && "border-red-500"
        } ${className}`}
      >
        <input
          type="text"
          className="w-full p-3 text-sm focus:outline-indigo-500"
          placeholder={placeholder}
          {...register(name)}
        />
      </div>
      {
        errors[name] && <p className="text-red-500 text-xs">{errors[name].message}</p>
      }
    </>
  );
}
