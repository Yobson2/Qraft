# Qraft - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available at [vercel.com](https://vercel.com))
- Node.js 20+ (for local testing)

---

## Method 1: Deploy with Vercel Dashboard (Recommended)

### Step 1: Push Code to Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/qraft.git
git push -u origin main
```

### Step 2: Import Project in Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your Qraft repository
4. Vercel will auto-detect Next.js configuration
5. Click **"Deploy"**

✅ **Done!** Your QR code generator is now live.

---

## Method 2: Deploy with Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
# Production deployment
vercel --prod

# Preview deployment (for testing)
vercel
```

---

## 🔧 Configuration Details

### Vercel Configuration (`vercel.json`)
The project includes optimized Vercel configuration:

```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_TELEMETRY_DISABLED": "1"
  },
  "headers": [
    // Security headers included
  ]
}
```

### Build Settings
- **Framework**: Next.js 15.5.4
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)
- **Node Version**: 20.x (recommended)

---

## 🌍 Environment Variables

### Required for Production
Currently, Qraft runs entirely client-side with no required environment variables.

### Optional Environment Variables
See [`.env.example`](.env.example) for future features:

```bash
# Application URL
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_USER_ACCOUNTS=false
NEXT_PUBLIC_MAX_QR_SIZE=1024
```

### Setting Environment Variables in Vercel
1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add variables for Production, Preview, and Development
4. Redeploy to apply changes

---

## 📦 Build Optimization

### Next.js Configuration
Located in `next.config.ts`:
- Static optimization enabled
- Image optimization configured
- Compression enabled by default

### Performance Features
- ✅ Automatic code splitting
- ✅ Edge function support
- ✅ Static asset caching
- ✅ Image optimization
- ✅ Gzip/Brotli compression

---

## 🔒 Security Headers

Pre-configured security headers in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### Adding Custom Domain Security
After adding a custom domain:
1. Enable SSL (automatic with Vercel)
2. Force HTTPS redirects (automatic)
3. Optional: Configure CAA DNS records

---

## 🌐 Custom Domain Setup

### Step 1: Add Domain in Vercel
1. Go to project **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `qraft.app`)

### Step 2: Configure DNS
Add these records at your domain registrar:

**For root domain (qraft.app):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Verify & Wait
- Verification: ~5 minutes
- SSL Certificate: ~10-30 minutes
- Full propagation: up to 48 hours

---

## 🐛 Troubleshooting

### Build Fails with TypeScript Errors
```bash
# Run local build to identify issues
npm run build

# Check for type errors
npx tsc --noEmit
```

### Build Timeout Issues
If build exceeds time limits:
1. Remove Turbopack flag (already removed in `package.json`)
2. Check for infinite loops in components
3. Optimize heavy computations

### Module Not Found Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Canvas/QR Code Generation Issues
- Ensure `qr-code-styling` is in `dependencies` (not `devDependencies`)
- Check browser compatibility for canvas operations
- Verify image CORS settings if using external logos

---

## 📊 Monitoring & Analytics

### Vercel Analytics
Enable in dashboard:
1. Go to **Analytics** tab
2. Enable Web Analytics
3. View real-time metrics

### Performance Monitoring
Monitor via Vercel dashboard:
- Build times
- Deployment frequency
- Function execution time
- Bandwidth usage

---

## 🔄 CI/CD Pipeline

### Automatic Deployments
Vercel automatically deploys on:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Preview Deployments
Each PR gets:
- Unique preview URL
- Full production environment
- Automatic cleanup after merge

### Branch Protection
Configure in GitHub:
```yaml
# Require build to pass before merge
branches:
  main:
    protection:
      required_status_checks:
        - Vercel
```

---

## 📈 Scaling Considerations

### Current Architecture
- **Hosting**: Vercel Edge Network
- **Rendering**: Client-side + Static generation
- **Assets**: Vercel CDN
- **Region**: US East (iad1)

### Future Scaling (When Adding Backend)
1. **Database**: Vercel Postgres or external DB
2. **Storage**: S3/DigitalOcean Spaces for QR codes
3. **Caching**: Redis for session management
4. **Functions**: Serverless functions for API routes

---

## 🆘 Support & Resources

### Vercel Documentation
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

### Qraft Architecture
- [CLAUDE.md](CLAUDE.md) - Project architecture guide
- [Clean Architecture Docs](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Getting Help
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Next.js Discord: [nextjs.org/discord](https://nextjs.org/discord)
- GitHub Issues: Create an issue in your repository

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Test QR code generation on production URL
- [ ] Verify all customization options work
- [ ] Test download functionality (PNG, SVG, JPEG)
- [ ] Check mobile responsiveness
- [ ] Test logo upload feature
- [ ] Verify preset styles load correctly
- [ ] Check page load performance (<2s)
- [ ] Test with different browsers
- [ ] Verify analytics tracking (if enabled)
- [ ] Set up custom domain (if applicable)
- [ ] Configure SSL certificate
- [ ] Test HTTPS redirects
- [ ] Review security headers
- [ ] Monitor initial error rates

---

## 🎯 Production Optimization Tips

### Performance
1. **Enable Vercel Speed Insights**
2. **Configure ISR** (Incremental Static Regeneration) for future dynamic pages
3. **Optimize images** - Use Next.js Image component
4. **Lazy load** heavy components (GradientPicker, etc.)

### SEO
1. **Update metadata** in `src/app/layout.tsx`
2. **Add sitemap**: Create `app/sitemap.ts`
3. **Add robots.txt**: Create `public/robots.txt`
4. **Schema markup** for QR generator

### User Experience
1. **Error boundaries** for graceful failures
2. **Loading states** for async operations
3. **Toast notifications** for user feedback
4. **Accessibility audit** with Lighthouse

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02 | Initial deployment setup |

---

**Ready to deploy?** Run `vercel --prod` or push to `main` branch! 🚀
