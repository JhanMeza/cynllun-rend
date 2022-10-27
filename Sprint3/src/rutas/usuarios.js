const { Router } = require("express")
const router = Router()

router.get('/usuarios', (req, res) => {
    res.send("registro de usuarios.")  //el servidor envia un obj json
})

module.exports = router