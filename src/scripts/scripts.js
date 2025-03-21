export function decodeHTMLEntities(text) {
  if (!text) return '';
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8211;/g, '-')
}

export async function fetchCategories() {
  try {
    const response = await fetch(
      `http://maks.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/wp-json/wp/v2/categories`
    );

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.status}`);
    }

    const categories = await response.json();
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      count: category.count
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
// Add a simple cache to avoid duplicate requests
const postCache = new Map();

export async function fetchPosts(page = 1, perPage = 100, categoryId = null) {
  try {
    // Create a cache key based on the parameters
    const cacheKey = `posts-${page}-${perPage}-${categoryId || 'all'}`;
    
    // Check if we have cached results
    if (postCache.has(cacheKey)) {
      return postCache.get(cacheKey);
    }
    
    let url = `http://maks.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/wp-json/wp/v2/posts?_embed&per_page=${perPage}`;
    
    // Add category filter if provided
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status}`);
    }
  
    const posts = await response.json();
    const formattedPosts = posts.map((post) => {
      // Get the featured image URL or fallback to a placeholder
      const featuredImageUrl =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://placehold.co/1200x600?text=Image+Not+Featured";

      // Get the excerpt (short description) and clean it up
      let excerpt = decodeHTMLEntities(post.excerpt.rendered);
      excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, "");
      excerpt =
        excerpt.length > 120 ? excerpt.substring(0, 120) + "..." : excerpt;
      
      // Get categories
      const categories = post._embedded?.["wp:term"]?.[0]?.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug
      })) || [];
      
      // Get tags
      const tags = post._embedded?.["wp:term"]?.[1]?.map(tag => tag.name).join(", ") || "";
      
      // Return formatted post object
      return {
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        description: excerpt,
        content: post.content.rendered,
        imageUrl: featuredImageUrl,
        date: new Date(post.date).toLocaleDateString(),
        tags: tags,
        categories: categories
      };
    });
    
    // Cache the results
    postCache.set(cacheKey, formattedPosts);
    
    return formattedPosts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}
export async function fetchPosts(page = 1, perPage = 100, categoryId = null) {
  try {
    let url = `http://maks.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/wp-json/wp/v2/posts?_embed&per_page=${perPage}`;
    
    // Add category filter if provided
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status}`);
    }
  
    const posts = await response.json();
    return posts.map((post) => {
      // Get the featured image URL or fallback to a placeholder
      const featuredImageUrl =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://placehold.co/1200x600?text=Image+Not+Featured";

      // Get the excerpt (short description) and clean it up
      let excerpt = decodeHTMLEntities(post.excerpt.rendered);
      excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, "");
      excerpt =
        excerpt.length > 120 ? excerpt.substring(0, 120) + "..." : excerpt;
      
      // Get categories
      const categories = post._embedded?.["wp:term"]?.[0]?.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug
      })) || [];
      
      // Get tags
      const tags = post._embedded?.["wp:term"]?.[1]?.map(tag => tag.name).join(", ") || "";
      
      // Return formatted post object
      return {
        id: post.id,
        slug: post.slug,
        title: post.title.rendered,
        description: excerpt,
        content: post.content.rendered,
        imageUrl: featuredImageUrl,
        date: new Date(post.date).toLocaleDateString(),
        tags: tags,
        categories: categories
      };
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}