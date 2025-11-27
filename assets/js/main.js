import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
import 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.1/flowbite.min.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs';

// for navbar 
const header = document.getElementById('header');
fetch('./components/navbar.html').then((res)=> res.text()).then((data)=>{
    header.innerHTML = data;
});

//for about
function counter(box,val){
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        animate(0, val, {
            duration: 2,
            ease: "circOut",
            onUpdate: (latest) => (box.innerHTML = Math.round(latest)),
        })
        observer.unobserve(box)
        }
    })
    }, { threshold: 0.1})
    observer.observe(box)
}

const about = document.getElementById('about');
fetch('./components/about.html').then((res)=> res.text()).then((data)=>{
    about.innerHTML = data;
});

function startAnimation(){
    const Tcount = document.getElementById('tech-count');
    counter(Tcount,9);
    const Pcount = document.getElementById('project-count');
    counter(Pcount,3)
    const Prcount = document.getElementById('problem-count');
    counter(Prcount,344)
    const Acount = document.getElementById('achievement-count');
    counter(Acount,9)
}

// for skills
const skills = document.getElementById('skills');
fetch('./components/skills.html').then((res)=> res.text()).then((data)=>{
    skills.innerHTML = data;
});


//for projects

const projects = document.getElementById('projects');
fetch('./components/projects.html').then((res)=> res.text()).then((data)=>{
    projects.innerHTML = data;
    let swiperCards = new Swiper(".card__content", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        1024: {
        slidesPerView: 2,
        },
    },
    });
});



const experience = document.getElementById('experience');
fetch('./components/experience.html').then((res)=> res.text()).then((data)=>{
    experience.innerHTML = data;
});

const education = document.getElementById('education');
fetch('./components/education.html').then((res)=> res.text()).then((data)=>{
    education.innerHTML = data;
});

const achievements = document.getElementById('achievements');
fetch('./components/achievements.html').then((res)=> res.text()).then((data)=>{
    achievements.innerHTML = data;
    let swiperCards = new Swiper(".card__content2", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination2",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next2",
        prevEl: ".swiper-button-prev2",
    },
    breakpoints:{
        720: {
        slidesPerView: 2,
        },
        1174:{
            slidesPerView:3
        },
        1700:{
            slidesPerView:4
        }
    },
    });
});

const contact = document.getElementById('contact');
fetch('./components/contact.html').then((res)=> res.text()).then((data)=>{
    contact.innerHTML = data;
    const form = document.getElementById('form');
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("access_key", "04acf39e-5c81-43dd-b7a1-fffdf21675c4");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                alert("Your message has been sent.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});

const footer = document.getElementById('footer');
fetch('./components/footer.html').then((res)=> res.text()).then((data)=>{
    footer.innerHTML = data;
});

function starter(){
    const m_navbar = document.getElementById('m-navbar');
    const x = document.getElementById('x');
    const dashicon = document.getElementById('dash-icon');
    const mynav = document.getElementById('mynav');
    const light = document.getElementById('light');
    const dark = document.getElementById('dark');
    const body = document.body;
    const light_main = document.getElementById('light-main');
    const dark_main = document.getElementById('dark-main');
    const light2 = document.getElementById('light2');
    const dark2 = document.getElementById('dark2');
    const light_main2 = document.getElementById('light-main2');
    const dark_main2 = document.getElementById('dark-main2');
    const color_picker = document.getElementById('color-picker');
    const color_picker2 = document.getElementById('color-picker2');
    const m_navbar2 = document.getElementById('m-navbar2');
    const mynav2 = document.getElementById('mynav2');

    function activateLightMode(){
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('data-theme','light');
    }
    function activateDarkMode(){
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem('data-theme','dark');
    }
    light.addEventListener('click',()=>{
        activateLightMode();
    })
    dark.addEventListener('click',()=>{
        activateDarkMode();
    })
    light2.addEventListener('click',()=>{
        activateLightMode();
    })
    dark2.addEventListener('click',()=>{
        activateDarkMode();
    })

    color_picker.addEventListener('click',()=>{
        m_navbar2.classList.remove('w-0');
        m_navbar2.classList.add('w-40');
        m_navbar2.classList.add('border-2');
        mynav2.classList.remove('w-0');
        mynav2.classList.add('w-40');
    })
    
    color_picker2.addEventListener('click',()=>{
        m_navbar2.classList.remove('w-0');
        m_navbar2.classList.add('w-40');
        m_navbar2.classList.add('border-2');
        mynav2.classList.remove('w-0');
        mynav2.classList.add('w-40');
    })
    dashicon.addEventListener('click',()=>{
        m_navbar.classList.remove('w-0');
        m_navbar.classList.add('w-64');
        m_navbar.classList.add('border-2');
        mynav.classList.remove('w-0');
        mynav.classList.add('w-64');
    });
    document.addEventListener('click',(e)=>{
        if(e.target!=dashicon){
            m_navbar.classList.remove('w-64');
            m_navbar.classList.add('w-0');
            m_navbar.classList.remove('border-2');
            mynav.classList.remove('w-64');
            mynav.classList.add('w-0');
        }
        if(e.target!=color_picker && e.target!=color_picker2){
            m_navbar2.classList.remove('w-40');
            m_navbar2.classList.add('w-0');
            m_navbar2.classList.remove('border-2');
            mynav2.classList.remove('w-40');
            mynav2.classList.add('w-0');
        }
    })
    x.addEventListener('click',()=>{ 
        m_navbar.classList.remove('w-64');
        m_navbar.classList.add('w-0');
        m_navbar.classList.remove('border-2');
        mynav.classList.remove('w-64');
        mynav.classList.add('w-0');
    })
    x2.addEventListener('click',()=>{
        m_navbar2.classList.remove('w-40');
        m_navbar2.classList.add('w-0');
        m_navbar2.classList.remove('border-2');
        mynav2.classList.remove('w-40');
        mynav2.classList.add('w-0');
    })
}

const loader_main = document.getElementById('loader-main');
const others = document.getElementById('others')
window.addEventListener("load", function(){
    const theme = localStorage.getItem('data-theme');
    if(theme){
        document.documentElement.setAttribute('data-theme',theme);
    }
    else{
        document.documentElement.setAttribute('data-theme','dark');
    }
    const my_color = localStorage.getItem('my-color');
    if(my_color){
        document.documentElement.style.setProperty('--my-color', `var(${my_color})`);
    }
    else{
        document.documentElement.style.setProperty('--my-color', 'var(--color-green-500)');
    }
    setTimeout(() => {
        loader_main.classList.add('hidden');
        others.classList.remove('hidden');
        loader_main.innerHTML='';
        starter();
        setTimeout(() => {
            startAnimation();
        }, 500);
    }, 3000);
    // loader_main.classList.add('hidden');
    // others.classList.remove('hidden');
    // loader_main.innerHTML='';
    // setTimeout(() => {
    //     startAnimation();
    // }, 500);

});
