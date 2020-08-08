export default class Image {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }

  getImageElemennt() {
    const img = document.createElement('div');
    img.className = 'img-box';
    img.innerHTML = `
      <img src="${this.url}" alt="${this.name}" class="img">
      <div class="remove-button">X</div>
    `;
    return img;
  }
}
