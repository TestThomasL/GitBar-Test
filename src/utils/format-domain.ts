const formatDomain = (domain: string): string => {
  const hasHttps = domain.includes("https://");
  const hasHttp = domain.includes("http://");
  if (!hasHttps && !hasHttp) {
    return `https://${domain}`;
  }
  return domain;
};

export default formatDomain;
