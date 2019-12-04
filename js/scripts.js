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


/*for(i=0; i< repository.length; i++)
{
if (repository[i].height < 1.1 )
 {
  document.write(repository[i].name + "(" + "Height" + ":"  + repository[i].height + ")" + "<br>");
 }
 else
  {
   document.write(repository[i].name + "(" + "Height" + ":" + repository[i].height + ")" + "-" + "Wow, that's big!" + "<br>")
 }
}*/


  function add(pokemon) {
    repository.push(pokemon);
  }
  function getAll()  {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
}();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pidgeot"});


pokemonRepository.getAll ().forEach(function(repository){
  document.write((repository.name)  + "</br>");
});
