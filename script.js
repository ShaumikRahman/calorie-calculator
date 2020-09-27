//document.getElementById('heightSecondary').style.display = "none";
//document.getElementById('weightSecondary').style.display = "none";

// auto complete height from cm
document.getElementById('height').addEventListener('input', e => {
    cmToFeetInches(e.target.value);
    document.getElementById('feet').value = newFeet;
    document.getElementById('inches').value = newInch;
})

// auto complete height from feet
document.getElementById('feet').addEventListener('input', e => {
    if (document.getElementById('inches').value.length <= 0) {
        document.getElementById('height').value = parseInt(e.target.value * 30.48);
    } else {
        document.getElementById('height').value = (parseInt(e.target.value) + 
        parseFloat(document.getElementById('inches').value / 12)) * 30.48;
    }
})

// // auto complete height from inches
// document.getElementById('inches').addEventListener('input', e => {
//     if (document.getElementById('feet').value.length <= 0) {
//         document.getElementById('height').value = parseFloat(e.target.value / 12) * 30.48;
//     } else {
//         document.getElementById('height').value = (parseFloat(e.target.value / 12) +
//         document.getElementById('feet').value) * 30.48;
//     }
// })

const form = document.getElementById('form');
let validated = false;
let alertActive = false;
let age,gender,height,feet,inches,weight,stone,pound;
let newFeet, newInch;
form.addEventListener('submit', e => {
    e.preventDefault();
    validationCheck();
    if (validated == true) {
        conversion();
        assignVariables();
        calculate();
        outputAll();
    }
    
})

function validationCheck() {
    if (form.elements[0].value.length <= 0 || 
        form.elements[3].value.length <= 0 || 
        form.elements[6].value.length <= 0) {
            validated = false;
            alertActive = true;
            if (alertActive != false) {
                document.getElementById('alert').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Age, Height and Weight</strong> are required<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
                alertActive = false;
            }
    } else {
        validated = true;
    }
}

function assignVariables() {
    age = form.elements[0].value;
    if (form.elements[1].checked == true) {
        gender = 'male';
    } else {
        gender = 'female';
    }
    height = form.elements[3].value;
    weight = form.elements[6].value;
}

function calculate() {

}

function outputAll() {
    // console.log('first values');
    // for (let i = 0; i < form.elements.length; i++) {
    //     console.log(`element ${i} is ${form.elements[i].value}`);
    // }
    // console.log('second values');
    console.log(age);
    console.log(gender);
    console.log(height);
    console.log(weight);
}

function cmToFeetInches(cm) {
    console.log(`incoming cm is ${cm}`);
    let cmConverted = cm / 30.48;
    console.log(`converted cm is ${cmConverted}`);
    newFeet = Math.floor(cmConverted);
    console.log(`feet is ${newFeet}`);
    newInch = (cmConverted - newFeet) * 12;
    console.log(`inch is ${newInch}`);
}

// Feet+Inch = cm / 30.48, integer = feet, fraction * 12 = inch
// BMR = 10W + 6.25H - 5A + 5 male
// BMR = 10W + 6.25H - 5A - 161 female