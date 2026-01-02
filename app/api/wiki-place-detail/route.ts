import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { placeName } = await req.json();
    const BASE_URL = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(placeName)}`;
    const config = {
        headers: {
            'Content-type': 'application/json',
            'User-Agent': 'travel-app/1.0 (contact@yourdomain.com)',
        }
    };

    try {
        const result = await axios.get(BASE_URL, config);

        return NextResponse.json(result.data);
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}