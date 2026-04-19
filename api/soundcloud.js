import axios from 'axios';
export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ success: false });
    const { url } = req.query;
    if (!url) return res.status(400).json({ success: false });
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/d/savefrom?url=${encodeURIComponent(url)}`, { timeout: 15000 });
        const d = response.data?.data?.[0];
        const dataObj = Array.isArray(d?.data) ? d.data[0] : d?.data;
        if (!dataObj) throw new Error();
        const audioUrl = dataObj.url?.[0]?.url;
        if (!audioUrl) throw new Error();
        return res.status(200).json({ success: true, platform: "soundcloud", type: "audio", title: dataObj.meta?.title || "Lumina SoundCloud", media: [audioUrl] });
    } catch (error) { return res.status(500).json({ success: false }); }
}
