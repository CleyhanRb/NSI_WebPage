// Mise en place du color picker

if(picker == null){
    var picker = document.querySelector("input#picker")
    setupPicker()
    picker.addEventListener("change", () => pickColorChange())
}

// Events mousedown, mouse up et click pour chaque Card

var cards = document.querySelectorAll("li.card")

Array.prototype.forEach.call(cards, function(card){
    card.addEventListener("mousedown", function(){
        card.classList.add("down")
    })
    card.addEventListener("mouseup", function(){
        card.classList.remove("down")
    })

    card.addEventListener("click", async function(e){
        if (card.hasAttribute("link")){
            disableButtons()
            loader = document.querySelector(".loader")
            loader.classList.add("active")
            await sleep(1000)
            document.body.classList.add("transition-link")
            await sleep(1000)
            window.location = transformLink(card.getAttribute("link"))
        }
        
        if (card.hasAttribute("speciallink")){
            window.location = card.getAttribute("speciallink")
        }
        // enableButtons()
        // loader.classList.remove("active")
    })
})


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// Enable, Disable Buttons

function disableButtons(){
    Array.prototype.forEach.call(cards, function(card){
        card.classList.add("down")
        card.setAttribute("disabled", null)
    })
}

function enableButtons(){
    Array.prototype.forEach.call(cards, function(card){
        card.classList.remove("down")
        card.removeAttribute("disabled")
    })
}


