const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword() {
  const newPassword = process.argv[2] || 'Admin@1234';

  if (newPassword.length < 8) {
    console.error('❌ Error: Password must be at least 8 characters long.');
    process.exit(1);
  }

  console.log(`🔑 Resetting admin password to: "${newPassword}"...`);

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await prisma.user.upsert({
      where: { email: 'admin@sde.com' },
      update: { password: hashedPassword },
      create: {
        email: 'admin@sde.com',
        name: 'SDE Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log(`✅ SUCCESS: Admin password for ${user.email} has been reset.`);
    console.log(`👉 You can now log in at /admin/login with your new password.`);
  } catch (err) {
    console.error('❌ Failed to reset password:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
