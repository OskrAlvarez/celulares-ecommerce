import { AuthGuard, useUser } from "@/features/auth";
import { Link, Outlet } from "react-router-dom";

export function CheckoutLayout() {
  const { isLoading: isLoadingSession, session } = useUser();

  return (
    <>
      <header className="h-[100px] bg-white text-black flex items-center justify-center flex-col px-10 border-b border-slate-200">
        <Link
          to="/"
          className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start"
        >
          <p>
            Celulares
            <span className="text-indigo-600">Baratos</span>
          </p>
        </Link>
      </header>
      <main className="flex-1">
        <AuthGuard isLoadingSession={isLoadingSession} session={session}>
          <Outlet />
        </AuthGuard>
      </main>
    </>
  );
}
