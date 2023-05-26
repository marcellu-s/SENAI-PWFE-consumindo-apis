const wrapper = document.querySelector('.characters-wrapper');
const pagination = document.querySelectorAll('.pagination');

async function getData(page=1) {

    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

    const data = await response.json();

    return data;
}

async function showData(page=1) {

    const data = await getData(page);

    const results = data.results;
    const pages = data.info;

    wrapper.innerHTML = '';
    
    results.forEach(character => {
        
        let template = `
        <div class="character">
            <div class="character-image">
                <img src="${character.image}" alt="${character.name}">
                <span class="character-is-alive ${character.status}">${character.status}</span>
            </div>
            <div class="character-details">
                <p class="character-name">${character.name}</p>
                <p class="character-gender">${character.gender}</p>
                <p class="character-species">${character.species}</p>
            </div>
        </div>`;

        wrapper.innerHTML += template;
    });

    pagination.forEach((cada) => {

        cada.innerHTML = `
        <a href="${pages.prev == null ? '#' : pages.prev}" class="page"><</a>
        <a href="#" class="page atual">${page}</a>
        <a href="${pages.next}" class="page">></a>`;
    
        document.querySelectorAll('.page').forEach((pagina) => {
            
            pagina.addEventListener('click', (event) => {
                
                event.preventDefault();
    
                let link = pagina.href;
    
                link = link.split('page=');
    
                if (link[1]) {
    
                    showData(link[1]);
                }
            });
        });
    })
}

showData();