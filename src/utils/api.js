import axios from "axios";

// Invidious API - Free, no authentication required!
const INVIDIOUS_INSTANCES = [
  'https://invidious.jing.rocks',
  'https://iv.melmac.space',
  'https://invidious.privacyredirect.com'
];

let currentInstance = INVIDIOUS_INSTANCES[0];

export const BASE_URL = currentInstance;

// Transform Invidious API response to match expected format
const transformSearchResults = (items) => {
  return items
    .filter(item => item.type === 'video')
    .map(item => ({
      type: 'video',
      video: {
        videoId: item.videoId,
        title: item.title,
        thumbnails: [{
          url: item.videoThumbnails?.find(t => t.quality === 'high')?.url ||
            item.videoThumbnails?.[0]?.url ||
            `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
          width: 480,
          height: 360
        }],
        lengthSeconds: item.lengthSeconds,
        author: {
          title: item.author,
          avatar: [{
            url: item.authorThumbnails?.[0]?.url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(item.author)}&background=random`
          }],
          badges: item.authorVerified ? [{ type: 'VERIFIED_CHANNEL' }] : []
        },
        stats: {
          views: parseInt(item.viewCount || 0)
        },
        publishedTimeText: item.publishedText || 'Recently'
      }
    }));
};

const transformVideoDetails = (video) => {
  return {
    title: video.title,
    description: video.description,
    publishedDate: new Date(video.published * 1000).toLocaleDateString(),
    author: {
      title: video.author,
      avatar: [{
        url: video.authorThumbnails?.[0]?.url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(video.author)}&background=random`
      }],
      badges: video.authorVerified ? [{ type: 'VERIFIED_CHANNEL' }] : [],
      stats: {
        subscribersText: video.subCountText || 'Subscribe'
      }
    },
    stats: {
      views: parseInt(video.viewCount || 0),
      likes: parseInt(video.likeCount || 0)
    }
  };
};

const transformComments = (comments) => {
  if (!comments || !Array.isArray(comments)) {
    return {
      totalCommentsCount: 0,
      comments: []
    };
  }

  return {
    totalCommentsCount: comments.length,
    comments: comments.slice(0, 20).map(comment => ({
      author: {
        title: comment.author,
        avatar: [{
          url: comment.authorThumbnails?.[0]?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=random`
        }]
      },
      content: comment.content || comment.contentHtml?.replace(/<[^>]*>/g, '') || '',
      publishedTimeText: comment.publishedText || 'Recently',
      stats: {
        likes: comment.likeCount || 0
      }
    }))
  };
};

// Try different instances if one fails
const fetchWithFallback = async (endpoint, params = {}) => {
  for (let i = 0; i < INVIDIOUS_INSTANCES.length; i++) {
    try {
      const instance = INVIDIOUS_INSTANCES[i];
      const { data } = await axios.get(`${instance}${endpoint}`, {
        params,
        timeout: 10000
      });
      currentInstance = instance; // Remember working instance
      return data;
    } catch (error) {
      console.log(`Instance ${INVIDIOUS_INSTANCES[i]} failed, trying next...`);
      if (i === INVIDIOUS_INSTANCES.length - 1) {
        throw error;
      }
    }
  }
};

export const fetchData = async (url) => {
  try {
    // Handle different endpoint types
    if (url.includes('search/?q=')) {
      // Search endpoint
      const queryMatch = url.match(/q=([^&]+)/);
      const query = queryMatch ? decodeURIComponent(queryMatch[1]) : 'trending';

      const data = await fetchWithFallback('/api/v1/search', {
        q: query,
        type: 'video',
        sort_by: 'relevance'
      });

      return {
        contents: transformSearchResults(data || [])
      };
    }
    else if (url.includes('video/details/?id=')) {
      // Video details endpoint
      const videoId = url.match(/id=([^&]+)/)?.[1];

      const data = await fetchWithFallback(`/api/v1/videos/${videoId}`);

      return transformVideoDetails(data);
    }
    else if (url.includes('video/related-contents/?id=')) {
      // Related videos endpoint
      const videoId = url.match(/id=([^&]+)/)?.[1];

      // Get video details first to find related videos
      const videoData = await fetchWithFallback(`/api/v1/videos/${videoId}`);
      const relatedVideos = videoData.recommendedVideos || [];

      return {
        contents: transformSearchResults(relatedVideos)
      };
    }
    else if (url.includes('video/comments/?id=')) {
      // Comments endpoint
      const videoId = url.match(/id=([^&]+)/)?.[1];

      try {
        const data = await fetchWithFallback(`/api/v1/comments/${videoId}`);
        return transformComments(data.comments || []);
      } catch (error) {
        // Comments might be disabled
        return {
          totalCommentsCount: 0,
          comments: []
        };
      }
    }

    // Default fallback
    return { contents: [] };
  } catch (error) {
    console.error('API Error:', error.message);
    // Return empty data as fallback
    if (url.includes('video/details')) {
      return null;
    }
    if (url.includes('comments')) {
      return { totalCommentsCount: 0, comments: [] };
    }
    return { contents: [] };
  }
};
