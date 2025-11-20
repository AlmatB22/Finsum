import { useState, useEffect } from 'react';
import { StockDetail } from '@/types/stock';
import { fetchStockDetails } from '@/services/api';

export function useStockDetails(symbol: string | undefined) {
    const [stock, setStock] = useState<StockDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadStock = async () => {
            if (!symbol) return;

            setLoading(true);
            setError(null);

            try {
                const data = await fetchStockDetails(symbol);
                setStock(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error('Error loading stock details:', err);
            } finally {
                setLoading(false);
            }
        };

        loadStock();
    }, [symbol]);

    return { stock, loading, error };
}
