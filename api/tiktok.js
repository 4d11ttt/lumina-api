import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ success: false, message: "Parameter 'url' wajib diisi." });
    }

    try {
        const response = await axios.get('https://www.tikwm.com/api/', {
            params: { url: url, count: 12, hd: 1 },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            },
            timeout: 15000
        });

        const d = response.data?.data;
        
        if (!d) {
            return res.status(404).json({ success: false, message: "Media tidak ditemukan atau API target timeout." });
        }

        const isSlide = d.images && d.images.length > 0;

        const result = {
            success: true,
            platform: "tiktok",
            type: isSlide ? "slide" : "video",
            title: d.title || "Lumina Media",
            author: d.author?.nickname || "Unknown",
            media: isSlide ? d.images : [d.hdplay || d.play],
            music: d.music || null,
            cover: d.cover || null,
            stats: {
                views: d.play_count || 0,
                likes: d.digg_count || 0,
                comments: d.comment_count || 0,
                shares: d.share_count || 0
            }
        };

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal pada server.",
            error_detail: error.message
        });
    }
          }
