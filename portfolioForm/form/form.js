const form = document.getElementById('test-form')
let personName = document.getElementById('personName')
let email = document.getElementById('email')
let subject = document.getElementById('subject')
let message = document.getElementById('message')
const btn = document.getElementById('submit')


form.addEventListener('submit', (e) => {

    e.preventDefault();

    /* fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'ContentType': 'application/json'
        },
        body: JSON.stringify({
            name: personName.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }) */

    let formData = {
            name: personName.value,
            email: email.value,
            subject: subject.value,
            message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function (){
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert('Email sent')
            personName.value = ''
            email.value = ''
            subject.value = ''
            message.value = ''
        }else{
            alert('Error sending')
        }
    }

    xhr.send(JSON.stringify(formData))
})