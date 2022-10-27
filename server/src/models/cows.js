const mongoose = require('mongoose');
const { Schema } = mongoose;

//definition of cow schema

const cowsSchema = new Schema(
  {
    id_senasa: {
      type: String,
      match: [
        /^[a-zA-Z0-9\s]{1,16}$/,
        'Only letters and numbers allowed, max characters 16.',
      ],
      required: true,
    },
    animal_type: {
      type: String,
      enum: ['Novillo', 'Toro', 'Vaquillona'],
      required: true,
    },
    animal_weight: {
      type: Number,
      required: false,
    },
    paddock_name: {
      type: String,
      match: [/^[a-zA-Z]{1,200}$/, 'Only letters allowed, max characters 200.'],
      required: true,
    },
    device_type: {
      type: String,
      enum: ['COLLAR', 'CARAVANA'],
      required: true,
    },
    device_number: {
      type: String,
      match: [
        /^[a-zA-Z0-9\s]{0,8}$/,
        'Only letters and numbers allowed, max characters 8.',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cow = mongoose.model('Cow', cowsSchema);

module.exports = Cow;
