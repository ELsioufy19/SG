import mongoose, {Schema, model} from "mongoose"

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20 
    },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
    },
  password: {
    type: String,
    required: true,
    
    },
  phone: Number,
  gender: {
    type: String,
    enum:['male', 'female'],
    },
  status: {type: String, enum:["offline", "online"], default: "offline"},
  role: {type: String, enum: ["user", "admin"], default: "user"},
  isConfirmed: {type: Boolean, default: false, },
  forgetCode: {type: String, },
  activationCode: {type: String},
  porfilePic: {
    url: {type: String, default: ""},
    id: {type: String, default: ""}
  },
  coverImgs: [{url: {type: String, required: true}, id: {type: String, required: true}}],
  chapter:{
    id:{type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'},
    progress: {
      type: Number,
      default: 0,
    },
    quizprogress :{
      type : Number,
      default : 0
    },
  }

});

const User = mongoose.model.User || model('User', userSchema)
export default User;
