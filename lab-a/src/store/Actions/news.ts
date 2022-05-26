import { GETNEWS, SETNEWS } from '../Type/news'

export const getNews = () => ({ type: GETNEWS });
export const setNews = (Array: Array<object>) => ({
  type: SETNEWS,
  payload: {
    data: Array
  }
});

export type NewsAction =
  | ReturnType<typeof getNews>
  | ReturnType<typeof setNews>;
