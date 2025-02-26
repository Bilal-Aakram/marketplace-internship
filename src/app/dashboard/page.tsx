"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SellerDashboard() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchSellerData = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user) {
        router.push("/login");
        return;
      }

      const userId = user.user.id;
      console.log("Fetching companies for User ID:", userId);

      const { data: sellerCompanies, error: companiesError } = await supabase
        .from("companies")
        .select("*")
        .eq("seller_id", userId);

      if (companiesError) {
        console.error("Error fetching companies:", companiesError);
        return;
      }

      if (isMounted) {
        setCompanies(sellerCompanies);
        setLoading(false);
      }
    };

    fetchSellerData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Seller Dashboard</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        </div>
      ) : companies.length === 0 ? (
        <p className="text-center text-gray-500">No companies listed.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="shadow-lg border rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {company.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{company.description}</p>
                <Button variant="default" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
