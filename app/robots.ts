import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      {
        // Block AI/LLM bots to protect content from scraping
        userAgent: [
          'GPTBot', 
          'ChatGPT-User', 
          'Google-Extended', 
          'CCBot', 
          'AnthropicAI', 
          'Claude-Web', 
          'Omgilibot', 
          'FacebookBot',
          'Diffbot',
          'Bytespider',
          'ImagesiftBot',
          'cohere-ai'
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://pratham-arora.vercel.app/sitemap.xml',
  }
}
