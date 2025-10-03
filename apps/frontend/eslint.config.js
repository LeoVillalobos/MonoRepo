import vuetify from 'eslint-config-vuetify'

// export default vuetify()

export default [
  ...vuetify(),
  {
    rules: {
      // Forzar a usar funciones flecha si quieres mantener tu estilo
      // 'func-style': ['error', 'expression'],

      // Prettier usará tu .prettierrc.json, aquí solo lo marcamos como error si no se cumple
      'prettier/prettier': 'error',
    },
  },
]
