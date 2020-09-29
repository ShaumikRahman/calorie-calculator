document.getElementById('clear').addEventListener('click', e => {
    document.getElementById('form').reset();
})

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

// auto complete height from inches
document.getElementById('inches').addEventListener('input', e => {
    if (document.getElementById('feet').value.length <= 0) {
        document.getElementById('height').value = parseFloat((e.target.value / 12) * 30.48);
    } else {
        document.getElementById('height').value = (parseInt(document.getElementById('feet').value) + 
        parseFloat(e.target.value / 12)) * 30.48;
    }
})

// auto complete weight from kg
document.getElementById('weight').addEventListener('input', e => {
    kgToStonePounds(e.target.value);
    document.getElementById('stone').value = newStone;
    document.getElementById('pounds').value = newPound;
})

// auto complete weight from stone
document.getElementById('stone').addEventListener('input', e => {
    if (document.getElementById('pounds').value.length <= 0) {
        document.getElementById('weight').value = parseInt(e.target.value * 6.35029318);
    } else {
        document.getElementById('weight').value = (parseInt(e.target.value) + 
        parseFloat(document.getElementById('pounds').value / 14)) * 6.35029318;
    }
})

// auto complete weight from pounds
document.getElementById('pounds').addEventListener('input', e => {
    if (document.getElementById('stone').value.length <= 0) {
        document.getElementById('weight').value = parseFloat((e.target.value / 14) * 6.35029318);
    } else {
        document.getElementById('weight').value = (parseInt(document.getElementById('stone').value) + 
        parseFloat(e.target.value / 14)) * 6.35029318;
    }
})

const form = document.getElementById('form');
let validated = false;
let alertActive = false;
let age,gender,height,feet,inches,weight,stone,pound,BMR;
let newFeet, newInch, newStone, newPound;
form.addEventListener('submit', e => {
    e.preventDefault();
    validationCheck();
    if (validated == true) {
        assignVariables();
        calculate();
        output();
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
    if (gender == 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

function output() {
    document.getElementById('output').innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>'+BMR+'</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
}

function cmToFeetInches(cm) {
    let cmConverted = cm / 30.48;
    newFeet = Math.floor(cmConverted);
    newInch = (cmConverted - newFeet) * 12;
}

function kgToStonePounds(kg) {
    let kgConverted = kg / 6.35029318;
    newStone = Math.floor(kgConverted);
    newPound = (kgConverted - newStone) * 14;
}

// Feet+Inch = cm / 30.48, integer = feet, fraction * 12 = inch
// BMR = 10W + 6.25H - 5A + 5 male
// BMR = 10W + 6.25H - 5A - 161 female