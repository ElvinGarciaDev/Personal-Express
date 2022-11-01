document.getElementById('updateButton').addEventListener('click', updateEntry) // Add eventListener
const deleteCharacter = document.getElementsByClassName('fa-solid') // Creates a node list

// Convert nodeList to an array and add eventLisiner to all trash cans
Array.from(deleteCharacter).forEach(element => {
    element.addEventListener('click', deletePerson)
})

// Function runs when the button is clicked
async function updateEntry() {
    try{
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "characterName": document.getElementsByName('characterName')[0].value,
                "characterHouse": document.getElementsByName('characterHouse')[0].value,
                "characterTitle": document.getElementsByName('characterTitle')[0].value,
                "characterDescription": document.getElementsByName('characterDescription')[0].value,
                "DeadAlive": document.getElementsByName('DeadAlive')[0].value,
            })

        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

// Function runs when a trash can is clicked
async function deletePerson() {
    let characeter = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].innerText // Get the inner text from the clicked trash can. With the HTML DOM, you can navigate the node tree using node relationships.
    // this means look at the element i clicked and get me this location. The DOM structor is a tree

    // We get back example: name: Aemond We only want Aemond so we need to remove name:
    let strArr = characeter.split("")
    strArr.splice(0,6)
    characeter = strArr.join("")

    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'characeterName' : characeter // Send the innerText of the clicked trash can. Should have a charactername to delete
            })
        })
        const data = await response.json()
        console.log(data)
        
    } catch(err) {
        console.log(err)
    }
}