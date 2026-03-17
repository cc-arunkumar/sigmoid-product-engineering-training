const router = express.Router();

const {
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

// Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);



module.exports = router;