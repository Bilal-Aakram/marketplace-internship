"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

type Company = {
  id: number;
  title: string;
  description: string;
  image: string;
  name: string;
  image_url?: string;
};

export default function HomePage() {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const placeholderImage = "/placeholder.png"; // Fallback Image

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data: Company[] = await response.json(); // Explicitly typing the data as Company[]
        console.log("Fetched Companies:", data); // Debugging log

        // Ensure every company has an image
        const updatedCompanies = data.map((company) => ({
          ...company,
          image: company.image || placeholderImage,
        }));

        setAllCompanies(updatedCompanies);
      } catch (error) {
        console.error("Error fetching companies from API:", error);
      }
    };

    const fetchFeaturedCompanies = async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name, description, image_url")
        .limit(3);

      if (error) {
        console.error("Error fetching featured companies:", error);
        return;
      }

      // Type assertion for featured companies
      setFeaturedCompanies(data as Company[]); // Type assertion here
    };

    fetchAllCompanies();
    fetchFeaturedCompanies();
  }, []);

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
          <Link href="/companies/add">
            <Button className="px-6 py-3 text-lg">Get Started</Button>
          </Link>
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
                <div className="w-full h-40 relative">
                  <Image
                    src={company.image || placeholderImage}
                    alt={company.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
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
                <div className="w-full h-40 relative">
                  <Image
                    src={company.image_url || placeholderImage}
                    alt={company.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
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
          <Link href="/companies/add">
            <Button className="px-6 py-3 text-lg">Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
