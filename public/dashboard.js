let all = document.getElementById("bits")
let fillPage = async function() {
    let {data} = await axios.get("/users/getFavorites");
    data = data.data;
    console.log(data);
    for(let i = 0; i < data.length; i++) {
        let object = {
            animal: data[i].slice(0, data[i].indexOf("in")),
            country: data[i].slice(data[i].indexOf("in") + 2)
        }
        data[i] = object;
    }
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
                div.style.display = "none";
            }
        };
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
        btn.addEventListener("click", removeFunc)
        btn.innerHTML = "Favorited";
        let h3 = document.createElement("h3");
        h3.innerHTML = data[i].country;
        div.appendChild(h1);
        div.appendChild(h3);
        div.appendChild(btnOne);
        div.appendChild(btn);
        all.appendChild(div);
    }
}
fillPage();
