let header = document.getElementById("oneHeader");
const options = {
  method: 'GET',
  url: 'https://animals-by-api-ninjas.p.rapidapi.com/v1/animals',
  params: {name: header.value},
  headers: {
    'X-RapidAPI-Key': '663668d71dmsh0e0b7a4446c320cp18bcb9jsn2cff65faaa23',
    'X-RapidAPI-Host': 'animals-by-api-ninjas.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

//scientific name, taxonomy, color, diet
//they all have different ones, so maybe we can just loop through the characteristics and make them all, except a few we don't like
//no temperament training skintype favoritefood estimatedpopulationsize ageofsexualmaturity ageofweaning gestationperiod

//replace _s with  s
//break up colors if they're squished
//just do the top one

//I should make this a route
//wip