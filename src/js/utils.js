export default function checkImage(file) {
  if (!file.type.startsWith('image/')) {
    return false;
  }
  return true;
}
