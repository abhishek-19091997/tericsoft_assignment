const mongoose = require("mongoose");

const bmiSchema = new mongoose.Schema({
  BMI: { type: String, require: true },
  height: { type: String, require: true },
  weight: { type: String, require: true },
  user_id: { type: String, require: true },
}, {
    timestamp:true,
});
const BMIModel = mongoose.model("BMI", bmiSchema);
module.exports = { BMIModel };
