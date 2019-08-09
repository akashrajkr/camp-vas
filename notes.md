
#Adding /post routes
app.post('/campgrounds', (req, res) => {
    //get data from form and add to the campgrounds array
    //redirect back to campgrounds page
    res.send('you sent a post request')
})

#body-parser for POST requests

To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser
body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
The middleware was a part of Express.js earlier but now you have to install it separately.

#Getting started with MongoDB

Go to mongoDb console by command *mongo*
1. mongo
2. switch to different DB using *use <db>*
3. to get all objects in the DB, use *db.<collection>.find()*
4. we can have multiple collections in a Db, view all those collections    using *show collections*
5. to insert, *db.<collection>.insert({key:"value"})
6. to update *db.<collection>.update({key:"value"}, {$set:{key:"value"}})
7. to remove , *db.<collection>.remove({key:"value"})
8. db.<collection>.drop() to drop all the items in the collection.


#Mongoose

* go to /database folder and readme.md

#Restful routes

name    url     verb    desc
==============================
INDEX   /dogs   GET     Display a list of all dogs
NEW     /dogs/new   GET     Displas form to make a new dog
CREATE  /dogs   POST    Add new Dog to DB    
SHOW    /dogs/:id   GET Shows info about one dog

# Seeds file.
* the point of a seeds file is that we can run it to seed our database with our data.
