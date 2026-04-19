import axios from 'axios';
export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ success: false });
    const { url, format } = req.query;
    if (!url) return res.status(400).json({ success: false });
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/d/savefrom?url=${encodeURIComponent(url)}`, { timeout: 20000 });
        const d = response.data?.data?.[0];
        const dataObj = Array.isArray(d?.data) ? d.data[0] : d?.data;
        if (!dataObj) throw new Error();
        let urls = dataObj.url || [];
        let bestUrl = null;
        let finalType = 'video';
        if (format === 'audio') {
            const audioObj = urls.find(u => u.audio === true || ['mp3', 'm4a'].includes(u.ext?.toLowerCase()) || u.type?.toLowerCase().includes('audio') || u.name?.toLowerCase().includes('audio'));
            bestUrl = audioObj ? audioObj.url : urls[0]?.url;
            finalType = 'audio';
        } else {
            const videoObj = urls.find(u => (u.ext?.toLowerCase() === 'mp4' || u.type?.toLowerCase() === 'mp4') && u.no_audio !== true);
            bestUrl = videoObj ? videoObj.url : (dataObj.hd?.url || urls[0]?.url);
        }
        if (!bestUrl) throw new Error();
        return res.status(200).json({ success: true, platform: "youtube", type: finalType, title: dataObj.meta?.title || "Lumina YouTube", media: [bestUrl] });
    } catch (error) { return res.status(500).json({ success: false }); }
}
