import Image from './Image';
import checkImage from './utils';

export default class Input {
  constructor() {
    this.nameInput = document.querySelector('.img-name');
    this.urlInput = document.querySelector('.img-url');
    this.uploadButton = document.querySelector('.upload-button');
    this.imageContainer = document.querySelector('.img-container');
    this.errorElement = document.querySelector('.error');
    this.fileInput = document.querySelector('#file-input');
    this.dropArea = document.querySelector('.drop-area');
    this.formContainer = document.querySelector('.upload-form');
    this.selectButton = document.querySelector('.select-button');
  }

  init() {
    this.addListners();
  }

  addListners() {
    this.dropArea.addEventListener('click', () => {
      this.showForm();
    });

    this.dropArea.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });

    this.dropArea.addEventListener('drop', (evt) => {
      evt.preventDefault();
      this.dropInsertImage(evt);
    });

    this.fileInput.addEventListener('change', (evt) => {
      this.SelectInsertImage(evt);
    });

    this.uploadButton.addEventListener('click', (el) => {
      el.preventDefault();
      this.loadImage();
    });

    this.selectButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.fileInput.click();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.loadImage();
      }
    });

    this.nameInput.addEventListener('focus', () => this.removeError());
    this.urlInput.addEventListener('focus', () => this.removeError());
  }

  loadImage() {
    if (this.checkImageName()) {
      const url = this.urlInput.value;
      this.testLoadImg(url);
    }
  }

  dropInsertImage(event) {
    const { files } = event.dataTransfer;
    files.forEach((image) => {
      if (!checkImage(image)) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const { result } = reader;
        const newImage = new Image(image.name, result);
        this.insertImage(newImage);
      };
    });
  }

  SelectInsertImage(event) {
    const { files } = event.currentTarget;
    files.forEach((image) => {
      if (!checkImage(image)) {
        return;
      }
      const imageSrc = URL.createObjectURL(image);
      const newImage = new Image(image.name, imageSrc);
      this.insertImage(newImage);
      URL.revokeObjectURL(imageSrc);
    });
    this.hideForm();
  }

  insertFormImage(url) {
    const name = this.nameInput.value;
    const newImage = new Image(name, url);
    this.insertImage(newImage);
    this.clearInputs();
  }

  insertImage(newImage) {
    const imageEl = newImage.getImageElemennt();
    this.imageContainer.insertAdjacentElement('beforeend', imageEl);
    this.addRemoveListner(imageEl);
  }

  addRemoveListner(img) {
    img.querySelector('.remove-button').addEventListener('click', () => this.removeImage(img));
  }

  removeImage(img) {
    this.imageContainer.removeChild(img);
  }

  checkImageName() {
    if (this.nameInput.value === '') {
      this.showError(this.nameInput, 'Введите название');
      return false;
    }
    return true;
  }

  testLoadImg(url) {
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => this.insertFormImage(url);
    img.onerror = () => this.showError(this.urlInput, 'Неверный URL изображения');
  }

  showError(input, errorText) {
    this.errorElement.textContent = errorText;
    this.errorElement.style.left = `${input.offsetLeft + input.offsetWidth + 5}px`;
    this.errorElement.style.top = `${input.offsetTop - 4}px`;
    this.errorElement.classList.remove('hidden');
    setTimeout(() => this.removeError(), 2000);
  }

  removeError() {
    this.errorElement.classList.add('hidden');
  }

  clearInputs() {
    this.nameInput.value = '';
    this.urlInput.value = '';
    this.hideForm();
  }

  hideForm() {
    this.formContainer.classList.add('hidden');
    this.dropArea.classList.remove('hidden');
  }

  showForm() {
    this.formContainer.classList.remove('hidden');
    this.dropArea.classList.add('hidden');
  }
}
