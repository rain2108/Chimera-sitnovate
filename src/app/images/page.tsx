// import Image from "next/image"
// import { getImages } from "@/lib/images"

// export default async function ImagesPage() {
//   const images = await getImages()

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Uploaded Images</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {images.map((image) => (
//           <div key={image.id} className="border p-4 rounded-lg">
//             <h2 className="text-lg font-semibold mb-2">{image.name}</h2>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div>
//                 <h3 className="text-sm font-medium mb-1">Original</h3>
//                 <Image
//                   src={image.originalUrl || "/placeholder.svg"}
//                   alt={`Original ${image.name}`}
//                   width={300}
//                   height={300}
//                   className="object-cover"
//                 />
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium mb-1">Resized</h3>
//                 <Image
//                   src={image.resizedUrl || "/placeholder.svg"}
//                   alt={`Resized ${image.name}`}
//                   width={150}
//                   height={150}
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
//-----------------------------------------------------------------------------------------------------------------

import { getImages } from "@/lib/images";
import Image from "next/image";

export default async function ImagesPage() {
  const images = await getImages();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {images.length > 0 ? (
        images.map((img: { originalUrl: string; resizedUrl?: string }, index: number) => (
          <div key={index} className="border p-2 rounded">
            <h3 className="text-center">Original</h3>
            <Image src={img.originalUrl} alt="Original" width={300} height={200} />
            {img.resizedUrl && (
              <>
                <h3 className="text-center">Resized</h3>
                <Image src={img.resizedUrl} alt="Resized" width={300} height={200} />
              </>
            )}
          </div>
        ))
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
}

