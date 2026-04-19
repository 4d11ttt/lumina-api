import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ success: false });
    const { url } = req.query;
    if (!url) return res.status(400).json({ success: false });
    
    try {
        const cleanUrl = url.split('?')[0];
        const response = await axios.get(`https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(cleanUrl)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            },
            timeout: 20000
        });

        const d = response.data?.data;
        if (!d || d.length === 0) throw new Error();

        const mediaList = d.map(x => {
            const isVideo = typeof x.url === 'string' && (x.url.includes('.mp4') || x.url.includes('video'));
            return {
                type: isVideo ? 'video' : 'photo',
                url: x.url
            };
        });

        const isSlide = mediaList.length > 1;
        const primaryType = isSlide ? "slide" : mediaList[0].type;

        return res.status(200).json({
            success: true,
            platform: "instagram",
            type: primaryType,
            title: "Lumina Instagram",
            media: isSlide ? mediaList.map(m => m.url) : [mediaList[0].url]
        });

    } catch (error) { 
        return res.status(500).json({ success: false }); 
    }
}
