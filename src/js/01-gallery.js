import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join('');
}

galleryList.addEventListener('click', selectImage);

function selectImage(e) {
  if (e.target.nodeName !== 'IMG') return;

  e.preventDefault();

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}">`,
    {
      onShow: instance => {
        document.addEventListener('keyup', escapeCloseFunction);
      },
      onClose: instance => {
        document.removeEventListener('keyup', escapeCloseFunction);
      },
    }
  );

  function escapeCloseFunction(e) {
    if (e.key === 'Escape') instance.close();
  }

  instance.show();
}
