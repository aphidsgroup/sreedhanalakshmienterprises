const fs = require('fs');
const path = require('path');

const disclaimer = `<p className="mt-4 text-xs sm:text-sm text-yellow-100 italic border-t border-[#3d9aaf] pt-3">
              * Disclaimer: Prices shown are indicative Chennai market rates. Actual rates may vary based on brand, size, quantity, delivery location, GST, transport, stock availability and supplier rate changes. Please call or WhatsApp for final quotation.
            </p>`;

const dir = path.join(__dirname, 'app', '(public)');

const files = [
  'today-cement-price/page.tsx',
  'today-steel-price/page.tsx',
  'today-bricks-and-blocks-price/page.tsx',
  'today-sand-and-aggregates-price/page.tsx',
  'today-fabrication-materials-price/page.tsx'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('Disclaimer: Prices shown')) {
      // Find the closing div of the text block and insert before the next div
      const regex = /(<\/div>\s*<div style=\{\{\s*backgroundColor:\s*"#edf6f8"\s*\}\})/m;
      if (regex.test(content)) {
         content = content.replace(regex, `  ${disclaimer}\n          $1`);
         fs.writeFileSync(filePath, content, 'utf8');
         console.log('Patched', file);
      } else {
         console.log('Could not find target block in', file);
      }
    } else {
      console.log('Already patched', file);
    }
  }
}
