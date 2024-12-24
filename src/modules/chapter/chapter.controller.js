import Chapter from '../../../DB/models/chapter.model.js';
import catchError from '../../utils/catchError.js';

// Create chapter with error handling
export const createChapter = catchError(async (req, res) => {
    const { title, description , content, chapterNumber, cover } = req.body;

    const chapter = await Chapter.create({
        title,
        content, 
        chapterNumber,
        description,
        cover
    });

    res.status(201).json({
        success: true,
        message: "Chapter created successfully",
        data: chapter
    });
});

// Get all chapters with pagination
export const getAllChapters = catchError(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let chapters = await Chapter.find()
        .select('title description cover chapterNumber')
        .sort({ chapterNumber: 1 })
        .skip(skip)
        .limit(limit);

    // Map through chapters and add progress information
    chapters = chapters.map(chapter => {
        const isUserChapter = chapter._id.toString() === req.user.chapter.id?.toString();
        return {
            ...chapter.toObject(),
            progress: isUserChapter ? req.user.chapter.progress : 0,
            
        };
    });

    const totalCount = await Chapter.countDocuments();

    res.status(200).json({
        success: true,
        data: {
            chapters,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount
        }
    });
});
// Update chapter progress with validation
export const updateChapterProgress = catchError(async (req, res) => {
    const { chapterId } = req.params;
    const { progress } = req.body;

    const updatedChapter = await Chapter.findByIdAndUpdate(
        chapterId,
        { progress },
        { new: true }
    ).select('title chapterNumber progress');

    if (!updatedChapter) {
        return res.status(404).json({
            success: false,
            message: 'Chapter not found'
        });
    }

    res.status(200).json({
        success: true,
        data: updatedChapter
    });
});

// Get single chapter with proper error handling
export const getSingleChapter = catchError(async (req, res) => {
    const chapter = await Chapter.findById(req.params.id)
        .select('title content chapterNumber cover');

    if (!chapter) {
        return res.status(404).json({
            success: false,
            message: "Chapter not found"
        });
    }

    return res.json({
        success: true,
        data: chapter
    });
});

export const toggleFavoriteChapter = catchError(async (req, res) => {
    const { chapterId } = req.params;
    
    const user = await User.findById(req.user._id);
    
    // Toggle favorite status
    if (!user.favoriteChapters) {
        user.favoriteChapters = [];
    }
    
    const chapterIndex = user.favoriteChapters.indexOf(chapterId);
    if (chapterIndex === -1) {
        user.favoriteChapters.push(chapterId);
    } else {
        user.favoriteChapters.splice(chapterIndex, 1);
    }
    
    await user.save();

    res.status(200).json({
        success: true,
        message: chapterIndex === -1 ? 'Chapter added to favorites' : 'Chapter removed from favorites',
        data: {
            favoriteChapters: user.favoriteChapters
        }
    });
});
