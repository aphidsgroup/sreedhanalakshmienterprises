const { chromium } = require('playwright');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BASE_URL = 'http://localhost:3000';

async function testChangePasswordFlow() {
  console.log('🔐 Testing Change Password Feature with Playwright...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Initial Login
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle' });
    await page.fill('#email', 'admin@sde.com');
    await page.fill('#password', 'Admin@1234');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');
    console.log('✅ Initial login successful with Admin@1234');

    // 2. Go to Change Password
    await page.goto(`${BASE_URL}/admin/change-password`, { waitUntil: 'networkidle' });
    console.log('✅ Navigated to /admin/change-password');

    // 3. Test Invalid Current Password
    await page.fill('input[placeholder="Enter current password"]', 'WrongPassword123');
    await page.fill('input[placeholder="Minimum 8 characters"]', 'NewPass@2026#');
    await page.fill('input[placeholder="Re-enter new password"]', 'NewPass@2026#');
    await page.click('button[type="submit"]');
    await page.waitForSelector('text=The current password you entered is incorrect', { timeout: 5000 });
    console.log('✅ PASS: Rejected invalid current password properly');

    // 4. Test Password Mismatch
    await page.fill('input[placeholder="Enter current password"]', 'Admin@1234');
    await page.fill('input[placeholder="Minimum 8 characters"]', 'NewPass@2026#');
    await page.fill('input[placeholder="Re-enter new password"]', 'MismatchPass@2026#');
    await page.click('button[type="submit"]');
    await page.waitForSelector('text=do not match', { timeout: 5000 });
    console.log('✅ PASS: Rejected mismatched confirmation password properly');

    // 5. Test Successful Password Change
    await page.fill('input[placeholder="Enter current password"]', 'Admin@1234');
    await page.fill('input[placeholder="Minimum 8 characters"]', 'NewAdmin@2026!');
    await page.fill('input[placeholder="Re-enter new password"]', 'NewAdmin@2026!');
    await page.click('button[type="submit"]');
    await page.waitForSelector('text=Your password has been updated successfully', { timeout: 5000 });
    console.log('✅ PASS: Password change request succeeded with confirmation banner!');
    await page.screenshot({ path: 'scripts/screenshots/05-password-changed-success.png' });

    // 6. Sign Out
    console.log('\nTesting Login with Old vs New Password...');
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' });
    await page.click('button:has-text("Sign Out")');
    await page.waitForURL('**/admin/login');
    console.log('✅ Signed out');

    // 7. Verify Old Password Fails
    await page.fill('#email', 'admin@sde.com');
    await page.fill('#password', 'Admin@1234');
    await page.click('button[type="submit"]');
    await page.waitForSelector('text=Invalid email or password', { timeout: 5000 });
    console.log('✅ PASS: Old password (Admin@1234) is no longer accepted!');

    // 8. Verify New Password Succeeds
    await page.fill('#password', 'NewAdmin@2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin', { timeout: 5000 });
    console.log('✅ PASS: New password (NewAdmin@2026!) successfully authenticated and opened dashboard!');

    // 9. Revert password back to Admin@1234
    console.log('\nReverting password back to default Admin@1234 for user convenience...');
    await page.goto(`${BASE_URL}/admin/change-password`, { waitUntil: 'networkidle' });
    await page.fill('input[placeholder="Enter current password"]', 'NewAdmin@2026!');
    await page.fill('input[placeholder="Minimum 8 characters"]', 'Admin@1234');
    await page.fill('input[placeholder="Re-enter new password"]', 'Admin@1234');
    await page.click('button[type="submit"]');
    await page.waitForSelector('text=Your password has been updated successfully', { timeout: 5000 });
    console.log('✅ PASS: Reverted back to Admin@1234 cleanly');

    console.log('\n🎉 ALL PASSWORD CHANGE TESTS PASSED (100%)!');

  } catch (err) {
    console.error('❌ Test failed with error:', err);
  } finally {
    await browser.close();
    await prisma.$disconnect();
  }
}

testChangePasswordFlow();
