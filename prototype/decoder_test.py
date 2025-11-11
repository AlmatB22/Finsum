import feedparser
from googlenewsdecoder import gnewsdecoder

def get_google_news_links(rss_url, limit=10):
    """
    Fast version: Fetch and decode article links from a Google News RSS feed without delays.

    Args:
        rss_url (str): Google News RSS feed URL.
        limit (int): Number of articles to process.

    Returns:
        list of tuples: [(title, decoded_url), ...]
    """
    feed = feedparser.parse(rss_url)
    articles = []

    for entry in feed.entries[:limit]:
        original_link = entry.link

        try:
            result = gnewsdecoder(original_link)  # no interval needed
            if result.get("status"):
                decoded_url = result["decoded_url"]
                articles.append(decoded_url)
            else:
                print(f"[❌] Failed to decode: {result['message']}")
        except Exception as e:
            print(f"[⚠️] Error decoding link: {e}")

    return articles

if __name__ == "__main__":
    rss_url = "https://news.google.com/rss/search?q=amazon+stock+market&hl=en-US&gl=US&ceid=US:en"
    results = get_google_news_links(rss_url, limit=10)

    print(f"\n🔹 Decoded {len(results)} article links:\n")
    for url in results:
        print(f"{url}\n")
