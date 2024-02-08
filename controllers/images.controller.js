export const postImage = async (req, res) => {
    console.log('5')
    try {
        if (req.file) {
            console.log('6')
            res.json(req.file)
        }
    } catch (error) {
        
    }
}