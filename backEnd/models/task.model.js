import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignee: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default:'pending',
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Task', taskSchema);