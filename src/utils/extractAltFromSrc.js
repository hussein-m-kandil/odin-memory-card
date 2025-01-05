export function extractAltFromSrc(imgSrc) {
  const alt = imgSrc.split('/').at(-2).replaceAll(/%|_|-/g, ' ');
  return alt ? `${alt[0].toUpperCase()}${alt.slice(1) || ''}` : null;
}

export default extractAltFromSrc;
