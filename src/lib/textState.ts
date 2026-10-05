type StateValues = Record<string, { label: string; css: Record<string, string> }>

/** Colores y resaltados del editor. Se usa en el admin y en la página pública. */
export const textStateConfig: { color: StateValues } = {
  color: {
    'text-indigo': { label: 'Color · Indigo', css: { color: '#4f46e5' } },
    'text-pink': { label: 'Color · Pink', css: { color: '#db2777' } },
    'text-green': { label: 'Color · Green', css: { color: '#059669' } },
    'text-red': { label: 'Color · Red', css: { color: '#dc2626' } },
    'bg-yellow': {
      label: 'Highlight · Yellow',
      css: { 'background-color': '#fde68a', color: '#171a26', 'border-radius': '4px', padding: '0 3px' },
    },
    'bg-indigo': {
      label: 'Highlight · Indigo',
      css: { 'background-color': 'rgba(99, 102, 241, 0.16)', 'border-radius': '4px', padding: '0 3px' },
    },
    'bg-green': {
      label: 'Highlight · Green',
      css: { 'background-color': '#bbf7d0', color: '#171a26', 'border-radius': '4px', padding: '0 3px' },
    },
  },
}