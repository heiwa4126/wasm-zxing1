// ファイル"./examples/qr5.jpg"からマルチリードのテスト
// 4個読めたら最高 (たぶん3つしか読めない)

import { type ReaderOptions, readBarcodesFromImageFile } from "zxing-wasm/reader";
import { loadFileAsBlob } from "./lib/utils";

const readerOptions: ReaderOptions = {
	tryHarder: true,
	formats: ["QRCode"],
	maxNumberOfSymbols: 16,
};

const imageFile = await loadFileAsBlob("./examples/qr5.jpg");
const results = await readBarcodesFromImageFile(imageFile, readerOptions);

results.forEach((result, index) => {
	console.log(`${index + 1}: ${result.text}`);
});
