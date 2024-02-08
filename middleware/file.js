import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('1')
    cb(null, 'images/')
    console.log('2')
  },
  filename: function (req, file, cb) {
    console.log('3')
    cb(null, new Date().toISOString() + '-' + file.originalname)
    console.log('4')
  }
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  };
};
export default multer({ storage, fileFilter });