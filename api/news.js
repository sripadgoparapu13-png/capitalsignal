export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'No query provided' });

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}+stock&sortBy=publishedAt&pageSize=5&language=en&apiKey=PASTE_YOUR_NEWS_KEY_HERE`,
      { headers: { 'User-Agent': 'CapitalSignal/1.0' } }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
