import Swal, { type SweetAlertOptions } from 'sweetalert2'
import { useToast } from 'vue-toastification'

const toast = useToast()

/**
 * Show alert message success
 * @param {string} text message show alert
 */
const handleFinishSuccess = (text: string) => toast.success(text)

/**
 *
 * @param {string} infoError
 */
const handleFinishError = (infoError: string) => toast.error(infoError)

/**
 * Toast question
 * @author LeoVillalobos
 * @param {string} text
 * @param {string} title
 * @param {string} icon
 * @returns response confirm or cnacel action
 */
async function toastQuestion (text: string, title = '', icon = 'info') {
  const result = await Swal.fire({
    title,
    showDenyButton: true,
    icon,
    confirmButtonText: 'Confirmar',
    denyButtonText: `Cancelar`,
    confirmButtonColor: '#249e93',
    cancelButtonColor: '#c95252',
    customClass: 'sweetAlert-load sweetAlert2',
    html: `<h1><b>${text}</b></h1>`,
  } as SweetAlertOptions)
  if (result.isConfirmed) {
    return true
  } else if (result.isDenied) {
    return false
  }
}

/**
 *
 * @author LVillalobos
 * @param {string} title
 * @param {string} text
 * @returns
 */
function SwalLoad (title = '', text = '') {
  Swal.fire({
    title,
    text,
    imageUrl: '/gif/cargando.gif',
    showConfirmButton: false,
    allowOutsideClick: false,
    customClass: {
      popup: 'sweetAlert-load sweetAlert2', // Asigna la clase al popup
    },
  })
}

export { handleFinishError, handleFinishSuccess, SwalLoad, toastQuestion }
