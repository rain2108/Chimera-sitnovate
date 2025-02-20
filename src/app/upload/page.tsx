// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useRouter } from "next/navigation"

// export default function UploadPage() {
//   const [file, setFile] = useState<File | null>(null)
//   const router = useRouter()

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0])
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!file) return

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       })

//       if (response.ok) {
//         router.push("/images")
//       } else {
//         console.error("Upload failed")
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error)
//     }
//   }

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input type="file" onChange={handleFileChange} accept="image/*" />
//         <Button type="submit" disabled={!file}>
//           Upload
//         </Button>
//       </form>
//     </div>
//   )
// }

//--------------------------------------------------------------------------------------------------------------------

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/images");
    } else {
      alert("Upload failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

