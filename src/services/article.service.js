import axios from "axios";
import { SALES_MANAGEMENT_API, authenticationHeader } from "./env";

const getArticles = (keyword, categories = [], sources = [], authors = [], dateSort = 'newest')  => {

  const queryParams = new URLSearchParams({
    categories: categories.toString(),
    sources: sources.toString(),
    authors: authors.toString(),
    dateSort
  }).toString()

  return axios.get(`${SALES_MANAGEMENT_API}/articles/${keyword}/search?${queryParams}`, 
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const { total_results, articles } = response.data;
    const parsedArticles = articles.map((article) => {
      const { title, section , image_url, category, author, source, source_url, published_at } = article;
      return {
        title,
        section,
        imageURL: image_url,
        category,
        author,
        source,
        sourceURL: source_url,
        publishedAt: published_at
      }
    });

    return {
      totalResults: total_results,
      articles: parsedArticles,
    }
  });
};

export default {
  getArticles,
};