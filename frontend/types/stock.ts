export type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percent: number;
};

export type StockDetail = Stock & {
  percent_change: number;
  chart_data: { value: number; label?: string }[];
  insights: string[];
  news: { source: string; title: string; image: string }[];
};