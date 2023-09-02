var open = 0;
let disData = document.getElementById("mainData");

let len = $(".nav").outerWidth(true);
let len2 = $(".sidebar").outerWidth(true);
$(".nav").css("z-index", "5555555555555");
let mainLin = len - len2;
$(".nav").css("left", -mainLin);
//******************************NAV Close & Open**************** */
let Lin = document.querySelectorAll(".links li");
Lin.forEach((e) => {
    e.addEventListener("click", function () {
        $(".nav").animate({ left: -mainLin }, 900)
        $(".close").removeClass("fa-xmark");
        $(".close").addClass("fa-bars");
        open = 0;
        $(".links li").animate({
            top: 200
        }, 500)

    })
})

$(".close").click(function () {
    if (open === 0) {
        $(".nav").animate({ left: 0 }, 400)

        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({
                top: 0
            }, (i + 5) * 150)
        }

        $(".close").removeClass("fa-bars");
        $(".close").addClass("fa-xmark");
        $(".nav").css("z-index", "5555555555555");

        open = 1;

    } else {
        $(".nav").animate({ left: -mainLin }, 900)
        $(".close").removeClass("fa-xmark");
        $(".close").addClass("fa-bars");

        open = 0;

        $(".links li").animate({
            top: 200
        }, 500)
    }

})

// **************************************************colse nav bar when press to any item******************************

// ***************************************Search Data ********************************************
document.getElementById("Search").addEventListener("click", showSearchInputs)
function showSearchInputs() {
    $("#load").removeClass('d-none');
    disData.innerHTML = "";
    document.getElementById("contact").innerHTML = ""

    temp = `
    <div class="container py-5 searchInputs " id="searchInputs">
    <div class="row gy-3">
        <div class="col-lg-6"> <input onKeyup="SearchByName()" type="text" class="form-control me-5" id="name" placeholder="Search By Name">
        </div>
        <div class="col-lg-6"> <input onKeyup="SearchByFirstLetter()" maxlength="1" type="text" class="form-control" id="firstLetter" placeholder="Search By First Letter">
        </div>
    </div>
       </div>
    <div class="container nnnn py-4">
    <div class="row gy-3" id="mainData2">
 
    </div>
</div>
`
    // hwar el input------zabatooo-------

    $(".Links").animate({ left: 0 }, 900)
    $(".close").removeClass("fa-xmark");
    $(".close").addClass("fa-bars");

    document.getElementById("content").innerHTML = temp;
    $("#load").addClass('d-none');
}
async function SearchByName() {
    $("#load").removeClass('d-none');
    $("#firstnamealert").addClass("d-none")
    disData.innerHTML = "";
    let Name = document.getElementById("name").value;


    let byname = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`)
    let Data = await byname.json();

    searchDisplay(Data.meals);
    $("#load").addClass('d-none');



}
async function SearchByFirstLetter() {
    $("#load").removeClass('d-none');
    disData.innerHTML = "";
    document.getElementById("mainData2").innerHTML = "";
    let FirstLetter = document.getElementById("firstLetter").value;
    let byname = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`)
    let Data2 = await byname.json();
    searchDisplay(Data2.meals);
    $("#load").addClass('d-none');

}

function searchDisplay(Data) {

    let temp = "";
    Data?.forEach((e) => {
        temp += `
        <div  class="col-lg-3">
        <div class="item position-relative" id=${e.idMeal}>
            <img src="${e.strMealThumb}" class="w-100" alt="">
             <div class="cover">
            <h3 class="ps-2">${e.strMeal}</h3>
        </div>
        </div>
    </div>`
    })
    document.getElementById("mainData2").innerHTML = temp;
    itemsfunc();
}

// ******************************************Random Data Start*******************************************
let mainData = [];
async function getRendomMeal() {
    $("#load").removeClass('d-none');
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    respone = await respone.json()
    mainData = await respone.meals;
    displayMainData(mainData)
    $("#load").addClass('d-none');
}
getRendomMeal();
// ************************************* Dispalay Data method *********************
function displayMainData(Data) {
    let temp = "";
    Data.forEach((e) => {
        temp += `
        <div  class="col-lg-3">
        <div class="item position-relative" id=${e.idMeal}>
            <img src="${e.strMealThumb}" class="w-100" alt="">
             <div class="cover">
            <h3 class="ps-2">${e.strMeal}</h3>
        </div>
        </div>
    </div>`
    })

    disData.innerHTML = temp;
    itemsfunc();

}
// ************************************* Item clicked method *********************
function itemsfunc() {
    let items = document.querySelectorAll(".item");
    items.forEach((e) => {
        e.addEventListener("click", function () {
            $(".nav").animate({ left: -mainLin }, 900)
            $(".close").removeClass("fa-xmark");
            $(".close").addClass("fa-bars");
            open = 0;
            displayDetailsData(e.id);
        })
    })
}
// ************************************* Item Inner (Show) method *********************
async function displayDetailsData(mealID) {
    $("#load").removeClass('d-none');
    document.getElementById("contact").innerHTML = ""
    disData.innerHTML = "";

    let myreqId = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let data = await myreqId.json();
    dsplayOneMeal(data.meals[0]);
    $("#load").addClass('d-none');
}
async function Back() {
    location.reload()

}

function dsplayOneMeal(data) {
    let strMeasure = '';
    for (let i = 1; i < 10; i++) {
        if (data[`strIngredient${i}`]) {
            strMeasure += `<li class="recipeItem mb-2">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>
        `
        }
    }
    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsS = ''
    for (let i = 0; i < tags.length; i++) {
        tagsS += `
        <li class="TagsItem mb-2">${tags[i]}</li>
        `
    }


    let temp = "";
    temp += `<div class="container py-5">
    <i onclick="Back()"  class="fa-solid fa-xmark position-relative flex-row-reverse fa-3x w-100 d-flex justify-content-start text-white"></i>
    <div class="row">
    
        <div class="col-lg-4 rounded-2">
            <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="">
            <h2 class="text-white">${data.strMeal}</h2>
        </div>
        <div class="col-lg-8">
            <h2 class="text-white">Instructions</h2>
            <p class="text-white">
               ${data.strInstructions}</p>

                <h2 class="text-white"><span class="fw-bold">Area : </span>${data.strArea}</h2>
                <h2 class="text-white"><span class="fw-bold">Category : </span>${data.strCategory}</h2>
                <h2 class="text-white  mb-4"><span class="fw-bold">Recipes : </span></h2>
                <ul class=" list-unstyled ps-3 ">
                    ${strMeasure}
                </ul>

                <h2 class="text-white mb-4"><span class="fw-bold">Tags : </span></h2>
                <ul class=" list-unstyled ps-3">
                ${tagsS}
                   
                   
                </ul>

                <button class="btn btn-success px-3"><a class="text-decoration-none text-white" href="${data.strSource}" target="_blank">Source</a></button>
                <button class="btn btn-danger px-3"><a class="text-decoration-none text-white" href="${data.strYoutube}" target="_blank">Youtube</a></button>

        </div>
    </div>
</div>`

    document.getElementById("content").innerHTML = temp;
}
// **************************End OF it****************************************


// *******************************Categories**********************************************

document.getElementById("Categories").addEventListener("click", function () {
    document.getElementById("content").innerHTML = "";
    document.getElementById("contact").innerHTML = " "
    $(".close").removeClass("fa-xmark");
    $(".close").addClass("fa-bars");
    $(".nnnn").addClass("d-none")
    $("searchInputs").addClass("d-none")
    getCategories();


})

async function getCategories() {
    $("#load").removeClass('d-none');
    let req = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data = await req.json();
    displayCat(data.categories);
    catfunc();
    $("#load").addClass('d-none');
}

function displayCat(data) {
    let temp = "";

    data.forEach((e) => {
        let tags = e.strCategoryDescription?.split(" ")
        if (!tags) tags = []

        let tagsS = ''
        for (let i = 0; i < 20; i++) {
            tagsS += `
            ${tags[i]}
            `
        }
        temp += `
        <div  class="col-lg-3">
        <div class="itemcat position-relative" id=${e.strCategory}>
            <img src="${e.strCategoryThumb}" class="w-100" alt="">
             <div class="coverr flex-column">
             <h3 class="text-black">${e.strCategory}</h3>
            <p class="ps-2 text-center">${tagsS}</p>
        </div>
        </div>
    </div> 
    `
    });
    disData.innerHTML = temp;
}
//  *******************************category clicked****************************
function catfunc() {
    let itemcats = document.querySelectorAll(".itemcat");
    itemcats.forEach((e) => {
        e.addEventListener("click", function () {
            $(".nav").animate({ left: -mainLin }, 900)
            $(".close").removeClass("fa-xmark");
            $(".close").addClass("fa-bars");
            open = 0;
            getcat(e.id);
        })
    })
}
//  *******************************category get****************************

async function getcat(id) {
    $("#load").removeClass('d-none');
    let myreqId = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
    let data = await myreqId.json();
    displayCatData(data.meals.slice(0, 20));
    $("#load").addClass('d-none');
}

function displayCatData(Data) {
    let temp = "";
    for (let i = 0; i < Data.length; i++) {
        temp += `
        <div  class="col-lg-3">
        <div class="item position-relative" id=${Data[i].idMeal}>
            <img src="${Data[i].strMealThumb}" class="w-100" alt="">
             <div class="cover">
            <h3 class="ps-2">${Data[i].strMeal}</h3>
        </div>
        </div>
    </div>`
    }
    disData.innerHTML = temp;
    itemsfunc();

}
// ******************************Area**********************************************

document.getElementById("Area").addEventListener("click", getAreas);
async function getAreas() {
    $("#load").removeClass('d-none');
    document.getElementById("content").innerHTML = "";
    document.getElementById("contact").innerHTML = "";
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await req.json();

    displaycountries(data.meals);
    $("#load").addClass('d-none');
}

function displaycountries(Data) {
    let temp = "";
    Data.forEach((e) => {
        temp += `
     
      <div  class="col-lg-3">
      <div class="mx-auto">
      <div class="itemArea d-flex  justify-content-center flex-column" id="${e.strArea}">
      <i class="fa-solid fa-house-laptop text-white mx-auto  fa-4x"></i>
      <h2 class="ps-2 text-white mx-auto ">${e.strArea}</h2>
      </div>
     
  </div>
  </div>
    `
    })
    disData.innerHTML = temp;
    getItemArea();
}
function getItemArea() {
    let list = document.querySelectorAll(".itemArea");
    list.forEach((e) => {
        e.addEventListener("click", function () {
            $(".nav").animate({ left: -mainLin }, 900)
            $(".close").removeClass("fa-xmark");
            $(".close").addClass("fa-bars");
            open = 0;
            getcounteryData(e.id)
        })
    })
}

async function getcounteryData(id) {
    $("#load").removeClass('d-none');
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
    let data = await req.json();
    displayCatData(data.meals);
    $("#load").addClass('d-none');
}


// *********************************ingredianse**********************************************

// https://www.themealdb.com/api/json/v1/1/list.php?i=list
document.getElementById("Ingrediants").addEventListener("click", getingrediants);
async function getingrediants() {
    $("#load").removeClass('d-none');
    document.getElementById("content").innerHTML = "";
    disData.innerHTML = "";
    document.getElementById("contact").innerHTML = "";
    let myreq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await myreq.json();
    displayIng(data.meals.slice(0, 20))
    $("#load").addClass('d-none');
}
function displayIng(Data) {
    let temp = "";

    Data.forEach((e) => {
        let tags = e.strDescription?.split(" ")
        if (!tags) tags = []

        let tagsS = ''
        for (let i = 0; i < 20; i++) {
            tagsS += `
        ${tags[i]}
        `
        }
        temp += `
     
      <div  class="col-lg-3">
      <div class="mx-auto">
      <div class="itemIng d-flex  justify-content-center flex-column" id="${e.strIngredient}">
      <i class="fa-solid fa-drumstick-bite text-white mx-auto  fa-4x"></i>
      <h2 class="ps-2 text-white text-center mx-auto ">${e.strIngredient}</h2>
      <p class="ps-2 text-center text-white mx-auto ">${tagsS}</p>
      </div>
     
  </div>
  </div>
    `
    })
    disData.innerHTML = temp;
    getIngdetails();
}
function getIngdetails() {
    let list = document.querySelectorAll(".itemIng");
    list.forEach((e) => {
        e.addEventListener("click", function () {
            $(".nav").animate({ left: -mainLin }, 900)
            $(".close").removeClass("fa-xmark");
            $(".close").addClass("fa-bars");
            open = 0;
            getIngData(e.id)
        })
    })
}

async function getIngData(id) {
    $("#load").removeClass('d-none');
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`)
    let data = await req.json();
    displayCatData(data.meals);
    $("#load").addClass('d-none');
}

// ******************************Contact section*******************************************
document.getElementById("ContactUS").addEventListener("click", showSearchContct)
function showSearchContct() {
    document.getElementById("content").innerHTML = "";
    disData.innerHTML = "";
    temp = `

    <div class="row gy-4" >
                    
    <div class="col-lg-6">
    <input type="text" onKeyup="validName()" class="form-control bg-white text-black" id="namee" placeholder="Enter Your Name">
    <div id="NAMEALT" class="alert alert-danger w-100 mt-2 d-none">
    Special characters and numbers not allowed
    </div>
    </div>


            <div class="col-lg-6">
                <input type="email" onKeyup="validEmail()"  class="form-control bg-white text-black" id="email" placeholder="Enter Your Email">
                <div id="EMAILALT" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
            </div>
            </div>


            <div class="col-lg-6">
                <input  onKeyup="validPhone()" type="text" class="form-control bg-white text-black" id="phone" placeholder="Enter Your Phone">
                <div id="PHONEALT" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number exemple 01(0,1,2,5)88888989
            </div>
                </div>


            <div class="col-lg-6">
                <input type="number" onKeyup="validAge()" class="form-control bg-white text-black" id="age" placeholder="Enter Your Age">
                <div id="AGEEALT" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
            </div>
                </div>
            <div class="col-lg-6">
                <input type="password" onKeyup="validPassword()" class="form-control bg-white text-black" id="password" placeholder="Enter Your Password">
                <div id="PASSALT" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
            </div>
            <div class="col-lg-6">
            <input onKeyup="validRePassword()" type="password" class="form-control bg-white text-black" id="repassword" placeholder="Enter Your Password">
            <div id="REPASSALT" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid repassword*
            </div>
            </div>         
    
    </div>
    <button id="submitBtn"  class="disabled btn btn-outline-danger px-2 mt-3">Submit</button>
  
                   
`

    $(".Links").animate({ left: 0 }, 900)
    $(".close").removeClass("fa-xmark");
    $(".close").addClass("fa-bars");


    document.getElementById("contact").innerHTML = temp;
}
var nameIN = false;
var EmailIN = false;
var passwordIn = false;
var repassword = false;
var ageIn = false;
var phoneIN = false;

function validName() {

    let NAME = document.getElementById("namee").value;
    const NameReg = /^[A-Za-z\s]+$/;
    let isValidEmail = NameReg.test(NAME);
    if (isValidEmail === false) {
        $("#NAMEALT").removeClass("d-none");
        nameIN = false;
    } else {
        $("#NAMEALT").addClass("d-none");
        nameIN = true;

    }
    btndisaple();
}
function validEmail() {

    let Email = document.getElementById("email").value;
    const EmailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValidEmail = EmailReg.test(Email);
    if (isValidEmail === false) {
        $("#EMAILALT").removeClass("d-none");
        EmailIN = false;
    } else {
        $("#EMAILALT").addClass("d-none");
        EmailIN = true;

    }

    btndisaple();
}
function validPhone() {

    let PHONE = document.getElementById("phone").value;
    const PhoneReg = /^01[1205][0-9]{8}$/;
    let isValidPhone = PhoneReg.test(PHONE);
    if (isValidPhone === false) {
        $("#PHONEALT").removeClass("d-none");
        phoneIN = false;
    } else {
        $("#PHONEALT").addClass("d-none");
        phoneIN = true;
    }
    btndisaple();
}
function validAge() {

    let AGE = document.getElementById("age").value;
    const AGEReg = /^(0?[1-9]|[1-9][0-9]|[1][0-2][0-9])$/;
    let isValidAGE = AGEReg.test(AGE);
    if (isValidAGE === false) {
        $("#AGEEALT").removeClass("d-none");
        ageIn = false;
    } else {
        $("#AGEEALT").addClass("d-none");
        ageIn = true;

    }
    btndisaple();

}
function validPassword() {

    let PASS = document.getElementById("password").value;
    const PASSReg = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    let isValidPASS = PASSReg.test(PASS);
    if (isValidPASS === false) {
        $("#PASSALT").removeClass("d-none");
        passwordIn = false;
    } else {
        $("#PASSALT").addClass("d-none");
        passwordIn = true;
    }
    btndisaple();
}
function validRePassword() {

    let PASS = document.getElementById("password").value;
    let REPASS = document.getElementById("repassword").value;
    if (PASS !== REPASS) {
        $("#REPASSALT").removeClass("d-none");

        repassword = false;

    } else {
        $("#REPASSALT").addClass("d-none");
        repassword = true;
    }
    btndisaple();
}
function btndisaple() {
    if (EmailIN === true && nameIN === true && passwordIn === true && phoneIN === true && ageIn === true && repassword === true) {
        $("#submitBtn").removeClass("disabled");
    } else {
        $("#submitBtn").addClass("disabled");
    }

}
// ************************************EEEEEEENNNNDDDDDDDDD**********************