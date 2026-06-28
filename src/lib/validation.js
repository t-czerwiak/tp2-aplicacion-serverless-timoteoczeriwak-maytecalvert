/**
 * Valida que un email tenga formato correcto y sea de Gmail.
 * Regla de negocio del registro: solo se aceptan cuentas @gmail.com
 * @param {string} email
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateRegisterEmail(email) {
  if (!email || typeof email !== "string") {
    return { valid: false, error: "El email es obligatorio." };
  }
  const trimmed = email.trim();
  if (!trimmed.includes("@")) {
    return { valid: false, error: "Email inválido." };
  }
  if (!trimmed.toLowerCase().endsWith("@gmail.com")) {
    return { valid: false, error: "Solo se aceptan cuentas de Gmail (@gmail.com)." };
  }
  return { valid: true, error: null };
}

/**
 * Valida que una contraseña cumpla el mínimo de seguridad.
 * @param {string} password
 * @param {number} minLength
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validatePassword(password, minLength = 6) {
  if (!password || typeof password !== "string") {
    return { valid: false, error: "La contraseña es obligatoria." };
  }
  if (password.length < minLength) {
    return { valid: false, error: `La contraseña debe tener al menos ${minLength} caracteres.` };
  }
  return { valid: true, error: null };
}

/**
 * Valida que un nombre de usuario sea válido para el perfil.
 * @param {string} username
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateUsername(username) {
  if (!username || typeof username !== "string") {
    return { valid: false, error: "El nombre de usuario es obligatorio." };
  }
  const trimmed = username.trim();
  if (trimmed.length < 3) {
    return { valid: false, error: "El nombre de usuario debe tener al menos 3 caracteres." };
  }
  if (trimmed.length > 20) {
    return { valid: false, error: "El nombre de usuario no puede superar los 20 caracteres." };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { valid: false, error: "El nombre de usuario solo puede tener letras, números y guion bajo." };
  }
  return { valid: true, error: null };
}

/**
 * Valida que el contenido de un comentario sea válido antes de enviarlo.
 * @param {string} content
 * @param {number} maxLength
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateCommentInput(content, maxLength = 500) {
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
