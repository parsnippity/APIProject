let all = document.getElementById("bits");
let test = document.getElementById("test");
let hi = async function() {
    let country = "france";
    let options = {
        method: "POST",
        url: "/animalAPI/country",
        body: {
            country: country
        }
    }
    //it's not in the body where it should be
    //these console.logs go to the browser, the other one goes to the terminal
    let {data} = await axios(options);
    all.innerHTML = data.data;
}
test.addEventListener("click", hi);
//the undefined from the console.log in the getcountry executes before the request
//why does it show the responses for the requests before the requests themselves
//wait, no, those aren't the responses, that's just what goes in it, so maybe it sends the request and runs that code and then when it's done notes down that it did the request