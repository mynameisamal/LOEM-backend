import app from './src/app.js';
import { env } from './src/config/env.js';
import { pingDb } from './src/config/db.js';

async function start() {
  try {
    await pingDb();
    console.log('✅ Database connected');

    app.listen(env.port, () => {
      console.log(`🚀 LOEM API running on port ${env.port}`);
    });
  } catch (err) {
    console.error('❌ Server failed:', err);
    process.exit(1);
  }
}

start();
