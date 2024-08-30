// ファイル"./examples/qr2.jpg"からマルチリードのテスト
import { SVG, registerWindow } from "@svgdotjs/svg.js"; // 非ブラウザの実行環境でSVG.jsを使うため
import sharp from "sharp";
import { createSVGWindow } from "svgdom";
import { type ReaderOptions, readBarcodesFromImageFile } from "zxing-wasm/reader";
import { loadFileAsBlob } from "./lib/utils";

const readerOptions: ReaderOptions = {
	tryHarder: true,
	formats: ["QRCode"],
	maxNumberOfSymbols: 16,
};

const jpegOpt = {
	quality: 85,
	progressive: true,
	force: false,
};

// 非ブラウザの実行環境でSVG.jsを使うためのおまじない
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

const imageFile = await loadFileAsBlob("./examples/qr2.jpg");
const results = await readBarcodesFromImageFile(imageFile, readerOptions);

const s1 = sharp(Buffer.from(await imageFile.arrayBuffer()));
const { width, height } = await s1.metadata();
const draw = SVG().size(width, height);
// draw
// 	.circle(50)
// 	.fill("#f00")
// 	.center(width / 2, height / 2);

results.forEach((result, index) => {
	console.log(`${index + 1}: ${result.text}`);

	console.log({ position: result.position });

	const p = result.position;
	const pathData = `M${p.topLeft.x},${p.topLeft.y} L${p.topRight.x},${p.topRight.y} L${p.bottomRight.x},${p.bottomRight.y} L${p.bottomLeft.x},${p.bottomLeft.y} Z`;
	draw.path(pathData).fill("none").stroke({ color: "#a00a", width: 10 });
});

s1.composite([{ input: Buffer.from(draw.svg()), top: 0, left: 0 }])
	.jpeg(jpegOpt)
	.toFile("tmp/ex3.jpg");
