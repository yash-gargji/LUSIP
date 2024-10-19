const Hall = require('../model/projectSchema');
const User = require("../model/userSchema");

const createHall = async (req, res, next) => {
  try {
    const { name,description,facultyName,prerequisites,mode,preferredBranch } = req.body;

    // if (!name || !facultyName || !prerequisites || !mode || !description || !preferredBranch) {
    //   return res.status(422).json({ error: "Please fill all details" });
    // }
    const hall = new Hall({ name,description,facultyName,prerequisites,mode,preferredBranch});
    await hall.save();
    res.status(201).json({ message: 'Hall created successfully' });
  } catch (error) {
    next(error);
  }
};

const getHalls = async (req, res, next) => {
  try {
    const halls = await Hall.find();
    res.json({ halls });
  } catch (error) {
    next(error);
  }
};

const getHallById = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json({ hall });
  } catch (error) {
    next(error);
  }
};

const updateHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const { name,description,facultyName,prerequisites,mode,preferredBranch} = req.body;
    const currentUserMail = req.rootUser.email; // Renamed to avoid conflict
    const masterAdminmail = process.env.REACT_APP_MASTER_ADMIN;
    const hall = await Hall.findById(hallId);

    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    if (hall.hallCreater !== currentUserMail && currentUserMail !== masterAdminmail) {
    // if (hall.hallCreater !== hallCreatorEmail) {
      return res.status(403).json({ message: 'Unauthorized' }); // 403 means "Forbidden"
    }

    const updatedHall = await Hall.findByIdAndUpdate(
      hallId,
      { name,description,facultyName,prerequisites,mode,preferredBranch },
      { new: true }
    );

    if (!updatedHall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    res.json({ hall: updatedHall });
  } catch (error) {
    next(error);
  }
};

const deleteHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findByIdAndDelete(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json({ message: 'Hall deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createHall, getHalls, getHallById, updateHall, deleteHall };
