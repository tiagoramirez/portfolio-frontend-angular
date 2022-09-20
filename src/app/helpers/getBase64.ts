// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getBase64 = async ($event: any) => await new Promise((resolve, reject) => {
  try {
    const reader = new FileReader()
    reader.readAsDataURL($event)
    reader.onload = () => {
      resolve({
        base: reader.result
      })
    }
    // eslint-disable-next-line n/handle-callback-err
    reader.onerror = error => {
      resolve({
        base: null
      })
    }
  } catch (e) {
    return null
  }
})
