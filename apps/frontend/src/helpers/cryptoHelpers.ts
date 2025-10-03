/**
 * Deriva una clave criptográfica a partir de la entrada del usuario utilizando PBKDF2 y un valor de sal.
 *
 * Este método utiliza un proceso de derivación de clave basado en el algoritmo PBKDF2 con el nombre de usuario y el valor de desbloqueo proporcionados por el usuario. El valor de sal (salt) es necesario para asegurar que la clave derivada sea única.
 * Luego, genera una clave criptográfica para AES-GCM, que se puede utilizar para cifrar y descifrar datos.
 *
 * @param {string} username - El nombre de usuario, utilizado junto con el valor de desbloqueo para derivar la clave.
 * @param {string} unlockValue - El valor de desbloqueo proporcionado por el usuario, combinado con el nombre de usuario para derivar la clave.
 * @param {Uint8Array} salt - Un valor de sal único para el usuario o para cada registro. Es utilizado para evitar ataques de diccionario y de "rainbow table".
 * @returns {Promise<CryptoKey | null>} - Una promesa que resuelve a un objeto `CryptoKey` derivado, o `null` si ocurrió un error en el proceso de derivación.
 *
 * @throws {Error} - Lanza un error si ocurre un problema en cualquier paso del proceso de derivación de la clave.
 *
 * @example
 * const username = "user@example.com";
 * const unlockValue = "password123";
 * const salt = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);
 *
 * const derivedKey = await deriveKeyFromUserInput(username, unlockValue, salt);
 * if (derivedKey) {
 *   console.log("Clave derivada:", derivedKey);
 * } else {
 *   console.log("Error al derivar la clave");
 * }
 */
// Importamos la librería CryptoJS
import CryptoJS from 'crypto-js'

/**
 * Encripta una contraseña en texto plano usando AES-CBC con CryptoJS.
 *
 * @param plainPassword - La contraseña en texto plano que se desea encriptar.
 * @param key - La clave derivada (WordArray) que se utilizará para la encriptación.
 * @returns Un objeto que contiene:
 *  - ciphertext: La contraseña encriptada en formato Base64.
 *  - iv: El vector de inicialización (IV) usado en la encriptación, en formato Base64.
 *  - authTag: El HMAC como autenticación, en formato Base64.
 *
 * @example
 * const { ciphertext, iv, authTag } = encryptPassword("miContraseña123", derivedKey);
 */
export function encryptPassword (plainPassword: string,
  key: CryptoJS.lib.WordArray): { ciphertext: string, iv: string, authTag: string } {
  // Generar un vector de inicialización (IV) aleatorio de 16 bytes (128 bits)
  const iv = CryptoJS.lib.WordArray.random(16)

  // Encriptar la contraseña usando AES en modo CBC con padding PKCS7
  const encrypted = CryptoJS.AES.encrypt(plainPassword, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })

  // Generar un HMAC (SHA-256) como autenticación para la integridad del mensaje
  const hmac = CryptoJS.HmacSHA256(encrypted.toString(), key)

  return {
    ciphertext: encrypted.toString(), // Base64
    iv: iv.toString(CryptoJS.enc.Base64), // IV en Base64
    authTag: hmac.toString(CryptoJS.enc.Base64), // HMAC en Base64
  }
}
/**
 * Deriva una clave de 256 bits a partir del usuario y un valor de desbloqueo usando PBKDF2.
 *
 * @param username - Nombre de usuario.
 * @param unlockValue - Valor de desbloqueo (por ejemplo, una clave secundaria).
 * @param saltBase64 - Salt en formato Base64.
 * @returns Clave derivada en formato WordArray (compatible con CryptoJS).
 */
export function deriveKeyFromUserInputJS (username: string,
  unlockValue: string,
  saltBase64: string): CryptoJS.lib.WordArray {
  // Convierte el salt de Base64 a WordArray
  const salt = CryptoJS.enc.Base64.parse(saltBase64)

  // Genera la clave derivada usando PBKDF2
  return CryptoJS.PBKDF2(username + unlockValue, salt, {
    keySize: 256 / 32, // 256 bits
    iterations: 100_000, // Seguridad estándar (ajustable)
    hasher: CryptoJS.algo.SHA256, // Hash SHA-256
  })
}
