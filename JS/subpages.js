var buttons = document.querySelectorAll(".card.button")

Array.prototype.forEach.call(buttons, function(btn) {
    btn.addEventListener("mousedown", function(){
        btn.classList.add("down")
    })

    btn.addEventListener("mouseup", function(){
        btn.classList.remove("down")
    })

    btn.addEventListener("click", async function(){
        document.body.classList.add("transition-link")
        await sleep(1000)
        window.location.href = transformLink(btn.getAttribute("link"))
        // enableButtons()
        // loader.classList.remove("active")
    })
})

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))