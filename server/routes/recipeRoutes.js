const express = require('express');
const router = express.Router();

//link the route to the controller
const recipeController = require('../controllers/recipeController');

/*
* app routes
*/
router.get('/', recipeController.home);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesbyId);
router.get('/recipe/:id', recipeController.exploreRecipes);
router.post('/search', recipeController.searchRecipes);
router.get('/ExploreLatest', recipeController.exploreLatest);
router.get('/exploreRandom', recipeController.exploreRandom);
router.get('/submitRecipe', recipeController.submitRecipe);
router.post('/submitRecipe', recipeController.submitRecipePost);



module.exports = router;

