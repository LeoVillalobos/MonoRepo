import copy from 'copy-to-clipboard'

/**
 * Copia un texto al portapapeles de forma asíncrona.
 *
 * @param {string} text - El texto que se copiará al portapapeles.
 * @param {() => void} [callback] - (Opcional) Función que se ejecutará después de copiar exitosamente.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando el texto ha sido copiado.
 *
 * @example
 * copyToClipboard("Mi contraseña secreta", () => console.log("Texto copiado con éxito"));
 */
export async function copyToClipboard (text: string, callback?: () => void): Promise<void> {
  try {
    copy(text, {
      debug: true,
      message: 'Contraseña copiada',
    })

    if (callback) {
      callback()
    }
    // if (navigator.clipboard && navigator.clipboard.writeText) {
    //   // Usar la API moderna si está disponible (requiere HTTPS o localhost)
    //   await navigator.clipboard.writeText(text);
    //   if (callback) callback();
    // } else {
    //   // Fallback usando execCommand
    //   const textarea = document.createElement("textarea");
    //   textarea.value = text;
    //   // Asegúrate de que el textarea no afecte el layout
    //   textarea.style.position = "fixed";
    //   textarea.style.top = "-9999px";
    //   document.body.appendChild(textarea);
    //   textarea.select();
    //   try {
    //     document.execCommand("copy");
    //     if (callback) callback();
    //   } catch (errorExec) {
    //     console.error("Error al copiar usando execCommand:", errorExec);
    //   }
    //   document.body.removeChild(textarea);
    // }
  } catch (error) {
    console.error('Error al copiar al portapapeles', error)
  }
}
