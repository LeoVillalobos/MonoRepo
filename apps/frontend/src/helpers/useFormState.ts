// composables/useFormStateSimplified.ts
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useFormStateSimplified () {
  const route = useRoute()

  // console.log('route', route.params.id)

  return {
    isEditMode: computed(() => !!route.params),
    isLoading: ref(false),
    isSubmitting: ref(false),
  }
}
