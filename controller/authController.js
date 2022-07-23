const Auth = require('../model/auth')
module.exports = {
    login: async (req, res)=> {
        try {
            const results = await Auth.login(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    register: async (req, res)=> {
        try {
            const results = await Auth.register(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    forgot: async (req, res)=> {
        try {
      
            const results = await Auth.forgot(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    getreset: async (req, res)=> {
        try {
      
            const results = await Auth.getreset(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    
    reset: async (req, res)=> {
        try {
      
            const results = await Auth.reset(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
}