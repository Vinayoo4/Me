export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ count: 42 }); // Replace with real logic if needed
    } else if (req.method === 'POST') {
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }