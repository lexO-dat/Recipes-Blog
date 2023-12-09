Libraries used:
-> connect-flash: 0.1.1
-> cookie-parser: 1.4.6
-> dotenv: 16.3.1
-> ejs: 3.1.9
-> express: 4.18.2
-> express-ejs-layouts: 2.5.1
-> express-fileupload: 1.4.3
-> express-session: 1.17.3
-> mongodb: 6.3.0
-> mongoose: 8.0.3

additionally:
-> Node.js on its latest version.
-> Bootstrap in version 5.3 using all the CDN links on the ejs files.

The mean goal for this proyect it was to do an Blog website with the posibility of upload your own recipes with an title, description, list of ingredients and a photo.
To do it i used an upload image system and mongodb for the schema database system.

On the current version (the first one i upload) i have to fix the bug on the submit page, because it has to send an error message if you dont fill out the form or it has to send a success message telling you that the recipe its succesfully uploaded.
Also this version has no photos on the database, are just to test if its everything  working ok :)
