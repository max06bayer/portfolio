// Converts the captured Figma prototype into a small, inspectable layer manifest.
// This is a local import tool, not part of the website runtime.
import { parse } from '@babel/parser';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const source = readFileSync('design-reference/figma-source.jsx', 'utf8');
const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
const fn = ast.program.body.find(n => n.type === 'ExportDefaultDeclaration').declaration;
const root = fn.body.body.find(n => n.type === 'ReturnStatement').argument;
const assets = Object.fromEntries([...source.matchAll(/const (img\w+) = "([^"]+)";/g)].map(([, name, url]) => [name, name + (url.endsWith('.svg') ? '.svg' : '.png')]));
const attr = (el, name) => el.openingElement.attributes.find(a => a.name?.name === name)?.value;
const val = (el, name) => attr(el, name)?.value ?? '';
const descendants = el => [el, ...el.children.filter(c => c.type === 'JSXElement').flatMap(descendants)];
const number = (classes, prefix, fallback = 0) => {
  const token = classes.split(' ').find(t => t.startsWith(prefix + '-['));
  if (token) return parseFloat(token.slice(prefix.length + 2));
  if (classes.split(' ').includes(prefix + '-0')) return 0;
  return fallback;
};
const layers = [];
for (const child of root.children.filter(c => c.type === 'JSXElement')) {
  if (child.openingElement.name.name !== 'div') continue;
  const classes = val(child, 'className');
  const y = number(classes, 'top');
  if (y < 1088 || y >= 12624) continue;
  const id = val(child, 'data-node-id');
  const image = descendants(child).find(c => c.openingElement.name.name === 'img');
  const imageClasses = image ? val(image, 'className') : '';
  const w = number(classes, 'w', number(classes, 'size', 1920));
  const h = number(classes, 'h', number(classes, 'size'));
  const border = classes.match(/border-\[(#[\da-f]+)\]/)?.[1];
  const entry = {
    id, x: number(classes, 'left'), y, w, h,
    ...(border ? { border } : {}),
    ...(classes.includes('shadow-[') ? { shadow: '0px 4px 72.1px 0px black' } : {})
  };
  if (image) {
    const ref = attr(image, 'src').expression.name;
    const pct = (prefix, fallback) => imageClasses.match(new RegExp(prefix + '-\\[(-?[\\d.]+)%\\]'))?.[1] ?? fallback;
    Object.assign(entry, {
      asset: assets[ref],
      fit: imageClasses.includes('object-cover') ? 'cover' : 'fill',
      position: imageClasses.includes('object-bottom') ? 'bottom' : 'center',
      crop: { x: pct('left', 0), y: pct('top', 0), w: pct('w', 100), h: pct('h', 100) },
      opacity: classes.includes('opacity-50') ? 0.5 : imageClasses.includes('opacity-75') ? 0.75 : 1
    });
    // Figma instance opacity is omitted by the generated prototype for globe icons.
    if (['9:2076', '9:2081', '9:2116'].includes(id)) entry.opacity = 0.5;
  } else {
    entry.background = 'black';
  }
  layers.push(entry);
}
// Individual node exports preserve Figma's image grading and exact crops.
// These exports are downloaded separately; their original assets stay archived.
const exports = JSON.parse(readFileSync('design-reference/exports.json', 'utf8'));
for (const layer of layers) {
  if (exports.some(e => e.nodeId === layer.id)) {
    layer.sourceAsset = layer.asset;
    layer.asset = 'node-' + layer.id.replace(':', '-') + '.png';
    layer.crop = { x: 0, y: 0, w: 100, h: 100 };
    layer.fit = 'fill';
    layer.opacity = 1;
    delete layer.border;
  }
}
for (const id of ['9:2110', '11:2134']) layers.find(l => l.id === id).border = '#232323';
layers.find(l => l.id === '9:2076').y += 1;
Object.assign(layers.find(l => l.id === '9:2077'), { asset: 'docuflex-editor-4k.png', fit: 'cover' });
mkdirSync('src/lib/design', { recursive: true });
writeFileSync('src/lib/design/layers.json', JSON.stringify(layers, null, 2) + '\n');
const texts = JSON.parse(readFileSync('design-reference/text-layers.json', 'utf8')).filter(t => t.y >= 1088);
texts.sort((a, b) => a.y - b.y || a.x - b.x);
// Requested follow-up: the introduction's Docuflex mention matches the social links.
const intro = texts.find(t => t.id === '12:2183');
intro.segments = intro.segments.flatMap(s => {
  if (!s.text.includes('Docuflex!')) return [s];
  const [before, after] = s.text.split('Docuflex');
  return [
    { ...s, text: before },
    { ...s, text: 'Docuflex', color: intro.segments.find(s => s.text === 'Dribble').color, underline: true },
    { ...s, text: after }
  ];
});
writeFileSync('src/lib/design/text.json', JSON.stringify(texts, null, 2) + '\n');
console.log(`Imported ${layers.length} visual layers and ${texts.length} native text layers.`);
