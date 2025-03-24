let image_scroll = document.getElementById('slider');
let images = [], 
    method = 'https://api.spoonacular.com/recipes/random?apiKey=3618575b5d134e6ea595b94c1c5761fd&number=20',
    flag=true;

    async function gettingdata(){
        await fetch(method,{method:'GET'})
    .then(res => res.json())
    .then(data => {
        imageshow(data.recipes);
        importing(data.recipes);
        updatdeimage()
    }
    )
    .catch(err => console.log(err))
    }

    gettingdata()

    function imageshow(datas){
      datas.forEach(element => {
        image_scroll.innerHTML+=`
        <img src="${!element.image ? 'No image':element.image}">
        `
      })
      
    }

    let main_cart = document.querySelector('.carting')

    function importing(datas){
       if(flag) main_cart.innerHTML='';
        datas.forEach(n => {
            main_cart.innerHTML+=`<div class='relative separate'><img src="${n.image}"> <p class='show_text'>${n.title}</P></div> `
          })
          flag=true;
    }

let index = 0;

   function updatdeimage(){
    images = document.querySelectorAll('.slider img');
   }

 function  scroll_update(){
    image_scroll.style.transform=`translateX(-${index * 20}%)`;
   }

  function next(){
    index = (index+1) % images.length;
    scroll_update()
   }

  function previous(){
    index = (index-1 ) % images.length;
    scroll_update()
   }

   let catagoru_btn = document.querySelectorAll('.category button');

   catagoru_btn.forEach(n=>{
    n.addEventListener('click',()=>{
        
        let text = n.textContent.toLowerCase();

        if(text=='all') return gettingdata();

        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=3618575b5d134e6ea595b94c1c5761fd&number=20&type=${text}`)
             .then(res => res.json())
             .then(res =>{importing(res.results);})
             .catch(err => console.log(err))
    })
   })

let load_more = document.querySelector('.button');

load_more.addEventListener('click',()=>{
    flag=false;
    gettingdata()
})

let search= document.querySelector('.searchicon');
let inp = document.querySelector('.searchinp');

search.addEventListener('click',()=>{
    
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=3618575b5d134e6ea595b94c1c5761fd&query=${inp.value.trim()}`)
  .then(res => res.json())
  .then(data => {importing(data.results);})
  .catch(err => console.log(err))
})
 
   