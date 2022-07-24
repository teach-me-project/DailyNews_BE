const db = require('../helper/db_connections')
const fs = require('fs');
const bcryp = require('bcrypt')
const { resolve } = require('path');
module.exports = {
         getUser : (req,res) =>{
            return new Promise((resolve, reject) =>{
                const { email, password } = req.body;
                const sql = `SELECT profiles.profile_username, profiles.profile_name, account.account_email,account.account_password,profiles.profile_picture, profiles.profile_job, profiles.profile_about from profiles JOIN account ON profiles.profile_id = account.account_id`
                db.query(sql, (err, results) => {
                        console.log(results);
                        if (err) {
                            reject({
                                message: 'ada error',
                            });
                        } else {
                          resolve({
                            data : {
                                results: results
                            }
                          })
                        }
                    }
                ); 
            })
        }, 
        update:(req,res)=>{
            return new Promise((resolve, reject) =>{
                const {id} = req.params
                const sql = `SELECT profile_username, profile_name, profile_picture, profile_job, profile_about from profiles WHERE profile_id = ${id}` 
                db.query(sql,(err,result) =>{
                    if(err){
                        console.log(err)
                    }
                    if(req.file){
                        if(result[0].profile_picture != 'default-profile.png'){
                            fs.unlink(`./upload/${result[0].profile_picture}`,function(err){
                                if(err){
                                   console.log(err)
                                }
                            })
                        }
                    }
                    const previousData = {
                        ...result[0],
                        ...req.body
                    }
                    console.log(previousData)
                    const {profile_username, profile_name, profile_picture, profile_job, profile_about}= previousData
                    
                    const sqlUpdate = `UPDATE profiles SET profile_username ='${profile_username}', profile_name ='${profile_name}', profile_picture ='${profile_picture}', profile_job ='${profile_job}', profile_about = '${profile_about}' WHERE profile_id =${id}`
                    db.query(sqlUpdate,(err,results)=>{
                        if(err){
                            console.log(results)
                        }
                        resolve({
                            message: 'Update Profile Success',
                            status: 200,
                            data: results
                        })

                    })
                })
            })
        },
        remove : (req,res) =>{
            return new Promise((resolve, reject) =>{
                const {id}  = req.params
                const sqlGetImage = `SELECT profile_picture FROM profiles WHERE account_id  = ${id}  `
               db.query(sqlGetImage,(err, resultData) =>{
                if(err){
                    console.log(err)
                }
                if(!resultData.length){
                    reject({
                        message: 'Image Tidak Ditemukan'
                    })
                }else{
                    const cover = resultData[0].profile_picture
                    db.query(`DELETE  FROM account WHERE account_id = ${id}`, (err,result)=>{
                        if(err){
                            reject({
                                message: 'ada error'
                            })
                        }
                        if(cover != 'default-profile.png' ){
                            fs.unlink(`./uploads/${cover}`, function(err){
                                if(err) {
                                  resolve({
                                    message: 'delete movies success',
                                    status: 200,
                                    data: result
                                  })
                                }
                              
                              })
                            }
                        resolve({
                        message: 'delete movies success',
                        status: 200,
                        data: {
                            results: result
                        }
                        })
                        
                    })
                }
              
               })
            })
        }, getById: (req,res) => {
            return new Promise ((resolve, reject) =>{
                const {id} = req.params
                const sql = `SELECT profiles.profile_username, profiles.profile_name, account.account_email,account.account_password,profiles.profile_picture, profiles.profile_job, profiles.profile_about from profiles JOIN account ON profiles.profile_id = account.account_id WHERE account.account_id = ${id}`
                db.query(sql,(err,results) =>{
                    if(err){
                        reject({
                            message: err
                        })
                    }
                    resolve({
                        message: 'Get Success By Id Success',
                        status: 200,
                        data: results
                    })
                })
            })
        }, changePassword: (req,res) =>{
            return new Promise((resolve,reject) =>{
                const {id} = req.params
                const {newAccountPassword, confirmPassword} = req.body
                const sql = `SELECT account_password FROM account WHERE account_id = ${id}` 
                db.query(sql, (err,result) =>{
                    if(err){
                        console.log(err)
                    }
                    
                    if(newAccountPassword != confirmPassword){
                        reject({
                            message: 'password and confirm password are not the match'
                        })
                    }
                    console.log(result)
                    console.log(newAccountPassword)
                    bcryp.hash(newAccountPassword,10,function(err,hashedPassword) {
                        db.query(`UPDATE account SET account_password = '${hashedPassword}' WHERE account_id =${id}`, (err,results) =>{
                            if(err){
                                reject({
                                    message: 'change password failed'
                                })
                            }
                            resolve({
                                message: 'change password success',
                                status: 200,
                                data: results
                            })
                        })

                    })
                })
            })
        }

}