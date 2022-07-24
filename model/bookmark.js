const db = require('../helper/db_connections')
module.exports ={
    
    getBookmark : (req,res) =>{
        return new Promise ((resolve,reject) =>{
            const {id,id_post} = req.params
            console.log(req.params)
            const sql = `SELECT  post.post_cover, post.post_category, post.post_fill, post.post_link FROM post_bookmark JOIN post ON post_bookmark.post_id = post.post_id WHERE post_bookmark.profile_id =${id} AND post_bookmark.post_id =${id_post}`
            db.query(sql,(err,result) =>{
                console.log(result)
                if(err){
                    reject({
                        message: 'get bookmark failed'
                    })
                }
                resolve({
                    message: 'add bookmark success',
                    status: 200,
                    data: result
                })
            })
        })
    },
    addBookmark : (req,res) =>{
        return new Promise ((resolve,reject) =>{
            const {id} = req.params
            const {post_id} =req.body
            const sql = `INSERT INTO post_bookmark (profile_id, post_id) VALUES ('${id}', ${post_id})`
            db.query(sql,(err,result) =>{
                if(err){
                    reject({
                        message: 'add bookmark failed'
                    })
                }
                resolve({
                    message: 'add bookmark success',
                    status: 200,
                    data: result
                })
            })
        })
    },
    deleteBookmark : (req,res) =>{
        return new Promise ((resolve,reject) =>{
            const {profile_id} = req.params
            const {post_id} =req.body
            const sql = `DELETE FROM post_bookmark WHERE profile_id =${profile_id} AND post_id = ${post_id} `
            db.query(sql,(err,result) =>{
                if(err){
                    reject({
                        message: 'delete bookmark failed'
                    })
                }
                resolve({
                    message: 'delete bookmark success',
                    status: 200,
                    data: result
                })
            })
        })
    },
    getById : (req,res) =>{
        return new Promise ((resolve,reject) =>{
            const {id} = req.params
            const sql = `SELECT  post.post_cover, post.post_category, post.post_fill, post.post_link FROM post_bookmark JOIN post ON post_bookmark.post_id = post.post_id WHERE post_bookmark.profile_id =${id} `
            db.query(sql,(err,result) =>{
                if(err){
                    reject({
                        message: 'get bookmark by id user failed'
                    })
                }
                resolve({
                    message: 'get bookmark by id user success',
                    status: 200,
                    data: result
                })
            })
        })
    }
    
    
}