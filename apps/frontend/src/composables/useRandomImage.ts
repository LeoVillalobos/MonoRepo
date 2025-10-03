export function useRandomImage (
  width = 200,
  height = 200,
  bgColor = '000',
  textColor = 'fff',
): string {
  const rand = 1984 // Math.floor(Math.random() * 1000); me gusta ese nuemero xd
  return `https://dummyimage.com/${width}x${height}/${bgColor}/${textColor}&text=${rand} `
}
