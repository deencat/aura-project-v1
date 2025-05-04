/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Enable WebP and AVIF formats for better compression
    formats: ['image/webp', 'image/avif'],
    
    // Set cache duration for images (30 days)
    minimumCacheTTL: 60 * 60 * 24 * 30,
    
    // Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Configure image sizes for smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Additional security for SVG images if used
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Use inline for images that should be displayed directly
    contentDispositionType: 'inline',
    
    // Configure image domains if using external images
    domains: []
  }
}

module.exports = nextConfig 