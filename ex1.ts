// ex0.ts を改造して、ファイル"./examples/qr1.jpg"から読むようにしたもの

import { type ReaderOptions, readBarcodesFromImageFile } from "zxing-wasm/reader";
import { loadFileAsBlob } from "./lib/utils";

const readerOptions: ReaderOptions = {
	tryHarder: true,
	formats: ["QRCode"],
	maxNumberOfSymbols: 1,
};

const imageFile = await loadFileAsBlob("./examples/qr1.jpg");

const result = await readBarcodesFromImageFile(imageFile, readerOptions);

console.log(result[0].text); // Hello world!
