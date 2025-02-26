"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddCompanyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    industry: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.industry
    ) {
      return "All fields are required.";
    }
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      return "Price must be a positive number.";
    }
    if (
      formData.image_url &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.image_url)
    ) {
      return "Invalid image URL. It must be a valid link ending in .jpg, .jpeg, .png, or .gif";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) {
      setError("You must be logged in to add a company.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          ...formData,
          price: parseFloat(formData.price),
          seller: user.user.email,
        },
      ])
      .select("*");

    if (error) {
      setError(error.message);
    } else {
      console.log("New company added:", data);
      router.push("/companies");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Sell a Company</h1>

      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Company Price (USD)"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry Type"
          value={formData.industry}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL (optional)"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
