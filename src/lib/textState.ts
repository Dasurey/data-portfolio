type StateValues = Record<string, { label: string; css: Record<string, string> }>

const pill = { 'border-radius': '5px', padding: '1px 6px' }

/** Colores de texto y resaltados del editor. Son dos estados: se pueden combinar en la misma palabra. */
export const textStateConfig: { color: StateValues; highlight: StateValues } = {
  color: {
    'text-code': { label: 'Pink (code) · #e83e8c', css: { color: '#e83e8c' } },
    'text-indigo': { label: 'Indigo · #4f46e5', css: { color: '#4f46e5' } },
    'text-green': { label: 'Green', css: { color: '#059669' } },
    'text-red': { label: 'Red', css: { color: '#dc2626' } },
    'text-muted': { label: 'Gray', css: { color: '#6b7385' } },
  },
  highlight: {
    'bg-code': { label: 'Soft indigo (code style)', css: { 'background-color': 'rgba(99, 102, 241, 0.08)', ...pill } },
    'bg-indigo': { label: 'Indigo', css: { 'background-color': 'rgba(99, 102, 241, 0.16)', ...pill } },
    'bg-yellow': { label: 'Yellow', css: { 'background-color': '#fde68a', color: '#171a26', ...pill } },
    'bg-green': { label: 'Green', css: { 'background-color': '#bbf7d0', color: '#171a26', ...pill } },
  },
}