export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'No query provided' });

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${q}&lang=en&country=us&max=5&apikey=71057807853be8d8682aea119d767215`,
      { headers: { 'User-Agent': 'CapitalSignal/1.0' } }
    );
    const data = await response.json();
    // Convert GNews format to match our existing code
    const articles = (data.articles || []).map(a => ({
      title: a.title,
      url: a.url,
      source: { name: a.source.name },
      publishedAt: a.publishedAt
    }));
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
