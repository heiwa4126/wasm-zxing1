import fs from "node:fs/promises";

export async function loadFileAsBlob(filePath: string): Promise<Blob> {
	// ファイルを非同期で読み込む
	const fileBuffer = await fs.readFile(filePath);

	// BufferからBlobを作成
	const blob = new Blob([fileBuffer], { type: "image/jpeg" });

	return blob;
}
