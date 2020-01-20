var pokemonRepository = (function() {
	var repository = [];
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	var $pokemonList = $('ul');
	var ul = $('.pokemon-list');
	var $modalContainer = $('#modal-container');

	//adding new pokemon to var repository//
	function add(pokemon) {
		repository.push(pokemon);
	}

	function getAll() {
		return repository;
	}

	//function to add a list to each pokemon object//
	function addListItem(pokemon) {
		var $li = $('<li></li>');
		$pokemonList.append($li);
		var $button = $(
			'<button type="button" class="my-button">' + pokemon.name + '</button>'
		);
		$li.append($button);
		$button.on('click', function() {
			showDetails(pokemon);
		});
	}

	//function to show details of each pokemon
	function showDetails(repository) {
		pokemonRepository.loadDetails(repository).then(function() {
			showModal(repository);
		});
	}

	//funtion that loads pokemon list from API
	function loadList() {
		return $.ajax(apiUrl, {
			dataType: 'json'
		})
			.then(function(responseJSON) {
				return responseJSON;
			})
			.then(function(json) {
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

	//loading details of each pokemon that is clicked
	function loadDetails(item) {
		var url = item.detailsUrl;
		return $.ajax(url, {
			dataType: 'json'
		})
			.then(function(responseJSON) {
				return responseJSON;
			})
			.then(function(details) {
				// Now we add the details to the item
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.weight = details.weight;
				//item.types = Object.keys(details.types);
				if (details.types.length == 2) {
					item.types = [details.types[0].type.name, details.types[1].type.name];
				} else {
					item.types = [details.types[0].type.name];
				}
			})
			.catch(function(error) {
				console.error(error);
			});
	}

	function showModal(item) {
		var modal = $('<div></div>');
		modal.addClass('modal');
		modal.css('display', 'center');
		// Clear all existing modal content

		// Add the new modal content
		var $closeButtonElement = $('<button type="button")></button>');
		$closeButtonElement
			.addClass('modal-close')
			.text('close')
			.on('click', hideModal);

		var $nameElement = $('h1.pokemonName');
		$nameElement.html(item.name);

		var $heightElement = $('<p class="height"></p>');
		$heightElement.html('Height: ' + item.height);

		var $weightElement = $('<p class="weight"></p>');
		$weightElement.html('Weight: ' + item.weight);

		var $imageElement = $('<img src ="' + item.imageUrl + '">');
		$imageElement.addClass('modal-img');

		var $typesElement = $('<p class="types"></p>');
		$typesElement.html('Type(s): ' + item.types);

		modal.append($nameElement);
		modal.append($imageElement);
		modal.append($heightElement);
		modal.append($weightElement);
		modal.append($typesElement);
		modal.append($closeButtonElement);
		$modalContainer.append(modal);

		$modalContainer.addClass('is-visible');
	}

	$('#modal-container').click(function() {
		hideModal();
	});
	$(document).keydown(function(e) {
		if (e.key === 'Escape') {
			hideModal();
		}
	});

	function hideModal() {
		$('#modal-container').removeClass('is-visible');
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal,
		hideModal: hideModal
	};
})();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
