let image_scroll = document.getElementById('slider');
let images = [], 
    api_key = 'bd2be8aeffcb46749e500a860968114e',
    method = `https://api.spoonacular.com/recipes/random?apiKey=${api_key}&number=20`,
    flag=true,
    triger = true,
   popupdiv = document.querySelector('.pop_up'),
   loader = document.querySelector('.loadercontainer');

    async function gettingdata(){             // Main updating 
        await fetch(method,{method:'GET'})
    .then(res => res.json())
    .then(data => {
        loading()
        imageshow(data.recipes);
        importing(data.recipes);
        updatdeimage()
        
    }
    )
    .catch(err => console.log(err))
    }

    gettingdata()  

    function imageshow(datas){      //slider images
      datas.forEach(element => {
        image_scroll.innerHTML+=`
        <img src="${!element.image ? 'No image':element.image}">
        `
      })
      
    }

    let main_cart = document.querySelector('.carting')

    function importing(datas){         //Main cart 
       if(flag) main_cart.innerHTML='';
        datas.forEach(n => {
         
            let separate = document.createElement('div');
                separate.className='relative separate';
            let image = document.createElement('img');image.src=n.image;
            let para = document.createElement('p');para.className='show_text';
                para.textContent=n.title;  
                
                separate.append(image,para)
                main_cart.append(separate)

                para.addEventListener('click',()=>{popup(n.id)})
          })
          flag=true;
          triger=true;
    }

let index = 0; //Sliding images

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
    if (images.length === 0) return;
    index = (index-1 +images.length) % images.length;
    scroll_update()
   }

   let catagory_btn = document.querySelectorAll('.category button');

   catagory_btn.forEach(n=>{
    n.addEventListener('click',()=>{searchdata(n.textContent)})
   })

let load_more = document.querySelector('.button');

load_more.addEventListener('click',()=>{  //Load more items in cart
    flag=false;
    gettingdata()
})

let search= document.querySelector('.searchicon');
let inp = document.querySelector('.searchinp');

search.addEventListener('click',()=>{searchdata(triger=false,inp.value.trim())}) // search inpt
 
  function searchdata(data){  // search data and catagory data searchig
    

    if(data=='all') return gettingdata();

    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}${triger ? `&number=20&type=${data}`:`&query=${inp.value.trim()}` }`)
         .then(res => res.json())
         .then(res =>{loading(),importing(res.results);})
         .catch(err => console.log(err))
  } 

  let imgpop = document.querySelector('.popimg'),
      title = document.querySelector('.title'),
      meal = document.querySelector('.mealtype');

async function popup(id){   // pop up data fetching data base
 await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`)
  .then(res => res.json())
  .then(datas => {
    imgpop.src=datas.image;
    title.innerHTML=datas.title;
    meal.innerHTML= meal ? 'Vegetarian' : 'Non-vegetarian';
    popupdiv.classList.add('display');
  })
  .catch(err => console.log(err))
}

function toggle(){
 popupdiv.classList.toggle('display');
}

function loading(){
  loader.style.display='flex'
  setTimeout(()=>{
    loader.style.display='none'
  },3000)
}

