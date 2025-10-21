# Google Drive Link Converter

A React app that converts Google Drive sharing links to direct download links.

## Deployment to Cloudflare Pages

### Method 1: Using GitHub
1. Push this project to a GitHub repository
2. Go to Cloudflare Dashboard → Pages → Create a new project
3. Connect your GitHub repository
4. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `build`
5. Click "Deploy"

### Method 2: Using Wrangler CLI
1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Build the project: `npm run build`
4. Deploy: `wrangler pages publish build/`

### Local Development
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

## Features
- Convert Google Drive sharing links to direct download links
- Copy to clipboard functionality
- Responsive design
- Multiple URL format support
