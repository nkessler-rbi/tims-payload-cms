// Node loader hooks: return an empty module for CSS/SCSS imports so the
// Payload CLI (tsx-based) can load the config without a real bundler.
export async function load(url, context, nextLoad) {
  if (/\.(s?css|sass|less)(\?|#|$)/.test(url)) {
    return {
      format: 'module',
      shortCircuit: true,
      source: 'export default {}',
    }
  }
  return nextLoad(url, context)
}
