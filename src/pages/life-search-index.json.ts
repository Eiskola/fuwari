import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
    const allLifeRecords = await getCollection('life', ({ data }) => {
      return import.meta.env.PROD ? data.draft !== true : true;
    });
    
    const searchIndex = allLifeRecords.map(item => ({
      slug: item.slug,
      title: item.data.title,
      published: item.data.published.toISOString().split('T')[0]
    }));

    return new Response(JSON.stringify(searchIndex), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};