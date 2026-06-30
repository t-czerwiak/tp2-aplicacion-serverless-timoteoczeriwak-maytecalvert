/**
 * Valida que un email sea de Gmail.
 * @param {string} email
 * @returns {boolean}
 */
export function isGmailAddress(email) {
  if (!email || typeof email !== "string") return false;
  return email.trim().toLowerCase().endsWith("@gmail.com");
}

/**
 * Valida que el contenido de un comentario no esté vacío ni exceda el límite.
 * @param {string} content
 * @param {number} maxLength
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateComment(content, maxLength = 500) {
  if (!content || typeof content !== "string") {
    return { valid: false, error: "El comentario no puede estar vacío." };
  }
  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "El comentario no puede estar vacío." };
  }
  if (trimmed.length > maxLength) {
    return { valid: false, error: `El comentario no puede superar los ${maxLength} caracteres.` };
  }
  return { valid: true, error: null };
}

/**
 * Formatea una fecha ISO a formato legible.
 * @param {string} isoString
 * @returns {string}
 */
export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
