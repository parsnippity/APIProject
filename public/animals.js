let all = document.getElementById("bits");
let fillPage = async function() {
    let {data} = await axios.get(`/animalAPI/all`);
    data = data.data;
        form_data = []
        for(let i = 0; i < data.length; i++){
            let removeFunc = async function() {
                form_data = []
                var encodedKey  =  encodeURIComponent("animal")
                var encodedValue = encodeURIComponent(`${data[i].animal}in${data[i].country}`)
                form_data.push(encodedKey + "=" + encodedValue)
                let firstData = await fetch('/users/removeFavorite', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    },
                    body:form_data
                })
                let secondData = await firstData.json();
                if(secondData.success == true) {
                    btn.innerHTML = "Favorite";
                    btn.removeEventListener("click", removeFunc);
                    btn.addEventListener("click", addFunc);
                }
            };
            let addFunc = async function() {
                var encodedKey  =  encodeURIComponent("animal")
                var encodedValue = encodeURIComponent(`${data[i].animal}in${data[i].country}`)
                form_data.push(encodedKey + "=" + encodedValue)
                let firstData = await fetch('/users/addFavorite', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded"
                    },
                    body:form_data
                });
                let secondData = await firstData.json();
                if(secondData.success == false){
                    window.location.assign("/users/login");
                } else {
                    btn.innerHTML = "Favorited";
                    btn.removeEventListener("click", addFunc);
                    btn.addEventListener("click", removeFunc);
                }
            }
            let div = document.createElement("div");
            div.classList.add("p-2", "m-2", "w-25", "text-center", "results");
            let btnOne = document.createElement("button");
            btnOne.addEventListener("click", () => {
                location.assign(`/animals/one/${data[i].animal}/${data[i].country}`);
            })
            btnOne.innerHTML = "Read More";
            let h1 = document.createElement("h1");
            h1.innerHTML = data[i].animal;
            let btn = document.createElement("button");
            let getFavs = async function() {
                let favs = await axios.get("/users/getFavorites");
                favs = favs.data;
                if(favs.success == true){
                    if(favs.data.includes(`${data[i].animal}in${data[i].country}`)) {
                        btn.addEventListener("click", removeFunc)
                        btn.innerHTML = "Favorited";
                    } else {
                        btn.addEventListener("click", addFunc)
                        btn.innerHTML = "Favorite";
                    }
                } else {
                    btn.addEventListener("click", addFunc)
                    btn.innerHTML = "Favorite";
                }
            }
            getFavs();
            let h5 = document.createElement("h5");
            h5.innerHTML = data[i].country;
            div.appendChild(h1);
            div.appendChild(h5);
            div.appendChild(btnOne);
            div.appendChild(btn);
            all.appendChild(div);
        }
}
fillPage();