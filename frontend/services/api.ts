import { StockDetail } from '@/types/stock';

const API_URL = 'http://127.0.0.1:5000/api';

// Toggle this to switch between real API and Mock data
const USE_MOCK_DATA = true;

export const fetchStockDetails = async (symbol: string): Promise<StockDetail> => {
    if (USE_MOCK_DATA) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    symbol: symbol.toUpperCase(),
                    name: 'Apple Inc.', // In a real mock, this would be dynamic or a lookup
                    price: 178.45,
                    change: 3.25,
                    percent: 1.86,
                    percent_change: 1.86,
                    chart_data: [
                        { value: 160 }, { value: 162 }, { value: 158 }, { value: 165 }, { value: 163 },
                        { value: 170 }, { value: 172 }, { value: 168 }, { value: 174 }, { value: 175 },
                        { value: 172 }, { value: 178 }, { value: 176 }, { value: 177 }, { value: 178.45 }
                    ],
                    insights: [
                        "The Nasdaq rose about 2.3%, its strongest one-day gain in months, as optimism grew around a **potential end to the U.S. government shutdown**.",
                        "Tech and growth stocks were the key drivers—companies tied to **AI, semiconductors and large-cap tech** posted strong gains.",
                        "Sentiment appears boosted by the procedural advancement in the Senate for government funding, **although the final deal is still pending**.",
                        "Caution remains: while the upside move is strong, **underlying fundamentals and risk (shutdown drag, economic data gaps) still loom**."
                    ],
                    news: [
                        {
                            source: "Reuters",
                            title: "Global shares jump as investors eye potential end to US government shutdown",
                            image: "https://picsum.photos/200/120?random=1"
                        },
                        {
                            source: "Bloomberg",
                            title: "Tech Rally Continues as AI Optimism Persists",
                            image: "https://picsum.photos/200/120?random=2"
                        },
                        {
                            source: "CNBC",
                            title: "Market Watch: What to expect in the coming week",
                            image: "https://picsum.photos/200/120?random=3"
                        }
                    ]
                });
            }, 500); // Simulate network latency
        });
    }

    const response = await fetch(`${API_URL}/stock/${symbol}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
