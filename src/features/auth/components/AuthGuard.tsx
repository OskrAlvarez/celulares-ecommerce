import { useNavigate } from "react-router-dom";
import { type Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { supabase } from "@/common/supabase/client";
import { Loader } from "@/components";

interface Props {
  children: React.ReactNode;
  session?: Session | null | undefined;
  isLoadingSession: boolean;
}

export function AuthGuard({ isLoadingSession, children, session }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    })

    return () => {
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (!isLoadingSession && !session) {
      navigate("/login");
    }
  }, [isLoadingSession, session, navigate]);


  if (isLoadingSession) return <Loader />;
  if (!session) return null;

  return <>{children}</>;
}
