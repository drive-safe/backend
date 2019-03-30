"use strict";

module.exports = (_req, res, next) => {
  /**
   * This header improves the protection of web applications against
   * Clickjacking.
   */
  res.append("X-Frame-Options", "deny");

  /**
   * This header enables the Cross-site scripting (XSS) filter in the browser.
   */
  res.append("X-XSS-Protection", "1; mode=block");

  /**
   * This header will prevent the browser from interpreting files as something
   * else than declared by the content type in the HTTP headers.
   */
  res.append("X-Content-Type-Options", "nosniff");

  /**
   * This header prevents a wide range of attacks, including XSS and other
   * cross-site injections.
   */
  res.append("Content-Security-Policy", "script-src 'self'; object-src 'self'");

  /**
   * A cross-domain policy file is an XML document that grants a web client,
   * such as Adobe Flash Player or Adobe Acrobat (though not necessarily limited
   * to these), permission to handle data across domains. When clients request
   * content hosted on a particular source domain and that content make requests
   * directed towards a domain other than its own, the remote domain needs to
   * host a cross-domain policy file that grants access to the source domain,
   * allowing the client to continue the transaction. Normally a meta-policy is
   * declared in the master policy file, but for those who can’t write to the
   * root directory, they can also declare a meta-policy using the
   * X-Permitted-Cross-Domain-Policies HTTP response header.
   */
  res.append("X-Permitted-Cross-Domain-Policies", "none");

  /**
   * The header governs which referrer information, sent in the Referer header,
   * should be included with requests made.
   */
  res.append("Referrer-Policy", "no-referrer");

  next();
};
