import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const {contentType}=useContentStore()

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/${contentType}/trending`);
        const data = await response.json();
        setTrendingContent(data.content);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };

    if (contentType) {
      getTrendingContent();
    }
  }, [contentType]); // fetch data when contentType changes

  return { trendingContent };
};

export default useGetTrendingContent;
