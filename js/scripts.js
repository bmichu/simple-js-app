var pokemonRepository = (function() {
	var repository = [];
	var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
	var $pokemonList = $(".pokemon-list");

	//adding new pokemon to var repository//
	function add(pokemon) {
		repository.push(pokemon);
	}

	function getAll() {
		return repository;
	}

	$(function() {
		$(document).scroll(function() {
			var $nav = $("#mainNav");
			$nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
		});
	});

	//function to add a list to each pokemon object//
	function addListItem(pokemon) {
		var listItem = $(
			'<button type="button" class="btn btn-secondary  btn-lg btn-block mt-2 mb-2" data-toggle="modal" data-target="#pokemon-modal"</button>'
		);
		listItem.text(pokemon.name);
		$pokemonList.append(listItem);
		listItem.on("click", function() {
			showDetails(pokemon);
		});
	}

	//funtion that loads pokemon list from API
	function loadList() {
		return $.ajax(apiUrl, {
			dataType: "json"
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
			dataType: "json"
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

	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function() {
			//creating modal
			var modal = $(".modal-body");
			var pokemonName = $(".modal-title").text(pokemon.name);
			var pokemonHeight = $('<p class="$heightElement"></p>').text(
				`Height: ${pokemon.height} m`
			);

			var pokemonWeight = $('<p class="pokemonWeight"></p>').text(
				`Weight:  ${pokemon.weight} kg`
			);

			var pokemonTypes = $('<p class="pokemonTypes"></p>').text(
				`Types:  ${pokemon.types}`
			);
			var pokemonImage = $('<img class="pokemonImage">');
			pokemonImage.attr("src", pokemon.imageUrl);

			if (modal.children().length) {
				modal.children().remove();
			}

			modal.append(pokemonImage);
			modal.append(pokemonHeight);
			modal.append(pokemonWeight);
			modal.append(pokemonTypes);
		});
	}
	$(document).ready(function() {
		$("#search").on("keyup", function() {
			var value = $(this)
				.val()
				.toLowerCase();
			$(".btn-secondary").filter(function() {
				$(this).toggle(
					$(this)
						.text()
						.toLowerCase()
						.indexOf(value) > -1
				);
			});
		});
	});

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
