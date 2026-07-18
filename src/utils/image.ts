export function fileToCompressedDataUrl(
  file: File,
  maxWidth = 1400,
  quality = 0.82,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('Не удалось прочитать файл'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Не удалось декодировать изображение'))
      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width)
        const width = Math.round(image.width * scale)
        const height = Math.round(image.height * scale)

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas недоступен'))
          return
        }
        ctx.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      image.src = reader.result as string
    }

    reader.readAsDataURL(file)
  })
}
