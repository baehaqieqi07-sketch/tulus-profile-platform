import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const required = [
  'package.json', 'vite.config.js', 'index.html', '.env.example', 'README.md', 'BRAND_GUIDE.md',
  'CHATGPT_SAFE_UPDATE.md', 'SAFE_UPDATE_PROTOCOL.md', 'FULL_FEATURES.md', 'SECURITY_CHECKLIST.md',
  'SUPABASE_SETUP.md', 'PAYMENT_SETUP.md', 'AI_BEKIW_GUIDE.md', 'HELP_CENTER_GUIDE.md', 'PROJECT_MAP.md', 'UPDATE_LOCKS.md',
  'public/tulus-favicon.svg', 'src/main.jsx', 'src/App.jsx', 'src/styles.css',
  'src/components/Logo.jsx', 'src/components/BrandMark.jsx', 'src/components/AIChat.jsx', 'src/components/HelpCenter.jsx',
  'src/components/ProfilePreview.jsx', 'src/components/FileUploader.jsx', 'src/components/DashboardShell.jsx', 'src/components/Toast.jsx',
  'src/components/CommandPalette.jsx', 'src/components/NotificationCenter.jsx', 'src/components/MotionLayer.jsx',
  'src/pages/Landing.jsx', 'src/pages/Dashboard.jsx', 'src/pages/PublicProfile.jsx', 'src/pages/OwnerControl.jsx', 'src/pages/HelpCenterPage.jsx',
  'src/data/aiKnowledge.js', 'src/data/helpArticles.js', 'src/data/templates.js', 'src/data/apps.js', 'src/data/brand.js', 'src/data/plans.js',
  'src/utils/aiEngine.js', 'src/utils/validation.js', 'src/utils/storage.js', 'src/utils/seo.js', 'src/utils/analytics.js', 'src/utils/exportTools.js',
  'supabase/schema.sql', 'supabase/rls-policies.sql', 'supabase/storage-policies.sql', 'server/payment-webhook.js', 'scripts/pack.mjs'
];
const missing = required.filter((file) => !existsSync(join(process.cwd(), file)));
if (missing.length) {
  console.error('Missing required files:\n' + missing.join('\n'));
  process.exit(1);
}
console.log(`TULUS check passed: ${required.length} required files found.`);
