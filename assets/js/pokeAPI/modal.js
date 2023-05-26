const modalElement = document.querySelector('#modal');
const fade = document.querySelector('#fade');

const toggleModal = () => [modalElement, fade].forEach((el) => { el.classList.toggle('hide') });

fade.addEventListener('click', function () {
    toggleModal()
});

function alterModalDatils(pokemon) {
    /**
     * Alteração as informações da modal com os detalhes do pokemon selecionado
     */

    // Pegando os status
    const stats = new Map();

    pokemon.stats.forEach(stat => {

        stats.set(stat.stat.name, stat.base_stat);
    });

    let types = pokemon.types.map((slot) => slot.type.name);
    let [ primaryType ] = types;
    
    const modalTemplate = `
    <div class="up-side ${primaryType}">
        <div class="modal-pokemon-details">
            <div class="modal-pokemon-details-name-id">
                <span class="modal-id">#${pokemon.id}</span>
                <span class="modal-name">${pokemon.name}</span>
            </div>
            <div class="modal-pokemon-details-types">
                ${types.map(type => `<span class="type ${type}">${type}</span>`).join(' ')}
            </div>
        </div>
        <div class="pokemon-sprite">
            <img src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="">
        </div>
    </div>
    <div class="pokemon-stats">
        <p>Status base</p>
        <div class="stats">
            <div class="stats-item">
                <span>HP - ${stats.get('hp')}</span>
                <div class="hp-bar"><div class="bar-progress grass" style="width: ${stats.get('hp')}%;"></div></div>
            </div>
            <div class="stats-item">
                <span>ATK - ${stats.get('attack')}</span>
                <div class="atk-bar"><div class="bar-progress grass" style="width: ${stats.get('attack')}%;"></div></div>
            </div>
            <div class="stats-item">
                <span>DEF - ${stats.get('defense')}</span>
                <div class="def-bar"><div class="bar-progress grass" style="width: ${stats.get('defense')}%;"></div></div>
            </div>
            <div class="stats-item">
                <span>SP-ATK - ${stats.get('special-attack')}</span>
                <div class="def-bar"><div class="bar-progress grass" style="width: ${stats.get('special-attack')}%;"></div></div>
            </div>
            <div class="stats-item">
                <span>SP-DEF - ${stats.get('special-defense')}</span>
                <div class="def-bar"><div class="bar-progress grass" style="width: ${stats.get('special-defense')}%;"></div></div>
            </div>
            <div class="stats-item">
                <span>SPEED - ${stats.get('speed')}</span>
                <div class="def-bar"><div class="bar-progress grass" style="width: ${stats.get('speed')}%;"></div></div>
            </div>
        </div>
    </div>`;

    document.querySelector('.modal-body').innerHTML = modalTemplate;
}

function modal() {
    /**
     * Modal com detalhes do pokemon
     */

    const openModalButton = document.querySelectorAll('.pokemon-card');

    openModalButton.forEach(el => el.addEventListener('click', async function() {
        /**
         * Pegar o ID do pokemon para receber detalhes do mesmo na modal
         */

        document.querySelector('.modal-body').innerHTML = '';

        // Pega o ID do pokemon
        const id = this.querySelector('.pokemon-id').textContent.replace(/[^0-9]/, '');

        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())

            .then((result) => alterModalDatils(result))

            .catch((error) => console.log(error));

        // Abre a modal
        toggleModal();
    }));
}