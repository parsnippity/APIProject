let header = document.getElementById("oneHeader");
let bits = document.getElementById("bits");
let animalName = header.getAttribute("value");
let test = async function() {
  animalName = animalName.split(", ")[0];
  let {data} = await axios.get(`/externalAPI?name=${animalName}`);
  data = data[0];
  let h1 = document.createElement("h1");
  h1.innerHTML = data.name;
  bits.appendChild(h1);
  let h3 = document.createElement("h3");
  h3.innerHTML = header.getAttribute("value");
  bits.appendChild(h3);
  let h32 = document.createElement("h3");
  h32.innerHTML = "Taxonomy";
  bits.appendChild(h32);
  for (const [key, value] of Object.entries(data.taxonomy)) {
    let p = document.createElement("p");
    let newKey = key;
    if(key.indexOf("_") != -1){
      newKey = key.replace("_", " ")
    }
    p.innerHTML = `<span class="captions">${newKey}</span>: ${value}`
    bits.appendChild(p);
  }
  let h33 = document.createElement("h3");
  h33.innerHTML = "Characteristics";
  bits.appendChild(h33);
  for (const [key, value] of Object.entries(data.characteristics)) {
    let p = document.createElement("p");
    let newKey = key;
    let newValue = value;
    if(key == "color") {
      let str1 = value;
      const regex1 = /[a-z][A-Z]/gm
      let array1;
      let myArray = [];
      let secondArray = [];
      while ((array1 = regex1.exec(str1)) !== null) {
          myArray.push(regex1.lastIndex - 2);
      }
      for(let i = 0; i <= myArray.length; i++) {
        if(i == 0) {
          secondArray.push(str1.slice(0, myArray[i] + 1))
        } else if(i == myArray.length) {
          secondArray.push(str1.slice(myArray[i - 1] + 1));
        } else {
          secondArray.push(str1.slice(myArray[i - 1] + 1, myArray[i] + 1));
        }
      }
      newValue = secondArray.join(", ");
    }
    if(key.indexOf("_") != -1){
      newKey = key.replace("_", " ")
    }
    p.innerHTML = `<span class="captions">${newKey}</span>: ${newValue}`
    bits.appendChild(p);
  }
}
test();
