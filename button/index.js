let counter = 0

function div(){
    const div = document.createElement("div");
    const p = document.createElement("P")
    const node = document.createTextNode(`CLIKED: ${counter}`);
    p.appendChild(node);
    div.appendChild(p);
    div.className = "box";
    return div
}

const element = document.getElementById('main');
const diven = div()
console.log(diven)
element.appendChild(diven);


const button = document.createElement("button");
button.appendChild(document.createTextNode("Click Here"));

element.appendChild(button);

button.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".box");
    counter += 1;
    boxes.forEach((box) => {
        const p = box.querySelector("p");
        p.innerHTML = `CLICKED: ${counter}`;
    });
})

function resetCounter() {
    const boxes = document.querySelectorAll(".box");
    counter = 0;
    boxes.forEach((box) => {
        const p = box.querySelector("p");
        p.innerHTML = `CLICKED: ${counter}`;
    });
    const bottom = document.getElementById("bottom");
    console.log(counter/ 10)
    bottom.appendChild(document.createTextNode(`Your average click per second is ${counter/ 10}`))
}

//setInterval(resetCounter, 10000);