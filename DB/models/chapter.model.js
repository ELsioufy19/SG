
import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: [
    {
      value: { type: String, required: true },
      translate: { type: String, required: true },
      photo: {
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
      video: {
        url: { type: String, required: true },
        
      },
      audio: {
        url: { type: String, required: true },
      }
    },
  ],
  chapterNumber: {
    type: Number,
    required: true,
  },
  
  
  
  
},{timestamps: true});



 const Chapter = mongoose.model("Chapter", chapterSchema);
 export default Chapter;
