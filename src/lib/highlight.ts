import { codeToHtml } from 'shiki'

const theme = 'github-dark-default'

/** HTML con el código coloreado según el lenguaje. Si el lenguaje no existe, lo muestra sin colores. */
export async function highlightCode(code: string, lang: string) {
  try {
    return await codeToHtml(code, { lang, theme })
  } catch {
    return await codeToHtml(code, { lang: 'text', theme })
  }
}