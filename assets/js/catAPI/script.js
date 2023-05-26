const press = document.querySelector('.cat-api-area #div-press');
const noPress = document.querySelector('.cat-api-area #div-no-press');
const catAPIArea = document.querySelector('.cat-api-area');

var onLoading = false;

async function getCatImage() {

    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    
    const data = await response.json();

    return data;
}

async function showCatImage() {

    do {

        var data = await getCatImage();

    } while (data[0].height > data[0].width);

    catAPIArea.style.backgroundImage = `url('${data[0].url}')`;

    onLoading = false;
}

window.addEventListener('mousedown', () => {
    
    noPress.style.cssText = 'z-index: 1';
    press.style.cssText = 'z-index: 2';

    if (!onLoading) {

        onLoading = true;
        setTimeout(showCatImage, 1500);
    }
});

window.addEventListener('mouseup', () => {

    noPress.style.cssText = 'z-index: 2';
    press.style.cssText = 'z-index: 1';
})

showCatImage();