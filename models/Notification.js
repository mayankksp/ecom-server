const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    type: String, // e.g., 'Order Status', 'Promotion'
    date: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
