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
]


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


  respiratory.forEach(function(detail){
  document.write(Object.values(detail) + "</br>");
}); 
