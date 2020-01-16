const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async update(req, res) {

        const { id } = req.params;
        const { name, bio, techs, avatar_url } = req.body;

        await Dev.findByIdAndUpdate(id, {name: name, bio: bio, techs: techs, avatar_url: avatar_url})

        return res.json({ message: "ok" });
    },

    async destroy(req, res) {
        const { username } = req.params;

        const select_username = await Dev.findOne({ github_username: username });

        if(select_username) {
            await Dev.remove({ github_username: username })
            return res.json({ message: "Usuário Deletado" });
        }

        return res.json({ message: "Usuário não cadastrado" });
    },

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {

        const github_username = req.body.github_username;
        const techs = req.body.techs;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

        let dev = await Dev.findOne({ github_username })

        if(!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
        
            let { name, avatar_url, bio } = response.data;
        
            if(!name) {
                name = response.data.login;
            }
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
    
        return res.json(dev);
    }
};