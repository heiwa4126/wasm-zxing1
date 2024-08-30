// shape <https://www.npmjs.com/package/sharp> のテスト

import { SVG, registerWindow } from "@svgdotjs/svg.js"; // 非ブラウザの実行環境でSVG.jsを使うため
import sharp from "sharp";
import { createSVGWindow } from "svgdom";

const width = 320;
const height = 180;
const diameter = 100;
const radius = diameter / 2;
const jpegOpt = {
	quality: 85,
	progressive: true,
	force: false,
};

// 非ブラウザの実行環境でSVG.jsを使うためのおまじない
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

//==== ex1
sharp({
	create: { width, height, channels: 3, background: { r: 0, g: 255, b: 0 } },
}).toFile("tmp/s1-1.jpg", (err, info) => {
	if (err) {
		console.error(err);
	} else {
		console.log("ex1: Image created successfully.");
		console.log(info);
	}
});

//==== ex2 : 画像の上に何か書く
const s2 = await sharp({
	create: { width, height, channels: 3, background: { r: 0, g: 255, b: 0 } },
});
// const { width, height } = await s2.metadata(); // 画像からサイズを得るなら

// 赤い円を描くSVGを生成
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="red" />
</svg>
`;
s2.composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
	.jpeg(jpegOpt)
	.toFile("tmp/s1-2.jpg");

//==== ex3 : svgをラップする
const draw = SVG().size(width, height);
draw.rect(width, height).fill("#0f0"); // SVGには背景色という観念がない
draw
	.circle(diameter)
	.fill("#f00")
	.center(width / 2, height / 2);

draw
	.text("Hello, SVG.js!")
	.font({
		family: "Arial",
		size: 45,
		anchor: "middle",
		leading: "1.5em",
	})
	.fill("#00f")
	.cx(width / 2)
	.cy(height / 2);

draw // monospace test
	.text("monospace font")
	.font({
		family: "Consolas, Menlo, monospace",
		size: 30,
		anchor: "middle",
		leading: "1.0em",
	})
	.fill("#fff")
	.cx(width / 2)
	.cy(height / 2 + 36);

console.log(draw.svg());

sharp(Buffer.from(draw.svg())).jpeg(jpegOpt).toFile("tmp/s1-3.jpg");
