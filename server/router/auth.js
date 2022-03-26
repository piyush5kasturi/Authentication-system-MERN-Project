const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
require('../db/conn')
const User = require("../model/userSchema");
// const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({extended:false}))
// router.use(bodyParser.json());

router.use(cookieParser);
router.get('/', (req, res) => {
    res.send('Hello World from the server router');
});


//Using Promise


// router.post('/register',(req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Plz fill data Properly" });
//     }


//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email already Exist" });
//             }

//             const user = new User({ name, email, phone, work, password, cpassword })

//             user.save().then(() => {
//                 res.status(201).json({ message: "user Register successfuly" })
//             }).catch((err) => { res.status(500).json({ error: "Not able to register" }) })
//         }).catch((err) => { console.log(err); })


// console.log(name);
// res.json({ message: req.body });
// })


//Using Async Await

router.post('/register', async (req, res) => {
    console.log("clikd")
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Plz fill data Properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password does not match" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })

            // const userRegister = await user.save();
            await user.save();
            res.status(201).json({ message: "user Register successfuly" })

        }


        // if (userRegister) {
        //     res.status(201).json({ message: "user Register successfuly" })
        // }

    }
    catch (err) {
        console.log(err);

    }



    // console.log(name);
    // res.json({ message: req.body });
})

//login check
router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({ message: "Done..." })
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" });
            } else {
                res.json({ message: "User avaliable" })
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials" });
        }





    }
    catch (err) {
        console.log(err);
    }
})


// about us page

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
});



module.exports = router;