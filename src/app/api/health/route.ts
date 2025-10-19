// app/api/health/route.ts
import { NextResponse } from "next/server";
import { getNativeClient } from "@/lib/db"; // cliente mongo (lazy)

export async function GET() {
  // chequeo simple: respuesta inmediata
  const status = { basic: true, db: false, time: new Date().toISOString() };

  // chequeo opcional de DB (timeout corto)
  try {
    const client = getNativeClient();
    if (client) {
      const admin = client.db().admin();
      // ping con timeout corto
      await Promise.race([
        admin.ping(),
        new Promise((_r, rej) =>
          setTimeout(() => rej(new Error("db timeout")), 2000)
        ),
      ]);
      status.db = true;
    } else {
      status.db = false;
    }
  } catch {
    status.db = false;
  }

  const statusCode = status.basic && status.db ? 200 : 503;
  return new NextResponse(JSON.stringify(status), {
    status: statusCode,
    headers: { "content-type": "application/json" },
  });
}
