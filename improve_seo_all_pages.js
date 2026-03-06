const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname);
const SITE_URL = "https://www.aaradhyaenviro.com";
const OG_IMAGE = `${SITE_URL}/assets/main-logo.png`;
const SITE_NAME = "Aaradhya Enviro";

function walkHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function toWebPath(fullPath) {
  const rel = path.relative(ROOT_DIR, fullPath).replace(/\\/g, "/");
  return rel.toLowerCase() === "index.html" ? "/" : `/${rel}`;
}

function toCanonicalUrl(webPath) {
  return webPath === "/" ? SITE_URL : `${SITE_URL}${webPath}`;
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

function getPageTitle(headHtml, fileName) {
  const titleMatch = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch && cleanText(titleMatch[1])) {
    return cleanText(titleMatch[1]);
  }

  const raw = fileName.replace(/\.html$/i, "").replace(/[-_]+/g, " ");
  const pretty = raw.replace(/\b\w/g, (ch) => ch.toUpperCase());
  return `${pretty} | ${SITE_NAME}`;
}

function getPageDescription(headHtml, title) {
  const descMatch = headHtml.match(
    /<meta\s+name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i
  );
  if (descMatch && cleanText(descMatch[1])) {
    return truncate(cleanText(descMatch[1]), 160);
  }

  return truncate(
    `${title.replace(/\s*\|\s*${SITE_NAME}$/i, "")} by ${SITE_NAME}. Explore expert environmental and fire safety solutions in Sambhajinagar, Maharashtra.`,
    160
  );
}

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function upsertMetaName(headHtml, name, content) {
  const escapedContent = escapeAttr(content);
  const pattern = new RegExp(
    `<meta\\s+name=["']${name}["'][^>]*>`,
    "i"
  );
  const tag = `<meta name="${name}" content="${escapedContent}">`;
  return pattern.test(headHtml)
    ? headHtml.replace(pattern, tag)
    : `${headHtml}\n    ${tag}`;
}

function upsertMetaProperty(headHtml, property, content) {
  const escapedContent = escapeAttr(content);
  const pattern = new RegExp(
    `<meta\\s+property=["']${property}["'][^>]*>`,
    "i"
  );
  const tag = `<meta property="${property}" content="${escapedContent}">`;
  return pattern.test(headHtml)
    ? headHtml.replace(pattern, tag)
    : `${headHtml}\n    ${tag}`;
}

function upsertCanonical(headHtml, canonicalUrl) {
  const escaped = escapeAttr(canonicalUrl);
  const pattern = /<link\s+rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${escaped}">`;
  return pattern.test(headHtml)
    ? headHtml.replace(pattern, tag)
    : `${headHtml}\n    ${tag}`;
}

function removeMetaName(headHtml, name) {
  const pattern = new RegExp(
    `\\s*<meta\\s+name=["']${name}["'][^>]*>\\s*`,
    "ig"
  );
  return headHtml.replace(pattern, "\n    ");
}

function processHtmlFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  const headMatch = original.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return false;

  const headHtml = headMatch[1];
  const webPath = toWebPath(filePath);
  const canonicalUrl = toCanonicalUrl(webPath);
  const title = getPageTitle(headHtml, path.basename(filePath));
  const description = getPageDescription(headHtml, title);
  let nextHead = headHtml;

  nextHead = upsertCanonical(nextHead, canonicalUrl);
  nextHead = upsertMetaName(nextHead, "description", description);
  nextHead = upsertMetaName(nextHead, "robots", "index, follow");
  nextHead = upsertMetaProperty(nextHead, "og:title", title);
  nextHead = upsertMetaProperty(nextHead, "og:description", description);
  nextHead = upsertMetaProperty(nextHead, "og:url", canonicalUrl);
  nextHead = upsertMetaProperty(nextHead, "og:type", "website");
  nextHead = upsertMetaProperty(nextHead, "og:site_name", SITE_NAME);
  nextHead = upsertMetaProperty(nextHead, "og:locale", "en_IN");
  nextHead = upsertMetaProperty(nextHead, "og:image", OG_IMAGE);
  nextHead = upsertMetaProperty(
    nextHead,
    "og:image:alt",
    `${SITE_NAME} - ${title.replace(/\s*\|\s*Aaradhya Enviro$/i, "")}`
  );
  nextHead = upsertMetaName(nextHead, "twitter:card", "summary_large_image");
  nextHead = upsertMetaName(nextHead, "twitter:title", title);
  nextHead = upsertMetaName(nextHead, "twitter:description", description);
  nextHead = upsertMetaName(nextHead, "twitter:image", OG_IMAGE);
  nextHead = upsertMetaName(nextHead, "twitter:site", "@aaradhyaenviro");
  nextHead = removeMetaName(nextHead, "twitter:creator");

  const updated = original.replace(headMatch[1], nextHead);
  if (updated === original) return false;

  fs.writeFileSync(filePath, updated, "utf8");
  return true;
}

function generateSitemap(htmlFiles) {
  const urls = htmlFiles
    .map((filePath) => {
      const webPath = toWebPath(filePath);
      const canonical = toCanonicalUrl(webPath);
      const stat = fs.statSync(filePath);
      const lastmod = stat.mtime.toISOString().slice(0, 10);
      return `  <url>\n    <loc>${canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${
        webPath === "/" ? "1.0" : "0.8"
      }</priority>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), xml, "utf8");
}

function generateRobotsTxt() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(ROOT_DIR, "robots.txt"), robots, "utf8");
}

function main() {
  const htmlFiles = walkHtmlFiles(ROOT_DIR);
  let updatedCount = 0;

  for (const filePath of htmlFiles) {
    if (processHtmlFile(filePath)) {
      updatedCount += 1;
    }
  }

  generateSitemap(htmlFiles);
  generateRobotsTxt();

  console.log(`Processed ${htmlFiles.length} HTML files.`);
  console.log(`Updated ${updatedCount} HTML files.`);
  console.log("Generated sitemap.xml and robots.txt.");
}

main();
