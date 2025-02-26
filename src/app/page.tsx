// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { User } from "@supabase/supabase-js";

// export default function HomePage() {
//   const [allCompanies, setAllCompanies] = useState<any[]>([]);
//   const [featuredCompanies, setFeaturedCompanies] = useState<any[]>([]);
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is logged in
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (error) {
//         console.error("Error fetching user:", error);
//       } else {
//         setUser(data?.user);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchAllCompanies = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const data = await response.json();
//         setAllCompanies(data);
//       } catch (error) {
//         console.error("Error fetching companies from API:", error);
//       }
//     };

//     const fetchFeaturedCompanies = async () => {
//       const { data, error } = await supabase
//         .from("companies")
//         .select("id, name, description, image_url")
//         .limit(3);

//       if (error) {
//         console.error("Error fetching featured companies:", error);
//         return;
//       }

//       setFeaturedCompanies(data);
//     };

//     fetchAllCompanies();
//     fetchFeaturedCompanies();
//   }, []);
//   const handleGetStarted = () => {
//     if (!user) {
//       router.push("/auth"); // Redirect to login/signup page
//     } else {
//       router.push("/companies/add"); // Redirect to add company page
//     }
//   };

//   return (
//     <div className="container mx-auto px-6">
//       {/* 🌟 Hero Section */}
//       <section className="text-center py-20">
//         <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
//           Buy & Sell Companies Effortlessly
//         </h1>
//         <p className="text-lg text-gray-600 mt-4">
//           Connect with buyers and sellers to grow your company.
//         </p>
//         <div className="mt-6">
//           <Link href="/companies/add">
//             <Button onClick={handleGetStarted} className="px-6 py-3 text-lg">
//               Get Started
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* 🔥 All Companies Section (From FakeStoreAPI) */}
//       <section className="mt-16">
//         <h2 className="text-3xl font-bold text-center mb-6">All Companies</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {allCompanies.length > 0 ? (
//             allCompanies.map((company) => (
//               <Card
//                 key={company.id}
//                 className="shadow-md border rounded-lg overflow-hidden"
//               >
//                 <Image
//                   src={company.image || "/placeholder.png"}
//                   alt={company.title}
//                   width={400}
//                   height={250}
//                   className="w-full h-40 object-cover"
//                 />
//                 <CardHeader>
//                   <CardTitle>{company.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600 line-clamp-2">
//                     {company.description}
//                   </p>
//                   <Link href={`/companies/${company.id}`}>
//                     <Button className="mt-4 w-full">View Details</Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-3">
//               Loading companies...
//             </p>
//           )}
//         </div>
//       </section>

//       {/* 🌟 Featured Companies (From Supabase) */}
//       <section className="mt-16">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Featured Companies for Sale
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredCompanies.length > 0 ? (
//             featuredCompanies.map((company) => (
//               <Card
//                 key={company.id}
//                 className="shadow-md border rounded-lg overflow-hidden"
//               >
//                 <Image
//                   src={company.image_url || "/placeholder.png"}
//                   alt={company.name}
//                   width={400}
//                   height={250}
//                   className="w-full h-40 object-cover"
//                 />
//                 <CardHeader>
//                   <CardTitle>{company.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-gray-600 line-clamp-2">
//                     {company.description}
//                   </p>
//                   <Link href={`/companies/${company.id}`}>
//                     <Button className="mt-4 w-full">View Details</Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-3">
//               No featured companies yet.
//             </p>
//           )}
//         </div>
//       </section>

//       {/* 🛠️ How It Works */}
//       <section className="mt-20 py-12 bg-gray-100 rounded-lg">
//         <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//           <div className="p-6">
//             <h3 className="text-xl font-semibold">1. List Your Business</h3>
//             <p className="text-gray-600 mt-2">
//               Create a listing and attract buyers.
//             </p>
//           </div>
//           <div className="p-6">
//             <h3 className="text-xl font-semibold">2. Connect with Buyers</h3>
//             <p className="text-gray-600 mt-2">
//               Receive interest and chat with potential buyers.
//             </p>
//           </div>
//           <div className="p-6">
//             <h3 className="text-xl font-semibold">3. Close the Deal</h3>
//             <p className="text-gray-600 mt-2">
//               Complete the sale and grow your next venture.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* 🚀 Call to Action */}
//       <section className="text-center py-20">
//         <h2 className="text-3xl font-bold">Ready to Buy or Sell a Business?</h2>
//         <p className="text-lg text-gray-600 mt-4">
//           Sign up today and start your journey.
//         </p>
//         <div className="mt-6">
//           <Link href="/companies/add">
//             <Button className="px-6 py-3 text-lg">Get Started</Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "@supabase/supabase-js";

export default function HomePage() {
  const [allCompanies, setAllCompanies] = useState<any[]>([]);
  const [featuredCompanies, setFeaturedCompanies] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // ✅ Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data?.user);
    };
    fetchUser();
  }, []);

  // ✅ Fetch companies (Fake API + Supabase)
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setAllCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    const fetchFeaturedCompanies = async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name, description, image_url")
        .limit(3);

      if (!error) setFeaturedCompanies(data);
    };

    fetchAllCompanies();
    fetchFeaturedCompanies();
  }, []);

  // ✅ Handle "Get Started" Button Click
  const handleGetStarted = () => {
    if (!user) {
      router.push("/auth"); // Redirect to login/signup page
    } else {
      router.push("/companies/add"); // Redirect to add company page
    }
  };

  return (
    <div className="container mx-auto px-6">
      {/* 🌟 Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Buy & Sell Companies Effortlessly
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Connect with buyers and sellers to grow your company.
        </p>
        <div className="mt-6">
          <Button onClick={handleGetStarted} className="px-6 py-3 text-lg">
            Get Started
          </Button>
        </div>
      </section>

      {/* 🔥 All Companies Section (From FakeStoreAPI) */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-6">All Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCompanies.length > 0 ? (
            allCompanies.map((company) => (
              <Card
                key={company.id}
                className="shadow-md border rounded-lg overflow-hidden"
              >
                <Image
                  src={company.image || "/placeholder.png"}
                  alt={company.title}
                  width={400}
                  height={250}
                  className="w-full h-40 object-cover"
                />
                <CardHeader>
                  <CardTitle>{company.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2">
                    {company.description}
                  </p>
                  <Link href={`/companies/${company.id}`}>
                    <Button className="mt-4 w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              Loading companies...
            </p>
          )}
        </div>
      </section>

      {/* 🌟 Featured Companies (From Supabase) */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Companies for Sale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCompanies.length > 0 ? (
            featuredCompanies.map((company) => (
              <Card
                key={company.id}
                className="shadow-md border rounded-lg overflow-hidden"
              >
                <Image
                  src={company.image_url || "/placeholder.png"}
                  alt={company.name}
                  width={400}
                  height={250}
                  className="w-full h-40 object-cover"
                />
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2">
                    {company.description}
                  </p>
                  <Link href={`/companies/${company.id}`}>
                    <Button className="mt-4 w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No featured companies yet.
            </p>
          )}
        </div>
      </section>

      {/* 🛠️ How It Works */}
      <section className="mt-20 py-12 bg-gray-100 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <h3 className="text-xl font-semibold">1. List Your Business</h3>
            <p className="text-gray-600 mt-2">
              Create a listing and attract buyers.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">2. Connect with Buyers</h3>
            <p className="text-gray-600 mt-2">
              Receive interest and chat with potential buyers.
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">3. Close the Deal</h3>
            <p className="text-gray-600 mt-2">
              Complete the sale and grow your next venture.
            </p>
          </div>
        </div>
      </section>

      {/* 🚀 Call to Action */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold">Ready to Buy or Sell a Business?</h2>
        <p className="text-lg text-gray-600 mt-4">
          Sign up today and start your journey.
        </p>
        <div className="mt-6">
          <Button onClick={handleGetStarted} className="px-6 py-3 text-lg">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
}
