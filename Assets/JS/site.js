const newDogButton = document.createElement('button');
newDogButton.type = 'button';
newDogButton.textContent = 'make new doge';

const dogStatus = document.createElement('p');
dogStatus.setAttribute('role', 'status');
dogStatus.setAttribute('aria-live', 'polite');

let dogImage;

async function loadRandomDog() {
  newDogButton.disabled = true;
  dogStatus.textContent = 'Loading a dog...';

  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!response.ok) {
      throw new Error(`Dog API returned ${response.status}`);
    }

    const data = await response.json();
    if (typeof data.message !== 'string') {
      throw new Error('Dog API response did not include an image URL');
    }

    if (!dogImage) {
      dogImage = document.createElement('img');
      dogImage.alt = 'Random Dog';
      dogImage.style.maxWidth = '300px';
      dogImage.addEventListener('error', () => {
        dogStatus.textContent = 'Could not load the dog image. Please try again.';
      });
      document.body.appendChild(dogImage);
    }

    dogImage.src = data.message;
    dogStatus.textContent = '';
  } catch (error) {
    console.error('Error fetching dog image:', error);
    dogStatus.textContent = 'Could not get a dog. Please try again.';
  } finally {
    newDogButton.disabled = false;
  }
}

newDogButton.addEventListener('click', loadRandomDog);
document.body.append(newDogButton, dogStatus);
loadRandomDog();
