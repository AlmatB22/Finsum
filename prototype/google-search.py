import feedparser
from googlenewsdecoder import gnewsdecoder


def get_google_news_links(rss_url, limit=50):
    """
    Fetch and parse a Google News RSS feed.
    
    Args:
        rss_url (str): Google News RSS feed URL
        limit (int): Number of articles to return (default = 10)
    
    Returns:
        list of tuples: [(title, url), ...]
    """
    feed = feedparser.parse(rss_url)
    articles = []

    for entry in feed.entries[:limit]:
        link = entry.link
        articles.append(link)

    return articles


if __name__ == "__main__":
    # Example: Financial news about Amazon
    rss_url = "https://news.google.com/rss/search?q=amazon+stock+market&hl=en-US&gl=US&ceid=US:en"
    
    results = get_google_news_links(rss_url)

    print(f"🔹 Found {len(results)} articles:\n")
    for link in results:
        print(f"🔗 {link}\n")
