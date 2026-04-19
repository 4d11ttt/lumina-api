export default function handler(req, res) {
    res.status(200).json({
        success: true,
        message: "Lumina REST API Serverless - Active",
        version: "2.0.0",
        endpoints: {
            tiktok: "/api/tiktok?url=",
            instagram: "/api/ig?url=",
            youtube: "/api/yt?url=&format=audio/video",
            soundcloud: "/api/soundcloud?url=",
            spotify: "/api/spotify?url=",
            pinterest: "/api/pinterest?url=",
            twitter: "/api/twitter?url="
        }
    });
}
