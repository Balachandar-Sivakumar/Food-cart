let image_scroll = document.getElementById('slider');
let images = [], 
    api_key = '23fbef0eab1649fa81d0a7cb71ddef9a',
    method = `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=100`,
    flag = true, triger = true, catagriy = ['All'],
    popupdiv = document.querySelector('.pop_up'),
    loader = document.querySelector('.loadercontainer'),
    catagory_btn = document.querySelectorAll('.ctbtn'),
    main_cart = document.querySelector('.carting'),
    btncontainer = document.querySelector('.category'),
    load_more = document.querySelector('.button'),
    search = document.querySelector('.searchicon'),
    inp = document.querySelector('.searchinp'),
    imgpop = document.querySelector('.popimg'),
    title = document.querySelector('.title'),
    meal = document.querySelector('.mealtype');

async function gettingdata() { 
    loader.style.display = 'flex';
    await fetch(method)
        .then(res => res.json())
        .then(data => {
            loader.style.display = 'none';
            imageshow(data.recipes);
            images = document.querySelectorAll('.slider img');
            importing(data.recipes);
        })
        .catch(err => console.log(err));
}

function imageshow(datas) {     
    datas.forEach(element => {
        image_scroll.innerHTML += `<img src="${element.image || 'No image'}">`;
    });
}

function importing(datas) {  
    if (flag) main_cart.innerHTML = '';
    datas.forEach(n => {
        let separate = document.createElement('div');
        separate.className = 'relative separate';
        let image = document.createElement('img');
        image.src = n.image;
        let para = document.createElement('p');
        para.className = 'show_text';
        para.textContent = n.title;
        separate.append(image, para);
        main_cart.append(separate);
        para.addEventListener('click', () => popup(n.id));

        if (n.cuisines) catagriy.push(...n.cuisines.filter(x => x));
    });
    flag = triger = true;
    catagriy = [...new Set(catagriy)];
    btncontainer.innerHTML = '';
    buttonctry();     
}

function buttonctry() {
    btncontainer.innerHTML = catagriy.map(x => `<button class='ctbtn'>${x}</button>`).join('');
    document.querySelectorAll('.ctbtn').forEach(n => n.addEventListener('click', () => searchdata(n.textContent)));
}

let index = 0; 

function scroll_update() {
    image_scroll.style.transform = `translateX(${index * 20}%)`;
}

function next() {
    if (images.length) index = (index + 1) % images.length, scroll_update();
}

function previous() {
    if (images.length) index = (index - 1) % images.length, scroll_update();
}

load_more.addEventListener('click', () => {
    flag = false;
    gettingdata();
});

search.addEventListener('click', () => searchdata(inp.value.trim()));

function searchdata(data) {  
    if (!data || data.toLowerCase() === 'all') return gettingdata();
    loader.style.display = 'flex';
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}${triger ? `&number=20&type=${data}` : `&query=${inp.value.trim()}`}`)
        .then(res => res.json())
        .then(res => {
            loader.style.display = 'none';
            importing(res.results);
        })
        .catch(err => console.log(err));
}

async function popup(id) {   
    await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`)
        .then(res => res.json())
        .then(datas => {
            imgpop.src = datas.image;
            title.innerHTML = datas.title;
            meal.innerHTML = datas.vegetarian ? 'Vegetarian' : 'Non-vegetarian';
            popupdiv.classList.add('display');
        })
        .catch(err => console.log(err));
}

function toggle() {
    popupdiv.classList.toggle('display');
}

gettingdata();
