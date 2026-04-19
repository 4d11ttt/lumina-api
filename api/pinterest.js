import axios from 'axios';
export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ success: false });
    const { url } = req.query;
    if (!url) return res.status(400).json({ success: false });
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/d/pinterest?url=${encodeURIComponent(url)}`, { timeout: 15000 });
        const d = response.data?.data;
        if (!d?.url) throw new Error();
        const isVideo = d.url.includes('.mp4');
        return res.status(200).json({ success: true, platform: "pinterest", type: isVideo ? "video" : "photo", title: "Lumina Pinterest", media: [d.url] });
    } catch (error) { return res.status(500).json({ success: false }); }
}
