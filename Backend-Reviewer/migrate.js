const mongoose = require('mongoose');

// Replace 'your_database_name' with the actual name of your MongoDB database
const databaseName = 'test';

// Use the provided connection string
const connectionString = `mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/${databaseName}`;

mongoose.connect(connectionString);

const userSchema = new mongoose.Schema({
  code: String,
  driveLink: String,
  sector: String,
  // ... other fields
});

const User = mongoose.model('User', userSchema);

const reviewerSchema = new mongoose.Schema({
  code: String,
  driveLink: String,
  sector: String,
  // ... other fields
});

const Reviewer = mongoose.model('Reviewer', reviewerSchema);

async function migrateData() {
  try {
    // Retrieve unique data from users collection based on code, driveLink, and sector
    const uniqueUserData = await User.aggregate([
      {
        $group: {
          _id: { code: "$code", driveLink: "$driveLink", sector: "$sector" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: 1 } },
      { $project: { _id: 0, code: "$_id.code", driveLink: "$_id.driveLink", sector: "$_id.sector" } },
    ]);

    // Insert unique data into reviewers collection only if the code doesn't exist
    for (const userData of uniqueUserData) {
      const existingReviewer = await Reviewer.findOne({ code: userData.code });

      if (!existingReviewer) {
        await Reviewer.create(userData);
      }
    }

    console.log('Data migration successful!');
  } catch (error) {
    console.error('Error migrating data:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateData();
