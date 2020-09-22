let formData;
const form = document.getElementById('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    for (let i = 0; i < form.elements.length; i++) {
        console.log(`element ${i} is ${form.elements[i].value}`);
    }
})