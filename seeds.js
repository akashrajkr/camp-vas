const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');

const data = [
    {
        name:'Tso Moriri Lake, Ladakh',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/640px-Tsomoriri_Lake_DSC4010_20190212171119.jpg',
        description: 'Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime. The lake is completely frozen during the winters and is an excitingly unique thing to witness. The best time to camp here is during May to September and it is simply wonderful to spend time in the decorated tents. You can trek in the nearby Ladakh region and witness the mesmerizing sunset at the lake. The best part is that the tents are comfortable with electricity supply.'
    },
    {
        name: 'Camp Exotica, Kullu',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg',
        description: 'The Camp Exotica is a perfect weekend getaway option located in Kullu in the Manali district of Himachal Pradesh. The accommodation provided is world class and the tents simply leave you connecting with nature like never before. The location of these tents is such that it gives a panoramic view of the surrounding mountains. The food provided is of fine quality and the incredible view will simply leave you in awe of this adventure. Make sure to take out time for this pleasure full camping trip.'
    },
    {
        name: 'Camp Room on the Roof, Dehradun',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/3473170977_c73bf27a6f_z_20190212173011.jpg',
        description: 'A more than perfect camp for the adventure enthusiasts, the Camp Room on the Roof is situated 25 km from Chakrata, a quaint town near Dehradun. This camp is located on the step farms giving it a mind-blowing view. From the campsite, you can enjoy the view of the Virratkhai Valley. Setting up base here, you can head off to pursue activities like mountaineering, mountain biking, or rafting in the pristine Yamuna River. The surrounding view will calm the vistas of your mind.'
    },
    {
        name: 'Rishikesh Valley camp, Rishikesh',
        image: 'https://www.holidify.com/images/cmsuploads/compressed/3418318319_6caa7d0cfe_z_20190212173233.jpg',
        description:'When it comes to camping, Rishikesh Camping experience has to be on the list! This amazing Rishikesh Valley camp is not only close to nature but also has a more spiritual connection. The tents here are styled in a hermit fashion and are designed to give you total aloof time. This camp is your go-to place if you are looking for a chance to introspect your inner self. The food served here is entirely organic. Apart from detoxifying, you can undertake rafting, trekking, ayurvedic spas and the grand elephant rides. Camping in Rishikesh is one of the best in India!'
    }
]


function seedDB() {
    console.log('Removing everything from the database!');
    Campground.deleteMany({}, (err) => {
        if(err)
            console.log(err);
        console.log('Removed everything from the database!');
        data.forEach(seed => {
            Campground.create(seed, (err, data) => {
                if(err)
                    console.log(err);
                else{
                    console.log('Added campground');
                    Comment.create({
                        text: 'This place is great!',
                        author: 'Akash'
                    }, (err, comment) => {
                        if(err) 
                            console.log(err);
                        else {
                            data.comments.push(comment);
                            data.save();
                            console.log('comment created');
                        }
                    })
                }
            })
        })
    });
    
}

module.exports = seedDB;
