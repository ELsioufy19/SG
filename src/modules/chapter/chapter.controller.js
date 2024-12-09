import Chapter from '../../../DB/models/chapter.model.js';

// Create a new chapter
export const createChapter = async (req, res) => {
    try {
        const { title, content, chapterNumber,} = req.body;

        const chapter = new Chapter({
            title,
            content,
            chapterNumber,
            
        });

        await chapter.save();
        res.status(201).json(chapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all chapters
export const getChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find();
        res.status(200).json(chapters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateChapterProgress = async (req, res) => {
    try {
        const { chapterId } = req.params;
        const { progress } = req.body;

        const updatedChapter = await Chapter.findByIdAndUpdate(
            chapterId,
            { progress },
            { new: true }
        );

        if (!updatedChapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        res.status(200).json(updatedChapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
