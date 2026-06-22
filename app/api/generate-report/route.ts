import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export const dynamic = "force-dynamic";

const SCRIPT_PATH = path.join(process.cwd(), "scripts", "generate_report.py");

function runDoclingScript(payload: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pythonBin = process.env.DOCLING_PYTHON_BIN ?? "python3";
    const child = spawn(pythonBin, [SCRIPT_PATH], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    child.stdout.on("data", (chunk) => stdoutChunks.push(chunk));
    child.stderr.on("data", (chunk) => stderrChunks.push(chunk));

    child.on("error", (err) => {
      reject(
        new Error(
          `Could not start Docling report generator (${pythonBin}): ${err.message}`
        )
      );
    });

    child.on("close", (code) => {
      if (code !== 0) {
        const stderr = Buffer.concat(stderrChunks).toString("utf-8").trim();
        reject(new Error(stderr || `Docling script exited with code ${code}.`));
        return;
      }
      resolve(Buffer.concat(stdoutChunks));
    });

    child.stdin.write(payload);
    child.stdin.end();
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pdfBuffer = await runDoclingScript(JSON.stringify(body));
    const pdfBytes = Uint8Array.from(pdfBuffer);

    return new NextResponse(new Blob([pdfBytes]), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="scout-report.pdf"',
      },
    });
  } catch (err) {
    console.error("[/api/generate-report] error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to generate the scout report PDF.",
      },
      { status: 500 }
    );
  }
}
