const validateDomain = (domain: string): boolean =>
  /^(https:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.exec(domain) !== null;

export default validateDomain;
