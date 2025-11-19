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

@app.route('/api/insights', methods=['GET'])
def get_insights():
    ticker = request.args.get('ticker', '').upper()
    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400
    
    # Mock AI insights
    insights = {
        "ticker": ticker,
        "summary": f"Recent performance for {ticker} has been driven by strong earnings reports and positive market sentiment.",
        "bullish_case": "Continued growth in cloud services and hardware sales.",
        "bearish_case": "Potential regulatory headwinds and supply chain constraints.",
        "sentiment": random.choice(["Positive", "Neutral", "Negative"])
    }
    
    # Simulate latency
    time.sleep(1)
    
    return jsonify(insights)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
