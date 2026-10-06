/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',   👈 ye line hata do / comment kar do
  images: {
    unoptimized: true, // agar image optimization ki dikkat aaye to ye rakh sakta hai
  },
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['images.unsplash.com', 'via.placeholder.com'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },
// };

// module.exports = nextConfig;
