import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Trouve ton artisan";

function ensureMetaTag(selector, attributes) {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    tag.setAttribute(attributeName, attributeValue);
  });
}

function ensureLinkTag(selector, attributes) {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("link");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    tag.setAttribute(attributeName, attributeValue);
  });
}

function buildAbsoluteUrl(baseUrl, value) {
  if (!value) {
    return "";
  }

  return new URL(value, baseUrl).toString();
}

export default function Seo({
  title,
  description,
  noIndex = false,
  image,
  type = "website",
  canonicalPath,
}) {
  const location = useLocation();

  useEffect(() => {
    const configuredSiteUrl = process.env.REACT_APP_SITE_URL?.trim();
    const fallbackOrigin = window.location.origin;
    const siteUrl = configuredSiteUrl || fallbackOrigin;
    const canonicalUrl = buildAbsoluteUrl(
      siteUrl,
      canonicalPath || `${location.pathname}${location.search}`,
    );
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const robotsContent = noIndex ? "noindex, nofollow" : "index, follow";

    document.title = pageTitle;

    ensureMetaTag('meta[name="description"]', {
      name: "description",
      content: description,
    });
    ensureMetaTag('meta[name="robots"]', {
      name: "robots",
      content: robotsContent,
    });
    ensureMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    ensureMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    ensureMetaTag('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    ensureMetaTag('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    ensureMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: image ? "summary_large_image" : "summary",
    });
    ensureMetaTag('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });
    ensureMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    ensureLinkTag('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    if (image) {
      const imageUrl = buildAbsoluteUrl(siteUrl, image);

      ensureMetaTag('meta[property="og:image"]', {
        property: "og:image",
        content: imageUrl,
      });
      ensureMetaTag('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: imageUrl,
      });
    }
  }, [canonicalPath, description, image, location.pathname, location.search, noIndex, title, type]);

  return null;
}
