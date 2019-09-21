const mongoose = require('mongoose');
var UserModel = require('../model/UserModel');
// mongoose.connect('mongodb://localhost/GitHub_DB', { useNewUrlParser: true })
mongoose.connect('mongodb+srv://echo_github_write_access:Dbn47XMj9KouRgmA@cluster0-yjgj9.mongodb.net/github?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Cannot connect to DB', err))

exports.getUserNames = async function () {
    return await UserModel.Usernames.find();
}

exports.getUserName = async function (id) {
    return await UserModel.Usernames.findById(id);
}

exports.createUserName = async function (usernames, id, datefrom, todate) {
    return await UserModel.Usernames.insertMany(usernames, (err) => {
        if (err) {
            console.log("Error in Inserting into MongoDB:", err);
            exports.revertDateFlags(id);
        }
        else {
            var leng = usernames.length;
            console.log("-------------------------------------------------------------------------------------------------");
            console.log("|\tCurrent ID Fetched from MongoDB----------------> [\x1b[36m",id,"\x1b[37m] \t\t|");
            console.log("|\tDate_Range-------------------------------------> [\x1b[36m",datefrom,"--",todate,"\x1b[37m]\t\t|");
            console.log(`|\t\x1b[32mHurry!! ${leng} \x1b[32mgithub Usernames inserted successfully into MongoDB...\x1b[37m\t\t\t|`);
            UserModel.total_count();
            exports.updateDateFlags(id);
        }
    });
}

exports.updateUserName = async function (id, data) {
    return await UserModel.Usernames.update({ _id: id }, {
        $set: data
    });
}

exports.deleteUserName = function (id) {
    return UserModel.Usernames.remove({ _id: id });
}

exports.createDates = async function (usernames) {
    return await UserModel.Datesrange.insertMany(usernames, (err) => {
        if (err) throw err;
        console.log("\nDate Ranges inserted successfully into MongoDB..");
    });
}

exports.updateDateFlags = async function (id) {
    return await UserModel.Datesrange.updateOne({ _id: id }, {
        $set: { "isCompleted": true, "lastUpdated": Date.now() }
    });
}

exports.revertDateFlags = async function (id) {
    return await UserModel.Datesrange.updateOne({ _id: id }, {
        $set: { "isCompleted": false, "isStarted": false, "lastUpdated": Date.now() }
    });
}

exports.getDate = async function () {
    var onedate = await UserModel.Datesrange.findOne({ "isStarted": false, "isCompleted": false });
    if (onedate == null || undefined){
        console.log("All Date Ranges Processed, the Stack is Empty !!");
    }
    else{
    console.log("-------------------------------------------------------------------------------------------------");
    console.log("|\tCurrent ID Fetched from MongoDB----------------> [\x1b[36m",onedate._id,"\x1b[37m] \t\t|");
    console.log("|\tDate_Range-------------------------------------> [\x1b[36m",onedate.from,"--",onedate.to,"\x1b[37m]\t\t|");
    await UserModel.Datesrange.updateOne({ _id: onedate._id }, {
        $set: { "isStarted": true }
    });
    return onedate;
    }
}


exports.get7Dates = async function () {
    var dates = await UserModel.Datesrange.find({ "isStarted": false, "isCompleted": false }).limit(7);
    if (dates == null || undefined){
        console.log("All Date Ranges Processed, the Stack is Empty !!");
    }
    else{
        for(let i=0; i<dates.length; i++)
        {
            await UserModel.Datesrange.updateOne({ _id: dates[i]._id }, {
                $set: { "isStarted": true }
            });
            // console.log(dates[i]._id);
        }
    return dates;
    }
}

exports.updateBrokenDates = async function () {
    return await UserModel.Datesrange.updateMany({isStarted:true, isCompleted:false}, {
        $set: { "isCompleted": false, "isStarted":false, "lastUpdated": Date.now() }
    });
}