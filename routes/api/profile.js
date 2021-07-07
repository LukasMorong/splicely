const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
const validateProfileInput = require("../../validation/profile");
const validateSkillsInput = require("../../validation/skills");
//Load profile model
const Profile = require("../../models/Profile");
//Load user model
const User = require("../../models/User");

//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//@route    GET api/profile
//@desc     Get current user profile
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", "username")
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    GET api/profile/all
//@desc     Get all profiles
//@access   Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", "username")
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

//@route    GET api/profile/user/:username
//@desc     Get profile by username
//@access   Public
const errors = {};

router.get("/user/:username", (req, res) => {
  User.findOne({ username: req.params.username }).then(user => {
    if (!user) {
      errors.noprofile = "There is no user for this username";
      res.status(404).json(errors);
    } else {
      Profile.findOne({ user: user })
        .populate("user", "username")
        .then(profile => {
          if (!profile) {
            errors.noprofile = "There is no profile for this username";
            res.status(404).json(errors);
          }

          res.json(profile);
        });
    }
  });
});

//@route    POST api/profile
//@desc     Create / Edit user profile
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      //return errors 400
      return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.user.user_name;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.contact) profileFields.contact = req.body.contact;
    //Split into array
    if (typeof req.body.interests != undefined) {
      profileFields.interests = req.body.interests.split(",");
    }
    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update existing
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create new profile
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      }
    });
  }
);

//@route    POST api/profile/skills
//@desc     Add skill to profile
//@access   Private
router.post(
  "/skills",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSkillsInput(req.body);
    if (!isValid) {
      //return errors 400
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newSkill = {
        title: req.body.title,
        level: req.body.level,
        numberOfYears: req.body.numberOfYears,
        isActual: req.body.isActual,
        description: req.body.description
      };

      //add to skills array
      profile.skills.unshift(newSkill);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route    DELETE api/profile/skills/:skill_id
//@desc     Delete skill from profile
//@access   Private
router.delete(
  "/skills/:skill_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get index to remove
        const removeIndex = profile.skills
          .map(item => item.id)
          .indexOf(req.params.skill_id);

        //Splice out of array
        profile.skills.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    DELETE api/profile
//@desc     Delete user and profile
//@access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ sucess: true })
      );
    });
  }
);

module.exports = router;
