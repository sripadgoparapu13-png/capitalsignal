export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'No query provided' });

  try {
    const response = await fetch(
    `https://newsapi.org/v2/everything?q=${q}&domains=reuters.com,bloomberg.com,wsj.com,cnbc.com,marketwatch.com&sortBy=publishedAt&pageSize=5&language=en&apiKey=3ef3782fa0764360be0f0021a1076d40`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
