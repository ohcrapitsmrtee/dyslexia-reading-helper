const User = require('../models/userModel');

// Function to save user preferences
exports.savePreferences = async (req, res) => {
    try {
        const { userId, preferences } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.preferences = preferences;
        await user.save();
        res.status(200).json({ message: 'Preferences saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving preferences', error });
    }
};

// Function to get user preferences
exports.getPreferences = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving preferences', error });
    }
};