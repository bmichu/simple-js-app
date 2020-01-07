var pokemonRepository = (function() {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var ul = document.querySelector(".pokemon-list");

    function add(pokemon) {
        repository.push(pokemon);
    }

    function getAll() {
        return repository;
    }

    function addListItem(pokemon) {
        var button = document.createElement("button");
        var li = document.createElement("li");
        button.innerText = pokemon.name;
        button.classList.add("my-button");
        li.appendChild(button);
        ul.appendChild(li);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    function loadList(repository) {
        return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function(json) {
                json.results.forEach(function(item) {
                    var pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function(error) {
                console.error(error);
            });
    }

    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = Object.keys(details.types);
        }).catch(function(error) {
            console.error(error);
        });
    }

    function showDetails(repository) {
        pokemonRepository.loadDetails(repository).then(function() {
            console.log(repository);
        });
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
