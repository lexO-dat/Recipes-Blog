let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let removeIngredientsBtn = document.getElementById('removeIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});

removeIngredientsBtn.addEventListener('click', function(){
  let ingredientDiv = document.querySelectorAll('.ingredeintDiv');
  if(ingredientDiv.length > 1){
    ingredientDiv[ingredientDiv.length-1].remove();
  }
});