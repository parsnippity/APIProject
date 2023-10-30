let all = document.getElementById("bits");
let header = document.getElementById("countryHeader")
let fillPage = async function() {
    let country = header.getAttribute("value");
    let {data} = await axios.get(`/animalAPI/country?country=${country}`);
    let success = data.success;
    data = data.data;
    form_data = []
    if(!success){
        let h3 = document.createElement("h3");
        h3.innerHTML = data;
        all.appendChild(h3);
    } else {
        for(let i = 0; i < data.length; i++){
            let removeFunc = async function() {
                form_data = []
                var encodedKey  =  encodeURIComponent("animal")
                var encodedValue = encodeURIComponent(`${data[i].animal}in${data[i].country}`)
                form_data.push(encodedKey + "=" + encodedValue)
                let test = await fetch('/users/removeFavorite', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    },
                    body:form_data
                })
                if(test.data.success == true) {
                    btn.innerHTML = "favorite";
                    btn.removeEventListener("click", removeFunc);
                    btn.addEventListener("click", addFunc);
                }
            };
            let addFunc = async function() {
                var encodedKey  =  encodeURIComponent("animal")
                var encodedValue = encodeURIComponent(`${data[i].animal}in${data[i].country}`)
                form_data.push(encodedKey + "=" + encodedValue)
                let test = await fetch('/users/addFavorite', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    },
                    body:form_data
                })
                //wip why the heck is this not working! why does it not get my response! put this on hold for now (don't forget the other pages don't have this)
                //maybe it's something with me using fetch instead of axios, I'm not getting it right
                //wip look it up!
                console.log(test);
                if(test.data.success == false){
                    window.location.assign("/users/login");
                } else {
                    btn.innerHTML = "favorited";
                    btn.removeEventListener("click", addFunc);
                    btn.addEventListener("click", removeFunc);
                }
            }
            let bigDiv = document.createElement("div");
            bigDiv.classList.add("w-25", "m-2");
            let div = document.createElement("div");
            div.classList.add("border", "border-black", "bg-primary-subtle", "p-2", "m-2", "w-25", "text-center");
            div.addEventListener("click", () => {
                location.assign(`/animals/one/${data[i].animal}/${data[i].country}`);
            })
            let h1 = document.createElement("h1");
            h1.innerHTML = data[i].animal;
            let btn = document.createElement("button");
            let getFavs = async function() {
                let favs = await axios.get("/users/getFavorites");
                favs = favs.data;
                if(favs.success == true){
                    if(favs.data.includes(`${data[i].animal}in${data[i].country}`)) {
                        btn.addEventListener("click", removeFunc)
                        btn.innerHTML = "favorited";
                    }
                } else {
                    btn.addEventListener("click", addFunc)
                    btn.innerHTML = "favorite";
                }
            }
            getFavs();
            let h3 = document.createElement("h3");
            h3.innerHTML = data[i].country;
            div.appendChild(h1);
            div.appendChild(h3);
            bigDiv.appendChild(div);
            bigDiv.appendChild(btn);
            all.appendChild(bigDiv);
        }
    }
}
fillPage();