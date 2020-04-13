// // 
// const express = require("express");
// const router = express.Router();
// const keys = require('../../config/keys');
// const passport = require("passport");
// const Profiles = require("../../models/Profile");

// // $route POST api/profiles/test
// // @desc  返回请求的json数据
// // @access public
// router.get("/test", (req, res) => {
//     res.json({
//         msg: "profiles api"
//     })
// })

// // $route POST api/profiles/add
// // @desc  创建信息接口 返回请求的json数据 pretty
// // @access private
// router.post("/add", passport.authenticate("jwt", {
//     session: false
// }), (req, res) => {
//     let profileFileds = {};
//     if (req.body.type) profileFileds.type = req.body.type;
//     if (req.body.descride) profileFileds.descride = req.body.descride;
//     if (req.body.income) profileFileds.income = req.body.income;
//     if (req.body.expend) profileFileds.expend = req.body.expend;
//     if (req.body.cash) profileFileds.cash = req.body.cash;
//     if (req.body.remark) profileFileds.remark = req.body.remark;
//     //console.log(profileFileds);
//     new Profiles(profileFileds).save().then(profile => {
//         res.json(profile);
//     }).catch(err => res.json(err));
// });

// // $route GET api/profiles/
// // @desc  获取所有信息 返回请求的json数据 pretty
// // @access private
// router.get("/", passport.authenticate("jwt", {
//     session: false
// }), (req, res) => {
//     Profiles.find().then(profile => {
//         if (!profile) {
//             return res.status(404).json("没有任何内容")
//         }
//         res.json(profile);
//     }).catch(err => res.status(404).json(err));
// });

// // $route GET api/profiles/:id
// // @desc  获取单个信息 
// // @access private
// router.get("/:id", passport.authenticate("jwt", {
//     session: false
// }), (req, res) => {
//     Profiles.findOne({
//         _id: req.params.id
//     }).then(profile => {
//         if (!profile) {
//             return res.status(404).json("没有任何内容")
//         }
//         res.json(profile);
//     }).catch(err => res.status(404).json(err));
// });

// // $route POST api/profiles/edit
// // @desc  编辑信息接口 
// // @access private
// router.post("/edit/:id", passport.authenticate("jwt", {
//     session: false
// }), (req, res) => {
//     let profileFileds = {};
//     if (req.body.type) profileFileds.type = req.body.type;
//     if (req.body.descride) profileFileds.descride = req.body.descride;
//     if (req.body.income) profileFileds.income = req.body.income;
//     if (req.body.expend) profileFileds.expend = req.body.expend;
//     if (req.body.cash) profileFileds.cash = req.body.cash;
//     if (req.body.remark) profileFileds.remark = req.body.remark;
//     //console.log(profileFileds);
//     Profiles.findByIdAndUpdate({
//             _id: req.params.id
//         }, {
//             $set: profileFileds
//         }, {
//             new: true
//         })
//         .then(profile => {
//             if (profile) res.json(profile);
//         }).catch(err => res.json(err));
// });

// // $route POST api/profiles/delete/id
// // @desc  删除信息接口 
// // @access private
// router.delete("/delete2/:id", passport.authenticate("jwt", {
//     session: false
// }), (req, res) => {
//     Profiles.findOneAndRemove({
//             _id: req.params.id
//         }).then((profile) => {
//             res.json(profile);
//             //profile.save().then(profile=> res.json(profile)); 新的版本，该语句报错
//         }).catch(err => res.status(400).json("删除失败"));
// });

// router.delete("/delete/:id", passport.authenticate("jwt", {
//     session: false
// }), (req, res) => {
//     Profiles.deleteOne({
//         _id: req.params.id
//     }).then(obj=>{
//         //console.log(obj);
//         res.json("删除成功")
//     }).catch(err => res.status(400).json("删除失败"));
// });

// module.exports = router;