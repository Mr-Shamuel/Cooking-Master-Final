const search = () => {

    const inputValue = document.getElementById('input-meal').value;
    if (inputValue === "") {
        swal("Please Enter a Name!!!", "");


    } else if (inputValue === null) {
        errorMsg();
    } else {
        displayresult(inputValue);
        document.getElementById('input-meal').value = "";


    }


}




const errorMsg = () => {

    swal("Opps!!!", "No Result Found!!!", "error");
    document.getElementById('err').innerHTML = "<h3>No Result found!!</h3>";


    Spinner();

}

const displayresult = (inputValue) => {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    Spinner(); //calling spinner;
    fetch(url)
        .then(res => res.json())
        .then(data => display1(data.meals))


}





const display1 = (data) => {
    const foodContainer = document.getElementById('foodSection');
    if (data === null) {
        errorMsg();
    } else {
        data.forEach(element => {
            const foodDiv = document.createElement('div');
            foodDiv.className = "food";


            const foodInfo =

                `  
                           <div class="cards" onclick="ingredients('${element.strMeal}')" >
                           <img src="${element.strMealThumb}" class="card-img-top " alt="img">
                            
                            <div class="card-body d-block p-2 text-center btn btn-outline-warning">
                            <h5 class="card-title">${element.strMeal}</h5>
                          </div>
                             </div>
                             `

            foodDiv.innerHTML = foodInfo;
            foodContainer.appendChild(foodDiv);




        });

        Spinner();





        document.getElementById('err').style.display = 'none';
    }


}

const ingredients = element => {
    console.log(element);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${element}`
    fetch(url)

    .then(res => res.json())
        .then(data => dispaly2(data))




    document.getElementById('foodSection').style.display = 'none';
    document.getElementById('ingredients').style.display = 'block';
    document.getElementById('err').style.display = 'none';




}

const dispaly2 = data => {
    const ingredient = data.meals;
    const ul = document.getElementById('parentNode2');
    for (let i = 0; i < ingredient.length; i++) {
        const element2 = ingredient[i];
        console.log(element2);

        const ingDetails = `
    <div class="card container  p-5">
    <img id="img-fluids"" src="${element2.strMealThumb}" >
    <h1 id="title " class="text-center my-2">${element2.strMeal}</h1>
    <h4 >Ingredient</h4>
<li>${element2.strIngredient1}</li>
<li>${element2.strIngredient2}</li>
<li>${element2.strIngredient3}</li>
<li>${element2.strIngredient4}</li>
<li>${element2.strIngredient5}</li>
<li>${element2.strIngredient6}</li>
<li>${element2.strIngredient7}</li>
    </div>

`;
        ul.innerHTML = ingDetails;
    }


}

// added spinner 
const Spinner = () => {
    const spin = document.getElementById('loading-spinner');
    spin.classList.toggle('d-none');
}