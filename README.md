# Aaradhya Enviro Website

## 🌐 Overview
Professional environmental consultancy services website for Aaradhya Enviro, based in Sambhajinagar (Aurangabad), Maharashtra, India.

## 📁 Project Structure
```
aaradhya-2/
├── assets/
│   ├── css/
│   │   ├── main.css          # Compiled Tailwind CSS
│   │   ├── main-source.css   # Source CSS for Tailwind
│   │   └── layout.css        # Carousel/layout styles
│   ├── js/
│   │   ├── main.js           # Main JavaScript module
│   │   └── main.min.js       # Minified version
│   ├── fonts/                # Web fonts
│   ├── gallery/              # Gallery images
│   ├── Clients/              # Client logos
│   ├── Products/             # Product images
│   └── images/               # General images
├── services/                 # Service pages (25 files)
├── scripts/                  # Build and utility scripts
├── *.html                    # Main pages (10 files)
├── sitemap.xml              # SEO sitemap
├── robots.txt               # Search engine directives
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm v7 or higher

### Installation
```bash
# Install dependencies
npm install

# Development mode (watch CSS changes)
npm run dev

# Production build (optimized)
npm run build
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Watch CSS changes in development

# Production
npm run build            # Build optimized CSS and minify JS
npm run css:build        # Build and minify CSS only
npm run js:minify        # Minify JavaScript only

# Utilities
npm run generate:sitemap # Generate sitemap.xml
npm run optimize:images  # Image optimization guide
```

## 🎨 Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS v3.4.17** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework dependencies
- **PostCSS** - CSS processing
- **Node.js** - Build tools

## 📊 Performance Targets

### Before Optimization
- Page Load: 3-4 seconds
- CSS Size: ~200KB
- Total Weight: 2-3MB
- Lighthouse Score: 65-75

### After Optimization
- Page Load: 1-1.5 seconds ⚡
- CSS Size: ~15-20KB 📉
- Total Weight: 500KB-1MB 🎯
- Lighthouse Score: 90-95 🏆

## ✅ Features

### Implemented
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized (meta tags, structured data)
- ✅ Accessibility features (ARIA, keyboard navigation)
- ✅ Mobile menu with focus trap
- ✅ Desktop dropdown menus
- ✅ Lazy loading images
- ✅ Form validation
- ✅ Skip navigation links
- ✅ Sitemap generation

### Pending
- ⏳ Image optimization (WebP conversion)
- ⏳ Service worker (offline support)
- ⏳ Progressive Web App features

## 🔧 Configuration

### Tailwind CSS
Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Breakpoints
- Plugins

### Build Process
Edit `package.json` scripts to modify:
- Build commands
- Output paths
- Optimization settings

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- Content Security Policy headers
- XSS protection
- CSRF protection on forms
- Input validation and sanitization
- Secure headers (.htaccess)

## 📈 SEO

- Comprehensive meta tags
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data
- Sitemap.xml
- robots.txt
- Canonical URLs
- Geo-location tags

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML5
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support
- Skip navigation links

## 📝 Content Management

### Adding a New Service Page
1. Copy an existing service page from `/services/`
2. Update meta tags (title, description, keywords)
3. Update JSON-LD structured data
4. Update page content
5. Add to navigation menu
6. Regenerate sitemap: `npm run generate:sitemap`

### Updating Images
1. Optimize images before uploading
2. Use WebP format with JPG/PNG fallback
3. Add `loading="lazy"` attribute
4. Include width and height attributes
5. Use descriptive alt text

## 🐛 Troubleshooting

### CSS not updating
```bash
# Clear cache and rebuild
rm -rf node_modules/.cache
npm run build
```

### JavaScript errors
- Check browser console
- Verify main.js is loaded
- Check for conflicting scripts

### Images not loading
- Verify file paths are correct
- Check file permissions
- Ensure images are in correct directory

## 📞 Support

For issues or questions:
- Email: aaradhyaenviro07@gmail.com
- Phone: 99759 29212
- Location: Sambhajinagar (Aurangabad), Maharashtra

## 📄 License

Copyright © 2024 Aaradhya Enviro. All rights reserved.

## 🔄 Version History

### Version 2.0.0 (Current)
- ✅ Consolidated JavaScript
- ✅ Optimized CSS build process
- ✅ Added accessibility features
- ✅ Generated sitemap
- ✅ Improved performance
- ✅ Enhanced SEO

### Version 1.0.0
- Initial website launch
- Basic HTML/CSS structure
- Service pages
- Contact form

## 📚 Documentation

- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Step-by-step setup
- [Content Fix Guide](CONTENT_FIX_GUIDE.md) - Content consistency fixes
- [Audit Report](AUDIT_REPORT.md) - Complete website audit

## 🎯 Next Steps

1. Complete manual implementation steps (see IMPLEMENTATION_GUIDE.md)
2. Fix content inconsistencies (see CONTENT_FIX_GUIDE.md)
3. Optimize images
4. Test across browsers
5. Deploy to production
6. Monitor performance

---

**Last Updated:** 2024
**Maintained by:** Aaradhya Enviro Development Team
