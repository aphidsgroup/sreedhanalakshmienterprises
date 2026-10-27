const { chromium } = require('playwright');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function runE2ETests() {
  console.log('🚀 Starting SDE Enterprises Dashboard & Website E2E Tests with Playwright...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = {
    authRedirect: false,
    loginFormRender: false,
    loginSuccess: false,
    dashboardOverview: false,
    priceUpdateReflected: false,
    priceRevertedReflected: false,
    categoriesPageLoaded: false,
    brandsPageLoaded: false,
    productsPageLoaded: false,
    settingsAnalysis: null
  };

  try {
    // ----------------------------------------------------
    // TEST 1: Unauthenticated Redirect & Clean Login Page
    // ----------------------------------------------------
    console.log('--- TEST 1: Unauthenticated Navigation to /admin ---');
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' });
    const currentUrl = page.url();
    console.log(`Navigated to /admin -> Ended at: ${currentUrl}`);
    if (currentUrl.includes('/admin/login')) {
      results.authRedirect = true;
      console.log('✅ PASS: Unauthenticated access properly redirected to /admin/login');
    } else {
      console.error('❌ FAIL: Expected redirect to /admin/login, got:', currentUrl);
    }

    // Verify login page has NO sidebar and NO topbar
    const hasSidebar = await page.locator('aside.admin-sidebar').count();
    const hasTopBar = await page.locator('header:has-text("Welcome back")').count();
    const hasLoginForm = await page.locator('h1:has-text("Admin Login")').count();

    console.log(`Login page elements check -> Sidebar count: ${hasSidebar}, TopBar count: ${hasTopBar}, Login Form: ${hasLoginForm}`);
    if (hasSidebar === 0 && hasTopBar === 0 && hasLoginForm === 1) {
      results.loginFormRender = true;
      console.log('✅ PASS: Login page renders as clean full-screen portal (no leaked admin sidebar/header)');
      await page.screenshot({ path: 'scripts/screenshots/01-clean-login-page.png' });
    } else {
      console.error('❌ FAIL: Login page still contains leaked layout elements');
    }

    // ----------------------------------------------------
    // TEST 2: Perform Login
    // ----------------------------------------------------
    console.log('\n--- TEST 2: Performing Login as Admin ---');
    await page.fill('#email', 'admin@sde.com');
    await page.fill('#password', 'Admin@1234');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/admin', { timeout: 15000 });
    console.log(`Login submitted -> New URL: ${page.url()}`);
    if (page.url().endsWith('/admin')) {
      results.loginSuccess = true;
      console.log('✅ PASS: Login successful, redirected to /admin');
    }

    // Verify dashboard elements
    const overviewHeading = await page.locator('h1:has-text("Dashboard Overview")').count();
    const activeProductsCard = await page.locator('text=Active Products').count();
    const sidebarVisible = await page.locator('aside.admin-sidebar').isVisible();
    console.log(`Dashboard check -> Heading: ${overviewHeading}, Active Products: ${activeProductsCard}, Sidebar: ${sidebarVisible}`);

    if (overviewHeading > 0 && sidebarVisible) {
      results.dashboardOverview = true;
      console.log('✅ PASS: Admin Dashboard Overview renders full sidebar and metric cards');
      await page.screenshot({ path: 'scripts/screenshots/02-dashboard-overview.png' });
    }

    // ----------------------------------------------------
    // TEST 3: Price Update on Dashboard -> Reflection on Website
    // ----------------------------------------------------
    console.log('\n--- TEST 3: Price Update Reflection (Dashboard -> /today-cement-price) ---');
    
    // Check initial price in DB and public page
    const testProduct = await prisma.product.findFirst({
      where: { name: 'UltraTech OPC 53' },
      include: { brand: true, category: true }
    });
    if (!testProduct) throw new Error('UltraTech OPC 53 not found in DB');
    const originalPrice = Number(testProduct.currentPrice) || 410;
    const testNewPrice = originalPrice + 15; // e.g. 425

    console.log(`Target Product: "${testProduct.name}" | Current DB Price: ₹${originalPrice} | Test Target Price: ₹${testNewPrice}`);

    // Verify initial public website price
    const publicPage = await context.newPage();
    await publicPage.goto(`${BASE_URL}/today-cement-price`, { waitUntil: 'networkidle' });
    const initialPageText = await publicPage.content();
    const hasInitialPrice = initialPageText.includes(originalPrice.toString());
    console.log(`Public page /today-cement-price initial price check (₹${originalPrice}): ${hasInitialPrice ? 'Found' : 'Not found'}`);

    // Navigate to /admin/pricing
    console.log('Navigating to /admin/pricing in dashboard...');
    await page.goto(`${BASE_URL}/admin/pricing`, { waitUntil: 'networkidle' });
    await page.waitForSelector('input[placeholder*="Search"]');

    // Search for UltraTech OPC 53
    await page.fill('input[placeholder*="Search"]', 'UltraTech OPC 53');
    await page.waitForTimeout(1000);

    // Click "Update" button
    const editBtn = page.locator('button:has-text("Update")').first();
    await editBtn.click();
    await page.waitForTimeout(500);

    // Fill new price ₹testNewPrice
    const priceInput = page.locator('input[type="number"]').first();
    await priceInput.fill(testNewPrice.toString());

    // Click Save
    const saveBtn = page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await page.waitForTimeout(2000);
    console.log(`Saved new price ₹${testNewPrice} via Admin Pricing dashboard`);
    await page.screenshot({ path: 'scripts/screenshots/03-dashboard-price-updated.png' });

    // Check DB updated
    const updatedInDb = await prisma.product.findUnique({ where: { id: testProduct.id } });
    console.log(`Neon DB confirmed currentPrice: ₹${updatedInDb.currentPrice}`);

    // Now reload public page and check reflection
    console.log('Checking public page /today-cement-price for reflection...');
    await publicPage.goto(`${BASE_URL}/today-cement-price`, { waitUntil: 'networkidle' });
    await publicPage.waitForTimeout(1000);
    const updatedPageText = await publicPage.content();
    const hasUpdatedPrice = updatedPageText.includes(testNewPrice.toString());
    console.log(`Public page /today-cement-price shows new price ₹${testNewPrice}: ${hasUpdatedPrice ? 'YES! REFLECTED IMMEDIATELY' : 'NO'}`);
    
    if (hasUpdatedPrice) {
      results.priceUpdateReflected = true;
      console.log('✅ PASS: Price update in Dashboard is IMMEDIATELY REFLECTED on public website!');
      await publicPage.screenshot({ path: 'scripts/screenshots/04-public-cement-price-updated.png' });
    } else {
      console.error('❌ FAIL: Price update was not reflected on public page');
    }

    // Now REVERT the price back to original
    console.log('\n--- Reverting price back to original ₹' + originalPrice + ' ---');
    await page.goto(`${BASE_URL}/admin/pricing`, { waitUntil: 'networkidle' });
    await page.fill('input[placeholder*="Search"]', 'UltraTech OPC 53');
    await page.waitForTimeout(1000);
    await page.locator('button:has-text("Update")').first().click();
    await page.waitForTimeout(500);
    await page.locator('input[type="number"]').first().fill(originalPrice.toString());
    await page.locator('button:has-text("Save")').first().click();
    await page.waitForTimeout(2000);

    // Verify public page reverted
    await publicPage.goto(`${BASE_URL}/today-cement-price`, { waitUntil: 'networkidle' });
    const revertedPageText = await publicPage.content();
    const hasRevertedPrice = revertedPageText.includes(originalPrice.toString());
    if (hasRevertedPrice) {
      results.priceRevertedReflected = true;
      console.log(`✅ PASS: Price reverted back to ₹${originalPrice} and verified on website!`);
    }
    await publicPage.close();

    // ----------------------------------------------------
    // TEST 4: Categories, Brands & Products Management
    // ----------------------------------------------------
    console.log('\n--- TEST 4: Checking Admin Sections (Categories, Brands, Products) ---');
    await page.goto(`${BASE_URL}/admin/categories`, { waitUntil: 'networkidle' });
    const catHeading = await page.locator('h1:has-text("Categories")').count();
    const catRows = await page.locator('tbody tr').count();
    console.log(`Categories page -> Heading: ${catHeading}, Category Rows: ${catRows}`);
    results.categoriesPageLoaded = catHeading > 0 && catRows > 0;

    await page.goto(`${BASE_URL}/admin/brands`, { waitUntil: 'networkidle' });
    const brandHeading = await page.locator('h1:has-text("Brands")').count();
    const brandRows = await page.locator('tbody tr').count();
    console.log(`Brands page -> Heading: ${brandHeading}, Brand Rows: ${brandRows}`);
    results.brandsPageLoaded = brandHeading > 0 && brandRows > 0;

    await page.goto(`${BASE_URL}/admin/products`, { waitUntil: 'networkidle' });
    const prodHeading = await page.locator('h1:has-text("Products")').count();
    const prodRows = await page.locator('tbody tr').count();
    console.log(`Products page -> Heading: ${prodHeading}, Product Rows: ${prodRows}`);
    results.productsPageLoaded = prodHeading > 0 && prodRows > 0;

  } catch (error) {
    console.error('Test execution error:', error);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }

  console.log('\n========================================');
  console.log('📊 FINAL TEST RESULTS SUMMARY:');
  console.log('========================================');
  console.log('1. Auth Protection (/admin -> /admin/login):', results.authRedirect ? '✅ PASS' : '❌ FAIL');
  console.log('2. Clean Login Portal (No leaked layout):', results.loginFormRender ? '✅ PASS' : '❌ FAIL');
  console.log('3. Admin Authentication & Session:', results.loginSuccess ? '✅ PASS' : '❌ FAIL');
  console.log('4. Dashboard Overview & Navigation:', results.dashboardOverview ? '✅ PASS' : '❌ FAIL');
  console.log('5. Dashboard Price Edit -> Website Reflection:', results.priceUpdateReflected ? '✅ PASS' : '❌ FAIL');
  console.log('6. Price Revert -> Website Reflection:', results.priceRevertedReflected ? '✅ PASS' : '❌ FAIL');
  console.log('7. Categories Management UI:', results.categoriesPageLoaded ? '✅ PASS' : '❌ FAIL');
  console.log('8. Brands Management UI:', results.brandsPageLoaded ? '✅ PASS' : '❌ FAIL');
  console.log('9. Products Management UI:', results.productsPageLoaded ? '✅ PASS' : '❌ FAIL');
  console.log('========================================\n');
}

runE2ETests();
