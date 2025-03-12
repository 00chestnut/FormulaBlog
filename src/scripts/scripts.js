export async function fetchPosts() {
    try {
      // Replace with your actual WordPress URL
      const response = await fetch('http://maks.z0fil5dsgi-xlm41ok1r6dy.p.temp-site.link/wp-json/wp/v2/posts?_embed');
      
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.status}`);
      }
      
      const posts = await response.json();
      
      // Transform the WordPress data into a format that's easier to use with your Card component
      return posts.map(post => {
        // Get the featured image URL or fallback to a placeholder
        const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                                "https://placehold.co/150x400?text=Image+Unavailable";
        
        // Get the excerpt (short description) and clean it up
        let excerpt = post.excerpt.rendered;
        // Remove HTML tags
        excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, "");
        // Limit to a reasonable length
        excerpt = excerpt.length > 120 ? excerpt.substring(0, 120) + "..." : excerpt;
        
        return {
          id: post.id,
          slug: post.slug,
          title: post.title.rendered,
          description: excerpt,
          imageUrl: featuredImageUrl,
          date: new Date(post.date).toLocaleDateString()
        };
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  }