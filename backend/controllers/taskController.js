import Task from '../models/Task.js';

/**** Create Task (Admin)***/
export const createTask = async (req, res) => {
  try {
    const { 
      applicationId, 
      userId, 
      taskNumber, 
      title, 
      description, 
      instructions, 
      resourceUrl, 
      deadline 
    } = req.body;

    const task = new Task({
      applicationId,
      userId,
      taskNumber,
      title,
      description,
      instructions,
      resourceUrl,
      deadline
    });

    await task.save();
    res.status(201).json({ 
      message: 'Task created successfully', 
      task 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get User Tasks
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
      .populate('applicationId', 'position')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Tasks (Admin)
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('userId', 'fullName email')
      .populate('applicationId', 'position')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('userId', 'fullName email')
      .populate('applicationId', 'position');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status, ...(status === 'Submitted' && { submittedAt: new Date() }) },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ 
      message: 'Task status updated successfully', 
      task 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Task Details (Admin)
export const updateTask = async (req, res) => {
  try {
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ 
      message: 'Task updated successfully', 
      task 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Task (Admin)
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Tasks by Application ID (Admin)
export const getTasksByApplication = async (req, res) => {
  try {
    const tasks = await Task.find({ applicationId: req.params.applicationId })
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};