import Application from '../models/Application.js';
import User from '../models/User.js';

/****Submit Application***/
export const submitApplication = async (req, res) => {
  try {
    const { position, skills, education, experience, coverMessage } = req.body;

    const application = new Application({
      userId: req.userId,
      position,
      skills,
      education,
      experience,
      coverMessage
    });

    await application.save();
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/****Get User Applications**/
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/****Get All Applications (Admin)***/
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/****Get Application Stats (Admin)***/
export const getApplicationStats = async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const completed = await Application.countDocuments({ status: 'Completed' });
    const inProgress = await Application.countDocuments({ status: 'In Progress' });
    
    res.json({ total, completed, inProgress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**Get Single Application by ID***/
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('userId', 'fullName email');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/****Update Application Status (Admin)****/
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ 
      message: 'Application status updated successfully', 
      application 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Application
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};