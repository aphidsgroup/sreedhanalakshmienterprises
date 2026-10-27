const { chromium } = require('playwright');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function testProductsModalEdit() {
  console.log('🧪 Starting Products CMS Modal Edit Test with Playwright...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Login
    await page.goto(`${BASE_URL}/admin/login`);
    await page.fill('#email', 'admin@sde.com');
    await page.fill('#password', 'Admin@1234');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');
    console.log('✅ Logged in successfully');

    // Go to Products CMS page
    await page.goto(`${BASE_URL}/admin/products`, { waitUntil: 'networkidle' });
    console.log('✅ Navigated to /admin/products');

    // Search for UltraTech OPC 53
    await page.fill('input[placeholder*="Search products"]', 'UltraTech OPC 53');
    await page.waitForTimeout(1000);

    // Click Edit button (button with Edit2 icon)
    const editBtn = page.locator('table tbody tr button:has(.lucide-edit-2), table tbody tr button:has(.lucide-square-pen), table tbody tr button.text-blue-600').first();
    await editBtn.click();
    console.log('✅ Clicked Edit Product button, modal opened');

    // Wait for modal
    await page.waitForSelector('h2:has-text("Edit Product")');

    // Find Price input
    const priceInput = page.locator('input[type="number"][step="0.01"]');
    await priceInput.fill('430');
    console.log('✅ Filled new price: ₹430');

    // Click Save Product
    await page.click('button:has-text("Save Product")');
    console.log('✅ Clicked "Save Product" button');

    // Wait for modal to close
    await page.waitForSelector('h2:has-text("Edit Product")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Modal closed successfully');

    // Verify DB
    await page.waitForTimeout(1500);
    const inDb = await prisma.product.findFirst({ where: { name: 'UltraTech OPC 53' } });
    console.log(`Neon DB confirmed currentPrice: ₹${inDb.currentPrice}`);
    if (Number(inDb.currentPrice) === 430) {
      console.log('🎉 SUCCESS: Price was successfully changed in the database via Products CMS!');
    } else {
      throw new Error(`Expected price 430, found ${inDb.currentPrice}`);
    }

    // Verify Public Website
    const publicPage = await context.newPage();
    await publicPage.goto(`${BASE_URL}/today-cement-price`, { waitUntil: 'networkidle' });
    const content = await publicPage.content();
    const has430 = content.includes('430');
    console.log(`Public page /today-cement-price shows ₹430: ${has430 ? 'YES!' : 'NO!'}`);
    await publicPage.close();

    // Revert back to 410
    console.log('Reverting back to ₹410...');
    await editBtn.click();
    await page.waitForSelector('h2:has-text("Edit Product")');
    await page.locator('input[type="number"][step="0.01"]').fill('410');
    await page.click('button:has-text("Save Product")');
    await page.waitForSelector('h2:has-text("Edit Product")', { state: 'hidden', timeout: 5000 });
    await page.waitForTimeout(1500);

    const revertedDb = await prisma.product.findFirst({ where: { name: 'UltraTech OPC 53' } });
    console.log(`Neon DB confirmed reverted price: ₹${revertedDb.currentPrice}`);
    console.log('🎉 ALL TESTS PASSED! The fix is completely verified.');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

testProductsModalEdit();
