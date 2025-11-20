from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app)

# Mock data
STOCKS = [
    {"symbol": "AAPL", "name": "Apple Inc.", "price": 150.00, "change": 1.5},
    {"symbol": "GOOGL", "name": "Alphabet Inc.", "price": 2800.00, "change": -0.5},
    {"symbol": "MSFT", "name": "Microsoft Corporation", "price": 300.00, "change": 0.8},
    {"symbol": "AMZN", "name": "Amazon.com Inc.", "price": 3400.00, "change": 2.1},
    {"symbol": "TSLA", "name": "Tesla Inc.", "price": 750.00, "change": -1.2},
]

@app.route('/api/search', methods=['GET'])
def search_stocks():
    query = request.args.get('q', '').upper()
    if not query:
        return jsonify([])
    
    results = [stock for stock in STOCKS if query in stock['symbol'] or query in stock['name'].upper()]
    return jsonify(results)

@app.route('/api/stock/<symbol>', methods=['GET'])
def get_stock_details(symbol):
    symbol = symbol.upper()
    
    # Find stock or use default
    stock_info = next((s for s in STOCKS if s['symbol'] == symbol), None)
    if not stock_info:
        # Fallback for demo purposes if symbol not in initial list
        stock_info = {"symbol": symbol, "name": "Unknown Corp", "price": 100.00, "change": 0.0}

    # Mock Chart Data (1 Month - ~30 points)
    # Generating a random walk for the chart
    chart_data = []
    current_price = stock_info['price']
    for i in range(30):
        # Random fluctuation
        change = random.uniform(-5, 5)
        price = current_price - change # working backwards or just random points
        # Let's just generate a nice curve ending at current price
        chart_data.append({"value": round(price, 2)})
    
    # Ensure the last point matches current price roughly (visual consistency)
    chart_data[-1]['value'] = stock_info['price']

    # Mock News/Insights
    insights = [
        "The Nasdaq rose about 2.3%, its strongest one-day gain in months, as optimism grew around a **potential end to the U.S. government shutdown**.",
        "Tech and growth stocks were the key drivers—companies tied to **AI, semiconductors and large-cap tech** posted strong gains.",
        "Sentiment appears boosted by the procedural advancement in the Senate for government funding, **although the final deal is still pending**.",
        "Caution remains: while the upside move is strong, **underlying fundamentals and risk (shutdown drag, economic data gaps) still loom**."
    ]

    news_cards = [
        {
            "source": "Reuters",
            "title": "Global shares jump as investors eye potential end to US government shutdown",
            "image": "https://picsum.photos/200/120?random=1"
        },
        {
            "source": "Bloomberg",
            "title": "Tech Rally Continues as AI Optimism Persists",
            "image": "https://picsum.photos/200/120?random=2"
        },
        {
            "source": "CNBC",
            "title": "Market Watch: What to expect in the coming week",
            "image": "https://picsum.photos/200/120?random=3"
        }
    ]

    response = {
        "symbol": stock_info['symbol'],
        "name": stock_info['name'],
        "price": stock_info['price'],
        "change": stock_info['change'],
        "percent_change": round((stock_info['change'] / (stock_info['price'] - stock_info['change'])) * 100, 2),
        "chart_data": chart_data,
        "insights": insights,
        "news": news_cards
    }
    
    # Simulate latency
    time.sleep(0.5)
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
