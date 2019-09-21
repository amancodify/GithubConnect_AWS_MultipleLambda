const mongoose = require('mongoose');
const usernamesSchema = new mongoose.Schema({
    Username: String,
    Timestamp: { type: Date, default: Date.now },
    isProcessed: Boolean,
    ProcessStarted: Boolean
});

const dateSchema = new mongoose.Schema({
    from: String,
    to: String,
    isStarted: Boolean,
    isCompleted: Boolean,
    lastUpdated: { type: Date, default: Date.now }
});

function total_count(){
    this.Usernames.countDocuments({ }, function(err, c) {
        if(err){
            console.log('Error While fetching the usernames count !!', err);
        }
        else{
        console.log(`|\t\x1b[33mTotal ${c} Items Inserted till now !!\x1b[37m\t\t\t\t\t\t\t|`);
        console.log("-------------------------------------------------------------------------------------------------");
        }
    });
}

exports.Usernames = mongoose.model('Usernames', usernamesSchema);
exports.Datesrange = mongoose.model('Datesrange', dateSchema);
exports.total_count = total_count;
