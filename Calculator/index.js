const button = document.getElementById("add");

button.addEventListener("click", () => {
    const first = document.getElementById("first").value;
    const second = document.getElementById("second").value;

    const ans = document.getElementById("answer");

    const sum = parseInt(first) + parseInt(second);
    ans.innerHTML = sum;
})