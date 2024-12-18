import User from '../../../DB/models/user.model.js';

export const createUser = async (req, res) => {
    const {
        userName,
        email,
        password,
        gender,
        status,
        role,
        isConfirmed,
        porfilePic,
        chapter
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        });
    }

    const user = await User.create({
        userName,
        email,
        password,
        gender,
        status: status || "offline",
        role: role || "user",
        isConfirmed: isConfirmed || false,
        porfilePic: {
            url: porfilePic?.url || "",
            id: porfilePic?.id || ""
        },
        chapter: {
            id: chapter?.id || null,
            progress: chapter?.progress || 0,
            quizprogress: chapter?.quizprogress || 0
        }
    });

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
    });
}



export const updateUser = async (req, res) => {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true }
    ).select('-password');

    return res.json({
        success: true,
        message: "User updated successfully",
        data: user
    });
}

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('-password');
    
    return res.json({
        success: true,
        message: "User retrieved successfully",
        data: user
    });
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    // Update user status to online
    user.status = "online";
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
            status: user.status,
            porfilePic: user.porfilePic,
            chapter: user.chapter
        }
    });
}
