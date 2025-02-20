// // TODO: Replace this with your actual database interaction
// const mockImages = [
//     {
//       id: "1",
//       name: "Sample Image 1",
//       originalUrl: "/placeholder.svg?height=300&width=300",
//       resizedUrl: "/placeholder.svg?height=150&width=150",
//     },
//     {
//       id: "2",
//       name: "Sample Image 2",
//       originalUrl: "/placeholder.svg?height=300&width=300",
//       resizedUrl: "/placeholder.svg?height=150&width=150",
//     },
//   ]
  
//   export async function getImages() {
//     // TODO: Implement actual database query
//     return mockImages
//   }
  
//   export async function saveImageToDatabase(image: {
//     id: string
//     name: string
//     originalUrl: string
//     resizedUrl: string
//   }) {
//     // TODO: Implement actual database insertion
//     console.log("Saving image to database:", image)
//   }
  
//---------------------------------------------------------------------------------------------------

export const mockImages = [
  {
    originalUrl: "https://example.com/original.jpg",
    resizedUrl: "https://example.com/resized.jpg",
  },
];

export async function getImages() {
  return mockImages; // Replace with actual DB query
}

export async function saveImageToDatabase(image: { originalUrl: string; resizedUrl: string | null }) {
  console.log("Saving to DB:", image); // Replace with actual DB insert
}