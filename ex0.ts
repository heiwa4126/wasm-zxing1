// https://github.com/Sec-ant/zxing-wasm?tab=readme-ov-file#readbarcodesfromimagefile-and-readbarcodesfromimagedata
// にあるサンプルコードそのまま

import { type ReaderOptions, readBarcodesFromImageFile } from "zxing-wasm/reader";

const readerOptions: ReaderOptions = {
	tryHarder: true,
	formats: ["QRCode"],
	maxNumberOfSymbols: 1,
};

/**
 * Read from image file/blob
 */
const imageFile = await fetch(
	"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Hello%20world!",
).then((resp) => resp.blob());

const imageFileReadResults = await readBarcodesFromImageFile(imageFile, readerOptions);

console.log(imageFileReadResults[0].text); // Hello world!
