import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images:{
    domains:['avatars.githubusercontent.com', 'lh3.googleusercontent.com',
      'manoj-twitter-dev.s3.ap-south-1.amazonaws.com','twitter-clone-dev-temp.s3.ap-south-1.amazonaws.com', 'd1xq02tfk8ozzp.cloudfront.net'
    ]
  }
};

export default nextConfig;
