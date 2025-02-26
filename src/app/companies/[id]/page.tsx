// import { notFound } from "next/navigation";
// import { supabase } from "@/lib/supabase";
// import Image from "next/image";

// interface CompanyDetailsProps {
//   params: { id: string };
// }

// export default async function CompanyDetails({ params }: CompanyDetailsProps) {
//   if (!params?.id) return notFound();

//   // Fetch company details from Supabase
//   const { data: company, error } = await supabase
//     .from("companies")
//     .select("*")
//     .eq("id", params.id)
//     .single();

//   if (error || !company) {
//     console.error("Error fetching company details:", error?.message);
//     return notFound();
//   }

//   console.log("Server Company Data:", company);
//   console.log("Server Company Image URL:", company.image_url);

//   // ✅ Validate Image
//   const isValidImage =
//     company.image_url?.startsWith("http") &&
//     /\.(jpg|jpeg|png|webp|gif)$/i.test(company.image_url);

//   const imageSrc = isValidImage ? company.image_url : "/placeholder.jpg";

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold">{company.name}</h1>

//       {/* ✅ Display Image */}
//       <div className="mt-5 relative w-full h-64">
//         <Image
//           src={imageSrc}
//           alt={company.name}
//           fill
//           className="rounded-lg object-cover shadow"
//         />
//       </div>

//       {/* ✅ Display Company Details */}
//       <div className="mt-5 space-y-2">
//         {Object.entries(company)
//           .filter(
//             ([key]) =>
//               !["id", "seller_id", "created_at", "image_url"].includes(key)
//           )
//           .map(([key, value]) => (
//             <p key={key} className="text-gray-700">
//               <strong className="capitalize">{key.replace("_", " ")}:</strong>{" "}
//               {String(value)}
//             </p>
//           ))}
//       </div>

//       {/* ✅ Show Contact Seller */}
//       {company.seller ? (
//         <a
//           href={`mailto:${company.seller}`}
//           className="mt-6 inline-block bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
//         >
//           Contact Seller
//         </a>
//       ) : (
//         <p className="mt-6 text-red-500">Seller contact is not available.</p>
//       )}
//     </div>
//   );
// }
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

// ✅ Define Params as a Promise
type Params = Promise<{ id: string }>;

export default async function CompanyDetails({ params }: { params: Params }) {
  const { id } = await params; // ✅ Await params before using

  if (!id) return notFound();

  // ✅ Fetch company details from Supabase
  const { data: company, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !company) {
    console.error("Error fetching company details:", error?.message);
    return notFound();
  }

  console.log("Server Company Data:", company);
  console.log("Server Company Image URL:", company.image_url);

  // ✅ Validate Image
  const isValidImage =
    company.image_url?.startsWith("http") &&
    /\.(jpg|jpeg|png|webp|gif)$/i.test(company.image_url);
  const imageSrc = isValidImage ? company.image_url : "/placeholder.jpg";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold">{company.name}</h1>

      {/* ✅ Display Image */}
      <div className="mt-5 relative w-full h-64">
        <Image
          src={imageSrc}
          alt={company.name}
          fill
          className="rounded-lg object-cover shadow"
        />
      </div>

      {/* ✅ Display Company Details */}
      <div className="mt-5 space-y-2">
        {Object.entries(company)
          .filter(
            ([key]) =>
              !["id", "seller_id", "created_at", "image_url"].includes(key)
          )
          .map(([key, value]) => (
            <p key={key} className="text-gray-700">
              <strong className="capitalize">{key.replace("_", " ")}:</strong>{" "}
              {String(value)}
            </p>
          ))}
      </div>

      {/* ✅ Show Contact Seller */}
      {company.seller ? (
        <a
          href={`mailto:${company.seller}`}
          className="mt-6 inline-block bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Contact Seller
        </a>
      ) : (
        <p className="mt-6 text-red-500">Seller contact is not available.</p>
      )}
    </div>
  );
}

// ✅ Fix `generateMetadata` function using awaited params
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<{ title: string; description: string } | {}> {
  const { id } = await params;
  if (!id) return {};

  // ✅ Fetch company name for dynamic metadata
  const { data: company, error } = await supabase
    .from("companies")
    .select("name")
    .eq("id", id)
    .single();

  if (error || !company) {
    return {};
  }

  return {
    title: `Company Details - ${company.name}`,
    description: `View details about company ${company.name}`,
  };
}
