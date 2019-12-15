var pokemonRepository = function(){
var repository= [
{
  name:"Venusaur",
  weight:100,
  height:2,
  type:["grass","poison"]
},
{
  name:"Ivysaur",
  weight:13,
  height:1,
  type:["grass","poison"]
},
{
  name:"Bulbasaur",
  weight:6.9,
  height:0.7,
  type:["grass","poison"]
},
{
  name:"Charmeleon",
  weight:19,
  height:1.1,
  type:["fire"]
},
{
  name:"Wartortle",
  weight:22.5,
  height:1,
  type:["water"]
}
];

function addListItem(repository){
  var button = document.createElement("button");
  var li = document.createElement("li");
  button.innerText = repository.name;
  button.classList.add("my-button");
  li.appendChild(button);
  ul.appendChild(li);
  button.addEventListener("click",function(event){
    showDetails(repository.name);
  });
}

function showDetails(repository){
console.log(repository);
 }
  function add(pokemon) {
     repository.push(pokemon);
  }
   function getAll() {
     return repository;
   }

return {
    add: add,
    getAll: getAll,
   addListItem: addListItem

};
}
();
//console.log(pokemonRepository.getAll());
//pokemonRepository.add({ name: "Pidgeot" });
var ul = document.querySelector(".pokemon-list");

pokemonRepository.getAll().forEach(function(repository){
pokemonRepository.addListItem(repository);
});

//var button = document.querySelectorAll("button");
//for(var i=0; i< button.length; i++){
//button[i].addEventListener("click",
//function(repository){
//console.log(repository.name);
//});


//==== CHANGE  OF POKEMON  NAME COLOR ONCE CLICKED===

/*var button = document.querySelectorAll("button");
for(var i=0; i< button.length; i++){
button[i].addEventListener("click",
function(){
this.style.color = "green";
});
}*/
