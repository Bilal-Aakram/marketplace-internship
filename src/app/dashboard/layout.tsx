"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login"); // Redirect if not logged in
        return;
      }
      if (isMounted) setLoading(false);
    };

    checkAuth();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [router]);

  if (loading)
    return <p className="text-center mt-10">Checking authentication...</p>;

  return <>{children}</>;
}
