const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  if (!file) {
    return Promise.resolve(null);
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default fileToBase64;
