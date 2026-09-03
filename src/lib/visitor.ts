"use client";

/**
 * Identificador anónimo de dispositivo, usado ÚNICAMENTE para que el
 * botón de "like" sepa si este navegador ya dio like (evita duplicados
 * accidentales). El dato real —el conteo de likes y los comentarios—
 * SIEMPRE vive en la base de datos y es público para todos; esto no
 * almacena ningún contenido, solo un ID aleatorio sin información personal.
 */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  const KEY = "tekton_visitor_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
