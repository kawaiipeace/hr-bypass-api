import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const emp_id = searchParams.get("emp_id");

    if (!emp_id) {
        return NextResponse.json({ error: "Missing emp_id parameter" }, { status: 400 });
    }

    const API_URL = `${process.env.PROXY_HOST}/get-employee-detail-m?emp_id=${emp_id}`;
    const API_KEY = process.env.API_KEY;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "apikey": API_KEY ?? "" },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
