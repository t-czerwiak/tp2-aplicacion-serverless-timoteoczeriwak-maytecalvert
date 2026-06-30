import { describe, it, expect } from "vitest";
import {
  validateRegisterEmail,
  validatePassword,
  validateUsername,
  validateCommentInput,
} from "../lib/validation.js";

// --- validateRegisterEmail ---
describe("validateRegisterEmail", () => {
  it("acepta un email válido de Gmail", () => {
    const result = validateRegisterEmail("usuario@gmail.com");
    expect(result.valid).toBe(true);
  });

  it("rechaza un email sin @", () => {
    const result = validateRegisterEmail("usuariogmail.com");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/inválido/i);
  });

  it("rechaza un email que no es de Gmail", () => {
    const result = validateRegisterEmail("usuario@hotmail.com");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/Gmail/);
  });

  it("rechaza un string vacío", () => {
    const result = validateRegisterEmail("");
    expect(result.valid).toBe(false);
  });

  it("rechaza null", () => {
    const result = validateRegisterEmail(null);
    expect(result.valid).toBe(false);
  });
});

// --- validatePassword ---
describe("validatePassword", () => {
  it("acepta una contraseña con longitud suficiente", () => {
    const result = validatePassword("abcdef");
    expect(result.valid).toBe(true);
  });

  it("rechaza una contraseña muy corta", () => {
    const result = validatePassword("abc");
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/6/);
  });

  it("respeta un mínimo personalizado", () => {
    const result = validatePassword("abc", 3);
    expect(result.valid).toBe(true);
  });

  it("rechaza un string vacío", () => {
    const result = validatePassword("");
    expect(result.valid).toBe(false);
  });

  it("rechaza null", () => {
    const result = validatePassword(null);
    expect(result.valid).toBe(false);
  });
});

// --- validateUsername ---
describe("validateUsername", () => {
  it("acepta un username válido", () => {
    const result = validateUsername("timo_czer");
    expect(result.valid).toBe(true);
  });

  it("rechaza un username muy corto", () => {
    const result = validateUsername("ab");
    expect(result.valid).toBe(false);
  });

  it("rechaza un username muy largo", () => {
    const result = validateUsername("a".repeat(21));
    expect(result.valid).toBe(false);
  });

  it("rechaza caracteres especiales", () => {
    const result = validateUsername("mayte!!");
    expect(result.valid).toBe(false);
  });

  it("acepta letras, números y guion bajo", () => {
    const result = validateUsername("mayte_123");
    expect(result.valid).toBe(true);
  });

  it("rechaza null", () => {
    const result = validateUsername(null);
    expect(result.valid).toBe(false);
  });
});

// --- validateCommentInput ---
describe("validateCommentInput", () => {
  it("acepta un comentario válido", () => {
    const result = validateCommentInput("Qué linda foto");
    expect(result.valid).toBe(true);
  });

  it("rechaza un comentario vacío", () => {
    const result = validateCommentInput("");
    expect(result.valid).toBe(false);
  });

  it("rechaza un comentario de solo espacios", () => {
    const result = validateCommentInput("   ");
    expect(result.valid).toBe(false);
  });

  it("rechaza un comentario que supera el límite", () => {
    const result = validateCommentInput("a".repeat(501));
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/500/);
  });

  it("acepta un comentario justo en el límite", () => {
    const result = validateCommentInput("a".repeat(500));
    expect(result.valid).toBe(true);
  });
});
