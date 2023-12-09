require('../models/database');
const category = require('../models/category');
const recipe = require('../models/recipe');

/*
 * GET /
 * HOME
*/
exports.home = async (req, res) => {
    try {
        const limit = 5;
        const categories = await category.find({}).limit(limit);
        const recipes = await recipe.find({}).sort({_id: -1}).limit(limit);
        const Thai = await recipe.find({category: 'Thai'}).sort({_id: -1}).limit(limit);
        const American = await recipe.find({category: 'American'}).sort({_id: -1}).limit(limit);
        const Chinese = await recipe.find({category: 'Chinese'}).sort({_id: -1}).limit(limit);
        const Mexican = await recipe.find({category: 'Mexican'}).sort({_id: -1}).limit(limit);
        const Chilean = await recipe.find({category: 'Chilean'}).sort({_id: -1}).limit(limit);
        const Japanese = await recipe.find({category: 'Japanese'}).sort({_id: -1}).limit(limit);

        const food = { recipes, Thai, American, Chinese, Mexican, Chilean, Japanese };

        res.render('index',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - Home',

            //pass in the categories variable to the view
            categories,

            //pass in the recipes variable to the view
            food
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};

/*
 * GET / CATEGORIES
 * 
*/
exports.exploreCategories = async (req, res) => {

    try {
        const limit = 20;
        const categories = await category.find({}).limit(limit);

        res.render('categories',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - All Categories',

            //pass in the categories variable to the view
            categories
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};

/*
 * GET / CATEGORIES/:id
 * 
*/
exports.exploreCategoriesbyId = async (req, res) => {

    try {
        let categoryId = req.params.id;
        const limit = 20;
        const categorieById = await recipe.find({ 'category': categoryId }).limit(limit);

        res.render('categories',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - Categories',

            //pass in the categories variable to the view
            categorieById
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};

/*
 * GET / RECIPES/:id
 * 
*/
exports.exploreRecipes = async (req, res) => {

    try {
        let recipeId = req.params.id;

        const recipes = await recipe.findById(recipeId);

        res.render('recipes',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - Recipe',

            //pass in the recipes variable to the view
            recipes
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};

/*
 * POST / SEARCH
 * 
*/
exports.searchRecipes = async (req, res) => {

    try {
        let search = req.body.search;
        let recipess = await recipe.find({ $text: { $search: search, $diacriticSensitive: true } });

        res.render('search', { title: 'CookingBlog - Search', recipess });
    } catch (error) {
        res.send({message: error.message || 'Error occurred'});
    }
};

/*
 * GET / exploreLatest
 * 
*/
exports.exploreLatest = async (req, res) => {
    try {
        const limit = 20;
        const recipes = await recipe.find({}).sort({_id: -1}).limit(limit);

        res.render('exploreLatest',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - Latest',

            //pass in the recipes variable to the view
            recipes
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};

/*
 * GET / exploreRandom
 * 
*/
exports.exploreRandom = async (req, res) => {

    try {
        let count = await recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipes = await recipe.findOne().skip(random).exec();

        res.render('explorerandom',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - Random Recipe',

            //pass in the recipes variable to the view
            recipes
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};

/*
 * GET / submitRecipe
 * 
*/
exports.submitRecipe = async (req, res) => {

    try {
        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');


        res.render('submitRecipe',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - Submit',
            infoErrorsObj,
            infoSubmitObj
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};

/*
 * POST / submitRecipe
 * 
*/
exports.submitRecipePost = async (req, res) => {

    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0) {
            req.flash('infoErrors', 'No files were uploaded.');
            return res.redirect('/submitRecipe');
        }else{
            imageUploadFile = req.files.imgage;
            newImageName = Date.now() + imageUploadFile.name;
            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            imageUploadFile.mv(uploadPath, function(err) {
                if (err){
                    req.flash('infoErrors', err.message);
                    return res.redirect('/submitRecipe');
                }
            });
        }
        const newRecipe = new recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            img: req.body.newImageName
        });

        await newRecipe.save();
        req.flash('infoSubmit', 'Thank you for submitting your recipe!');
        res.redirect('/submitRecipe');
    } catch (error) {
        req.flash('infoErrors', error.message);
        res.redirect('/submitRecipe');
    }
};