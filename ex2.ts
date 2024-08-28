// ファイル"./examples/qr4.jpg"からマルチリードのテスト
// 14個読めたらOK

import { type ReaderOptions, readBarcodesFromImageFile } from "zxing-wasm/reader";
import { loadFileAsBlob } from "./lib/utils";

const readerOptions: ReaderOptions = {
	tryHarder: true,
	formats: ["QRCode"],
	maxNumberOfSymbols: 50,
};

const imageFile = await loadFileAsBlob("./examples/qr4.jpg");
const results = await readBarcodesFromImageFile(imageFile, readerOptions);

results.forEach((result, index) => {
	console.log(`${index + 1}: ${result.text}`);
});
