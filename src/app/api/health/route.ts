// app/api/health/route.ts
import { NextResponse } from "next/server";
import { nativeClient } from "@/lib/db"; // cliente mongo

export async function GET() {
  // chequeo simple: respuesta inmediata
  const status = { basic: true, db: false, time: new Date().toISOString() };

  // chequeo opcional de DB (timeout corto)
  try {
    const admin = nativeClient.db().admin();
    // ping con timeout corto
    await Promise.race([
      admin.ping(),
      new Promise((_r, rej) =>
        setTimeout(() => rej(new Error("db timeout")), 2000)
      ),
    ]);
    status.db = true;
  } catch {
    status.db = false;
  }

  const statusCode = status.basic && status.db ? 200 : 503;
  return new NextResponse(JSON.stringify(status), {
    status: statusCode,
    headers: { "content-type": "application/json" },
  });
}
