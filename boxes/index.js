const main = document.getElementById("main");

const list = ["first", "second", "third", "fourth", "fifth"];

function section(i) {
    box = document.createElement("div");
    box.className = list[i];
    main.appendChild(box);
    return box;
}

function boxes() {
    const box = document.createElement("div");
    box.className = "box";
    return box;
}

for (let i = 0; i < 5; i++){
    sec = section(i);
    for (let j = 0; j < 5; j++){
        sec.appendChild(boxes());
    }
}