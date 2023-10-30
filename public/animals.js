//wip make match
let all = document.getElementById("bits");
let fillPage = async function() {
    let {data} = await axios.get(`/animalAPI/all`);
    data = data.data;
    for(let i = 0; i < data.length; i++){
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
        btn.addEventListener("click", async function() {
            form_data = []
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
            if(test.success == false){
                window.location.assign("/users/login");
            }
        })
        btn.innerHTML = "favorite";
        let h3 = document.createElement("h3");
        h3.innerHTML = data[i].country;
        div.appendChild(h1);
        div.appendChild(h3);
        bigDiv.appendChild(div);
        bigDiv.appendChild(btn);
        all.appendChild(bigDiv);
    }
}
fillPage();