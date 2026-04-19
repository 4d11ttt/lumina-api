export default function handler(req, res) {
    res.status(200).json({
        success: true,
        message: "Lumina REST API Serverless - Active",
        version: "1.0.0",
        endpoints: {
            tiktok: "/api/tiktok?url="
        }
    });
}
