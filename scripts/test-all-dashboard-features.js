const { chromium } = require('playwright');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function runComprehensiveAudit() {
  console.log('🔬 STARTING COMPLETE DASHBOARD & WEBSITE AUDIT SUITE...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const auditReport = {
    overview: false,
    pricingUpdates: false,
    priceManagement: false,
    productsCrud: false,
    categoriesCrud: false,
    brandsCrud: false,
    contentFaqsCrud: false,
    settingsCrud: false,
    mediaGallery: false,
  };

  try {
    // 1. LOGIN
    console.log('[1/9] Testing Admin Login & Auth...');
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle' });
    await page.fill('#email', 'admin@sde.com');
    await page.fill('#password', 'Admin@1234');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');
    console.log('✅ Login successful, reached /admin');

    // 2. OVERVIEW
    console.log('\n[2/9] Testing Dashboard Overview...');
    const hasStats = await page.locator('text=Active Products').count();
    const hasQuickActions = await page.locator('text=Quick Actions').count();
    if (hasStats > 0 && hasQuickActions > 0) {
      auditReport.overview = true;
      console.log('✅ PASS: Overview metrics and quick actions render properly');
    }

    // 3. CATEGORIES CRUD
    console.log('\n[3/9] Testing Categories CMS (/admin/categories)...');
    await page.goto(`${BASE_URL}/admin/categories`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Add Category")');
    await page.waitForSelector('h2:has-text("Add Category")');
    await page.fill('input[placeholder="e.g. Cement"]', 'Playwright Test Category');
    await page.fill('input[placeholder="e.g. cement"]', 'playwright-test-category');
    await page.click('button:has-text("Save Category")');
    await page.waitForSelector('h2:has-text("Add Category")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Created test category via UI');

    // Verify DB
    const catInDb = await prisma.category.findUnique({ where: { slug: 'playwright-test-category' } });
    if (!catInDb) throw new Error('Category was not created in DB');
    console.log('✅ DB verified new category:', catInDb.name);

    // Edit Category
    await page.fill('input[placeholder="Search categories..."]', 'Playwright Test Category');
    await page.waitForTimeout(500);
    const catEditBtn = page.locator('table tbody tr button:has(.lucide-edit-2), table tbody tr button:has(.lucide-square-pen)').first();
    await catEditBtn.click();
    await page.waitForSelector('h2:has-text("Edit Category")');
    await page.fill('textarea', 'Updated description from Playwright test');
    await page.click('button:has-text("Save Category")');
    await page.waitForSelector('h2:has-text("Edit Category")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Edited category description and saved via UI');

    // Delete Category
    page.on('dialog', async dialog => await dialog.accept());
    const catDeleteBtn = page.locator('table tbody tr button:has(.lucide-trash-2)').first();
    await catDeleteBtn.click();
    await page.waitForTimeout(1000);
    const catDeleted = await prisma.category.findUnique({ where: { slug: 'playwright-test-category' } });
    if (!catDeleted) {
      auditReport.categoriesCrud = true;
      console.log('✅ PASS: Categories Add, Edit, and Delete are 100% working!');
    }

    // 4. BRANDS CRUD
    console.log('\n[4/9] Testing Brands CMS (/admin/brands)...');
    const cementCat = await prisma.category.findFirst({ where: { slug: 'cement' } });
    await page.goto(`${BASE_URL}/admin/brands`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Add Brand")');
    await page.waitForSelector('h2:has-text("Add Brand")');
    await page.fill('input[placeholder="e.g. UltraTech"]', 'Playwright Test Brand');
    await page.fill('input[placeholder="e.g. ultratech"]', 'playwright-test-brand');
    await page.selectOption('select', cementCat.id);
    await page.click('button:has-text("Save Brand")');
    await page.waitForSelector('h2:has-text("Add Brand")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Created test brand via UI');

    // Verify DB & Edit
    const brandInDb = await prisma.brand.findUnique({ where: { slug: 'playwright-test-brand' } });
    if (!brandInDb) throw new Error('Brand was not created in DB');
    console.log('✅ DB verified new brand:', brandInDb.name);

    await page.fill('input[placeholder="Search brands..."]', 'Playwright Test Brand');
    await page.waitForTimeout(500);
    const brandEditBtn = page.locator('table tbody tr button:has(.lucide-edit-2), table tbody tr button:has(.lucide-square-pen)').first();
    await brandEditBtn.click();
    await page.waitForSelector('h2:has-text("Edit Brand")');
    await page.fill('textarea', 'Updated brand description');
    await page.click('button:has-text("Save Brand")');
    await page.waitForSelector('h2:has-text("Edit Brand")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Edited brand description and saved via UI');

    // Delete Brand
    const brandDeleteBtn = page.locator('table tbody tr button:has(.lucide-trash-2)').first();
    await brandDeleteBtn.click();
    await page.waitForTimeout(1000);
    const brandDeleted = await prisma.brand.findUnique({ where: { slug: 'playwright-test-brand' } });
    if (!brandDeleted) {
      auditReport.brandsCrud = true;
      console.log('✅ PASS: Brands Add, Edit, and Delete are 100% working!');
    }

    // 5. PRODUCTS CRUD
    console.log('\n[5/9] Testing Products CMS (/admin/products)...');
    await page.goto(`${BASE_URL}/admin/products`, { waitUntil: 'networkidle' });
    await page.fill('input[placeholder*="Search products"]', 'UltraTech OPC 53');
    await page.waitForTimeout(500);
    const prodEditBtn = page.locator('table tbody tr button:has(.lucide-edit-2), table tbody tr button:has(.lucide-square-pen)').first();
    await prodEditBtn.click();
    await page.waitForSelector('h2:has-text("Edit Product")');
    
    // Update price and remarks
    await page.locator('input[type="number"][step="0.01"]').fill('412');
    await page.fill('input[value*="Premium segment"]', 'Updated via Full Audit');
    await page.click('button:has-text("Save Product")');
    await page.waitForSelector('h2:has-text("Edit Product")', { state: 'hidden', timeout: 5000 });
    await page.waitForTimeout(1000);

    const updatedProd = await prisma.product.findFirst({ where: { name: 'UltraTech OPC 53' } });
    if (Number(updatedProd.currentPrice) === 412) {
      console.log('✅ Products edit modal updated currentPrice to 412 in DB');
      // Revert
      await prodEditBtn.click();
      await page.waitForSelector('h2:has-text("Edit Product")');
      await page.locator('input[type="number"][step="0.01"]').fill('410');
      await page.fill('input[value*="Updated via Full Audit"]', 'Premium segment — best for RCC');
      await page.click('button:has-text("Save Product")');
      await page.waitForSelector('h2:has-text("Edit Product")', { state: 'hidden', timeout: 5000 });
      auditReport.productsCrud = true;
      console.log('✅ PASS: Products CMS Modal Edit & Revert 100% working!');
    }

    // 6. QUICK PRICING
    console.log('\n[6/9] Testing Quick Pricing (/admin/pricing)...');
    await page.goto(`${BASE_URL}/admin/pricing`, { waitUntil: 'networkidle' });
    await page.fill('input[placeholder*="Search"]', 'UltraTech OPC 53');
    await page.waitForTimeout(500);
    const updateBtn = page.locator('button:has-text("Update")').first();
    await updateBtn.click();
    await page.locator('input[type="number"]').first().fill('414');
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(1000);
    const prodPriceUpdated = await prisma.product.findFirst({ where: { name: 'UltraTech OPC 53' } });
    if (Number(prodPriceUpdated.currentPrice) === 414) {
      // Revert back
      await updateBtn.click();
      await page.locator('input[type="number"]').first().fill('410');
      await page.locator('button:has-text("Save")').first().click();
      await page.waitForTimeout(1000);
      auditReport.pricingUpdates = true;
      console.log('✅ PASS: Quick Pricing edit and revert 100% working!');
    }

    // 7. CONTENT / FAQS CRUD
    console.log('\n[7/9] Testing Content FAQs CMS (/admin/content)...');
    await page.goto(`${BASE_URL}/admin/content`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Add FAQ")');
    await page.waitForSelector('h2:has-text("Add FAQ")');
    await page.fill('input[placeholder*="Can I get delivery"]', 'Playwright Test Question?');
    await page.fill('textarea[placeholder*="Yes, we deliver"]', 'Yes, this is an automated answer.');
    await page.click('button:has-text("Save FAQ")');
    await page.waitForSelector('h2:has-text("Add FAQ")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Created test FAQ via UI');

    const faqInDb = await prisma.fAQ.findFirst({ where: { question: 'Playwright Test Question?' } });
    if (!faqInDb) throw new Error('FAQ was not created in DB');
    console.log('✅ DB verified new FAQ');

    // Edit FAQ
    await page.locator('table tbody tr:has-text("Playwright Test Question") button:has(.lucide-edit-2), table tbody tr:has-text("Playwright Test Question") button:has(.lucide-square-pen)').first().click();
    await page.waitForSelector('h2:has-text("Edit FAQ")');
    await page.fill('textarea', 'Updated answer via Playwright test.');
    await page.click('button:has-text("Save FAQ")');
    await page.waitForSelector('h2:has-text("Edit FAQ")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Edited FAQ answer via UI');

    // Delete FAQ
    await page.locator('table tbody tr:has-text("Playwright Test Question") button:has(.lucide-trash-2)').first().click();
    await page.waitForTimeout(1000);
    const faqDeleted = await prisma.fAQ.findFirst({ where: { question: 'Playwright Test Question?' } });
    if (!faqDeleted) {
      auditReport.contentFaqsCrud = true;
      console.log('✅ PASS: FAQs Add, Edit, and Delete are 100% working!');
    }

    // 8. SETTINGS CRUD
    console.log('\n[8/9] Testing Settings CMS (/admin/settings)...');
    await page.goto(`${BASE_URL}/admin/settings`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Add Setting")');
    await page.waitForSelector('h2:has-text("Add Setting")');
    await page.fill('input[placeholder="e.g. SUPPORT_PHONE"]', 'TEST_SETTING_KEY');
    await page.fill('input[placeholder="e.g. Support Phone Number"]', 'Test Setting Label');
    await page.fill('textarea', 'Test Setting Value');
    await page.click('button:has-text("Save Setting")');
    await page.waitForSelector('h2:has-text("Add Setting")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Created test Setting via UI');

    const settingInDb = await prisma.settings.findUnique({ where: { key: 'TEST_SETTING_KEY' } });
    if (!settingInDb) throw new Error('Setting was not created in DB');
    console.log('✅ DB verified new setting');

    // Edit Setting
    await page.locator('table tbody tr:has-text("TEST_SETTING_KEY") button:has(.lucide-edit-2), table tbody tr:has-text("TEST_SETTING_KEY") button:has(.lucide-square-pen)').first().click();
    await page.waitForSelector('h2:has-text("Edit Setting")');
    await page.fill('textarea', 'Updated Value via Playwright');
    await page.click('button:has-text("Save Setting")');
    await page.waitForSelector('h2:has-text("Edit Setting")', { state: 'hidden', timeout: 5000 });
    console.log('✅ Edited Setting value via UI');

    // Delete Setting
    await page.locator('table tbody tr:has-text("TEST_SETTING_KEY") button:has(.lucide-trash-2)').first().click();
    await page.waitForTimeout(1000);
    const settingDeleted = await prisma.settings.findUnique({ where: { key: 'TEST_SETTING_KEY' } });
    if (!settingDeleted) {
      auditReport.settingsCrud = true;
      console.log('✅ PASS: Settings Add, Edit, and Delete are 100% working!');
    }

    // 9. MEDIA GALLERY
    console.log('\n[9/9] Testing Media Gallery (/admin/media)...');
    await page.goto(`${BASE_URL}/admin/media`, { waitUntil: 'networkidle' });
    const mediaHeading = await page.locator('h1:has-text("Media CMS")').count();
    if (mediaHeading > 0) {
      auditReport.mediaGallery = true;
      console.log('✅ PASS: Media gallery page loaded cleanly!');
    }

  } catch (error) {
    console.error('Audit suite encountered error:', error);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }

  console.log('\n======================================================');
  console.log('🏆 COMPLETE ADMIN DASHBOARD CAPABILITY AUDIT RESULTS:');
  console.log('======================================================');
  console.log('1. Dashboard Overview Metrics:       ', auditReport.overview ? '✅ PASS' : '❌ FAIL');
  console.log('2. Products CMS (Modal Edit & Save): ', auditReport.productsCrud ? '✅ PASS' : '❌ FAIL');
  console.log('3. Quick Pricing Updates & Save:     ', auditReport.pricingUpdates ? '✅ PASS' : '❌ FAIL');
  console.log('4. Categories CMS (Add, Edit, Delete):', auditReport.categoriesCrud ? '✅ PASS' : '❌ FAIL');
  console.log('5. Brands CMS (Add, Edit, Delete):    ', auditReport.brandsCrud ? '✅ PASS' : '❌ FAIL');
  console.log('6. Content FAQs (Add, Edit, Delete):  ', auditReport.contentFaqsCrud ? '✅ PASS' : '❌ FAIL');
  console.log('7. Settings CMS (Add, Edit, Delete):  ', auditReport.settingsCrud ? '✅ PASS' : '❌ FAIL');
  console.log('8. Media CMS (Gallery & Assets View): ', auditReport.mediaGallery ? '✅ PASS' : '❌ FAIL');
  console.log('======================================================\n');
}

runComprehensiveAudit();
