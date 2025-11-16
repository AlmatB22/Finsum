import feedparser
import requests
from bs4 import BeautifulSoup

def get_actual_url(google_news_url):
    """
    Extract the real article URL from a Google News RSS link.
    """
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        r = requests.get(google_news_url, headers=headers, timeout=10)
        soup = BeautifulSoup(r.text, "html.parser")
        
        # The first <a> with target="_blank" usually points to the original article
        a_tag = soup.find("a", attrs={"target": "_blank"})
        if a_tag and a_tag.get("href"):
            return a_tag["href"]
        
        # fallback if not found
        return google_news_url
    except Exception as e:
        print(f"⚠️ Error: {e}")
        return google_news_url

def get_google_news_links(rss_url, limit=30):
    feed = feedparser.parse(rss_url)
    articles = []

    for entry in feed.entries[:limit]:
        title = entry.title
        google_link = entry.link
        actual_url = get_actual_url(google_link)
        articles.append((title, actual_url))

    return articles

if __name__ == "__main__":
    rss_url = "https://news.google.com/rss/search?q=amazon+stock+market&hl=en-US&gl=US&ceid=US:en"
    results = get_google_news_links(rss_url)

    for title, url in results:
        print(f"📰 {title}\n🔗 {url}\n")
