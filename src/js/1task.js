import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import 'slim-select/dist/slimselect.css';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

// Приховати select.breed-select та div.cat-info, показати p.loader
breedSelect.style.display = 'none';
catInfo.style.display = 'none';
loader.style.display = 'block';

// Код, що виконується при завантаженні сторінки
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Приховати p.loader, показати select.breed-select
    breedSelect.style.display = 'block';
    loader.style.display = 'none';

    breedSelect.addEventListener('change', () => {
      const selectedBreedId = breedSelect.value;

      // Приховати div.cat-info, показати p.loader
      catInfo.style.display = 'none';
      loader.style.display = 'block';

      fetchCatByBreed(selectedBreedId)
        .then(cat => {
          catInfo.innerHTML = ''; // Очистити вміст блоку перед додаванням нової інформації

          const image = document.createElement('img');
          image.src = cat.url;
          image.classList.add('cat_img');
          catInfo.appendChild(image);

          const breedInfo = document.createElement('div');
          breedInfo.classList.add('breed-info');

          const breedName = document.createElement('p');
          breedName.textContent = `Breed: ${cat.breeds[0].name}`;
          breedName.classList.add('breed');
          breedInfo.appendChild(breedName);

          const description = document.createElement('p');
          description.textContent = `Description: ${cat.breeds[0].description}`;
          description.classList.add('description');
          breedInfo.appendChild(description);

          const temperament = document.createElement('p');
          temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
          temperament.classList.add('temperament');
          breedInfo.appendChild(temperament);

          catInfo.appendChild(breedInfo);

          // Приховати p.loader, показати div.cat-info
          catInfo.style.display = 'block';
          loader.style.display = 'none';
        })
        .catch(error => {
          const errorElement = document.querySelector('.error');
          errorElement.style.display = 'block';
          console.error(error);
        });
    });
  })
  .catch(error => {
    const errorElement = document.querySelector('.error');
    errorElement.style.display = 'block';
    console.error();
  });
