const express = require("express");
const router = express.Router();
const {Posts, Likes}=require('../models')

const {validateToken}=require('../middlewares/AuthMiddlwares')

router.get('/', validateToken, async(req,res)=>{
    const listOfPosts = await Posts.findAll({include:[Likes] });

    const likedPosts = await Likes.findAll({where : {
        UserId: req.user.id, 
    }})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});

});


router.get('/byId/:id',async(req,res)=>{
const id = req.params.id;
const post= await Posts.findByPk(id);
res.json(post)

})
// router.get('/byuserId/:id',async(req,res)=>{
// const id = req.params.id;
// const listOfPosts= await Posts.findAll({where: {}});
// res.json(listOfPosts)

// })

router.post('/', validateToken,async(req,res)=>{
    const post = req.body
    post.username = req.user.username;
    post.UserId=req.user.id;
   await Posts.create(post)
   res.json(post);
})

router.delete('/:postId', validateToken, async(req, res)=>{
    
    try{
        const postId = req.params.postId;
        await Posts.destroy({
            where:{
                id:postId,
            }
        })
        res.json("DELETED SUCCESSFULLY")
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Intenal Server Error"})
    }
    
   
})



module.exports = router;

