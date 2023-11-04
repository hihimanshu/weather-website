console.log('Client side Javascript loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log('testing');
    const location = search.value
    messageOne.textContent='Loading....'
    messageTwo.textContent='..'
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            //console.log('Error '+data.error);
            messageOne.textContent = data.error
        } else{
            //console.log('address: '+data.address+' temparature: '+data.temperature);
            messageOne.textContent='Location is : '+data.address
            messageTwo.textContent='Temperature is: '+data.temperature
        }
    })
})
})