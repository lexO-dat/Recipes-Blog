require('../models/database');
const category = require('../models/category');
const recipe = require('../models/recipe');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

/*
 * GET /
 * HOME
*/
exports.home = async (req, res) => {
    try {
        const limit = 5;
        const categories = await category.find({}).limit(limit);
        const recipes = await recipe.find({}).sort({_id: -1}).limit(limit);
        const PlatosVegetarianos = await recipe.find({category: 'Platos Vegetarianos'}).sort({_id: -1}).limit(limit);
        const AperitivosyTapas = await recipe.find({category: 'Aperitivos y Tapas'}).sort({_id: -1}).limit(limit);
        const Almuerzos = await recipe.find({category: 'Almuerzos'}).sort({_id: -1}).limit(limit);
        const Desayunos = await recipe.find({category: 'Desayunos'}).sort({_id: -1}).limit(limit);
        const Repostería = await recipe.find({category: 'Repostería'}).sort({_id: -1}).limit(limit);
        const PlatosVeganos = await recipe.find({category: 'Platos Veganos'}).sort({_id: -1}).limit(limit);
        const Cenas = await recipe.find({category: 'Cenas'}).sort({_id: -1}).limit(limit);
        const Postres = await recipe.find({category: 'Postres'}).sort({_id: -1}).limit(limit);
        const ComidaFria = await recipe.find({category: 'Comida Fría'}).sort({_id: -1}).limit(limit);
        const ComidaCaliente = await recipe.find({category: 'Comida Caliente'}).sort({_id: -1}).limit(limit);
        const ComidaRapida = await recipe.find({category: 'Comida Rápida'}).sort({_id: -1}).limit(limit);

        const food = { recipes, PlatosVegetarianos, AperitivosyTapas, Almuerzos, Desayunos, Repostería, PlatosVeganos, Cenas, Postres, ComidaFria, ComidaCaliente, ComidaRapida };

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
    
    //alert('Debe rellenar todos los campos para enviar la receta.');
    try {
        res.render('submitRecipe',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - Submit',
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
        let payload = req.body;
        var imgUrl = '';
        if (req.file){
            imgUrl = `/uploads/${req.file.filename}`; // Assuming you have a file field called `image`
        }
        
        payload.img = imgUrl;

        console.log(payload);

        const newRecipe = new recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients, // Assuming ingredients is a comma-separated string
            category: req.body.category,
            img: payload.img, // Assign the string, not the entire payload object
        });

        await newRecipe.save();
        //alert('Receta enviada con éxito, redirigiendo a inicio.');
        res.redirect('/');
    } catch (error) {
        console.error(error);
        // Manejar el error según tus necesidades (puede enviar una respuesta de error al cliente, por ejemplo).
        res.redirect('/submitRecipe');
    }
};

/*
 * GET / enmantencion
 * 
*/

exports.enmantencion = async (req, res) => {
    try {
        res.render('enmantencion',
        {
            //pass in the title variable to the view
            title: 'CookingBlog - En Mantención'
        });
    } catch (error) {
        res.status(500).send({message: error.message || 'Error occurred'});
    }
};
