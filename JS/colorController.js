var picker = document.querySelector("input#picker")
var r = document.querySelector(':root');

if (picker != null){


    console.log("Picker Found")
    search = new URLSearchParams(window.location.search)
    if (search.has("color")){
        setupPicker()
        r.style.setProperty("--main-color", "#" + search.get("color").toString())
        console.log("Main color set to:" + "#" + search.get("color").toString())
    }
    
    picker.addEventListener("change", () => pickColorChange())

}
else
{
    console.log("Picker Not Found")
    search = new URLSearchParams(window.location.search)
    if (search.has("color")){
        r.style.setProperty("--main-color", "#" + search.get("color").toString())
        console.log("Main color set to:" + search.get("color").toString())
    }
}

if (search.has("upcolor")){
    r.style.setProperty("--uppershadow-color", "#" + search.get("upcolor").toString())
}
if (search.has("downcolor")){
    r.style.setProperty("--bottomshadow-color", "#" + search.get("downcolor").toString())
}
if (search.has("disabledTextColor")){
  r.style.setProperty("--disabled-text-color", "#" + search.get("disabledTextColor").toString())
}
if (search.has("darktheme")){
  if (search.get("darktheme") == "true") {
    r.style.setProperty("--main-font-color", "var(--dark-theme-font-color)")
  }else{
    r.style.setProperty("--main-font-color", "var(--light-theme-font-color)")
  }
}


// Fonctions avec le color picker

function pickColorChange(event){
    differenceValue = "0f0f0f"
    differenceTextValue = "050505"

    r.style.setProperty("--main-color", picker.value)

    if (moyenneHexColor(picker.value.substring(1)) < 125) {
      r.style.setProperty("--main-font-color", "var(--dark-theme-font-color)")
    }else{
      r.style.setProperty("--main-font-color", "var(--light-theme-font-color)")
    }

    upvalue = substractHexColor(picker.value.substring(1), differenceValue)
    downvalue = addHexColor(picker.value.substring(1), differenceValue)
    disabledvalue = addHexColor(picker.value.substring(1), differenceTextValue)

    r.style.setProperty("--uppershadow-color", "#" + upvalue)
    r.style.setProperty("--bottomshadow-color", "#" + downvalue)
    r.style.setProperty("--disabled-text-color", "#" + downvalue)
}

function setupPicker(){
    if (search.has("color")){
        picker.setAttribute('value', "#" + search.get("color").toString())
    }
}

// Fonction pour avoir le lien avec paramètres

function transformLink(link){
  if (r.style.getPropertyValue("--main-color") == ''){
    pickColorChange()
  }
    return link + "?color=" + r.style.getPropertyValue("--main-color").substring(1) + 
    "&upcolor=" + r.style.getPropertyValue("--uppershadow-color").substring(1) + 
    "&downcolor=" + r.style.getPropertyValue("--bottomshadow-color").substring(1) +
    "&disabledTextColor=" + r.style.getPropertyValue("--disabled-text-color").substring(1) + 
    "&darktheme=" + isDarkTheme()
}

function isDarkTheme(){
  if (r.style.getPropertyValue("--main-font-color") == "var(--dark-theme-font-color)" || r.style.getPropertyValue("--main-font-color") == "") {
    return true
  }else{
    return false
  }
}

// Fonctions de calcul avec des couleurs

function addHexColor(c1, c2) {
    const octetsRegex = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
    const m1 = c1.match(octetsRegex)
    const m2 = c2.match(octetsRegex)
    if (!m1 || !m2) {
      throw new Error(`Couleur Invalide: ${c1} / ${c2}`)
    }
    return [1, 2, 3].map(i => {

      sum = parseInt(m1[i], 16) + parseInt(m2[i], 16)

      if (sum > 0xff) {
        sum = 0xff
      }
      return sum.toString(16).padStart(2, '0')

    }).join('')
}

function substractHexColor(c1, c2) {
  const octetsRegex = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
  const m1 = c1.match(octetsRegex)
  const m2 = c2.match(octetsRegex)
  if (!m1 || !m2) {
    throw new Error(`Couleur Invalide: ${c1} / ${c2}`)
  }
  return [1, 2, 3].map(i => {
    sum = parseInt(m1[i], 16) - parseInt(m2[i], 16)
    if (sum < 0x00) {
      sum = 0x01
    }
    return sum.toString(16).padStart(2, '0')
  }).join('')
}

function moyenneHexColor(c1) {
  const octetsRegex = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
  const m1 = c1.match(octetsRegex)
  if (!m1) {
    throw new Error(`Couleur Invalide: ${c1}`)
  }
  return (parseInt(m1[3], 16) + parseInt(m1[1], 16) + parseInt(m1[2],16))/3
}