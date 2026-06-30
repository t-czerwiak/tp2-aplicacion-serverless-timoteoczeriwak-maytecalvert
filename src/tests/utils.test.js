import { describe, it, expect } from "vitest";
import { isGmailAddress, validateComment, formatDate } from "../lib/utils.js";

// --- isGmailAddress ---
describe("isGmailAddress", () => {
  it("acepta un email válido de Gmail", () => {
    expect(isGmailAddress("usuario@gmail.com")).toBe(true);
  });

  it("rechaza un email de otro dominio", () => {
    expect(isGmailAddress("usuario@hotmail.com")).toBe(false);
  });

  it("rechaza un email de dominio similar pero no Gmail", () => {
    expect(isGmailAddress("usuario@gmail.com.ar")).toBe(false);
  });

  it("rechaza un string vacío", () => {
    expect(isGmailAddress("")).toBe(false);
  });

  it("rechaza null o undefined", () => {
    expect(isGmailAddress(null)).toBe(false);
    expect(isGmailAddress(undefined)).toBe(false);
  });

  it("es case-insensitive", () => {
    expect(isGmailAddress("Usuario@GMAIL.COM")).toBe(true);
  });
});

// --- validateComment ---
describe("validateComment", () => {
  it("acepta un comentario válido", () => {
    const result = validateComment("Qué linda foto del universo");
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
  });

  it("rechaza un string vacío", () => {
    const result = validateComment("");
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("rechaza un string solo de espacios", () => {
    const result = validateComment("   ");
    expect(result.valid).toBe(false);
  });

  it("rechaza un comentario que supera el límite de caracteres", () => {
    const largo = "a".repeat(501);
    const result = validateComment(largo);
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/500/);
  });

  it("acepta un comentario exactamente en el límite", () => {
    const justo = "a".repeat(500);
    const result = validateComment(justo);
    expect(result.valid).toBe(true);
  });

  it("respeta un límite personalizado", () => {
    const result = validateComment("hola", 3);
    expect(result.valid).toBe(false);
  });

  it("rechaza null", () => {
    const result = validateComment(null);
    expect(result.valid).toBe(false);
  });
});

// --- formatDate ---
describe("formatDate", () => {
  it("formatea una fecha ISO correctamente", () => {
    const result = formatDate("2024-03-15T10:00:00.000Z");
    expect(result).toContain("2024");
    expect(result).toContain("marzo");
  });

  it("devuelve string vacío para null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("devuelve string vacío para una fecha inválida", () => {
    expect(formatDate("no-es-una-fecha")).toBe("");
  });

  it("devuelve string vacío para un string vacío", () => {
    expect(formatDate("")).toBe("");
  });
});
