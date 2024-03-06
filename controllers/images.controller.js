export const postImage = async (req, res) => {
  try {
    if (req.file) {
      res.json(req.file)
    }
  } catch (error) {
 
  }
}