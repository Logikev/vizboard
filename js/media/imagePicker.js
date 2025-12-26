export async function pickImage(file) {
  return {
    type: "image",
    blob: file
  };
}
