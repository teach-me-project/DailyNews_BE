const error = (errCode) => {
    if(errCode === 'ER_DUP_ENTRY'){
        return {message: 'Email Already Use'}
    }
}
const success = (errCode) => {

}

module.exports = {
    error,
    success
}