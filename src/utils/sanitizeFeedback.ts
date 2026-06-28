/**
 * Sanitizes feedback text to remove PII (Personally Identifiable Information)
 * such as email addresses and Indonesian phone numbers.
 */
export function sanitizeFeedback(text: string): string {
  if (!text) return "";

  // 1. Remove email-like patterns
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  let sanitized = text.replace(emailRegex, "[EMAIL REMOVED]");

  // 2. Remove Indonesian phone-number-like patterns (mobile & landline)
  // Supports formats like: 081234567890, +62812-3456-7890, 0812 3456 7890, 0281-635123, etc.
  const phoneRegex = /(?:\+62|62|0)(?:\s|-|\()*[2-9]\d{1,2}(?:\s|-|\))*\d{3,4}(?:\s|-)*\d{3,5}/g;
  sanitized = sanitized.replace(phoneRegex, "[PHONE REMOVED]");

  // 3. Trim excessive spaces (replace multiple spaces/newlines with a single space)
  sanitized = sanitized.replace(/\s+/g, " ");

  return sanitized.trim();
}
