let axios = require("axios")

let getWeather = async function (req, res) {
    try{
        let q = req.query.q
        let options = {
            method : "get",
            url : `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=098142161f3cdb1a41bf904e9ef3724f`
        }
        let result = await axios(options);
        console.log(result)
        let temp = result.data.main.temp
        res.status(200).send({temp})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getSortedCities = async function(req, res) {
    try{
        let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityArray = []
        for( let i = 0; i < cities.length; i++) {
            let obj = {city : cities[i]}
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=098142161f3cdb1a41bf904e9ef3724f`
            }
            let result = await axios(options);
            console.log(result.data.main.temp)
            obj.temp = result.data.main.temp
            cityArray.push(obj)
        }
            let sorted = cityArray.sort( function(a,b) { return a.temp - b.temp })
            console.log(sorted)
            return res.status(200).send({status : true, data: sorted})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports = {getWeather, getSortedCities}