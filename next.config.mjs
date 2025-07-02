/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['picsum.photos', 'uploadthing.com', 'utfs.io', 'files.edgestore.dev'],
    },
};

export default nextConfig;
