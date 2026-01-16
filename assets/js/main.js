import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
// import 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.1/flowbite.min.js';
// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs';

var Swiper = null;

const $ = (id) => document.getElementById(id);
const $$ = (cls) => document.querySelectorAll(cls);
var timeout = null;

function counter(box,val){
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            animate(0, val, {
                duration: 2,
                ease: "circOut",
                onUpdate: (latest) => (box.innerHTML = Math.round(latest)),
            })
            observer.unobserve(box);
            }
        })
        }, { threshold: 0.1}
    );
    observer.observe(box);
}

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const isimg = entry.target.getAttribute('data-img')
            if(isimg){
                entry.target.classList.remove('scale-85');
            }
            else{
                entry.target.classList.remove('scale-50');
            }
            entry.target.classList.remove('opacity-0');
        }
        else{
            const isimg = entry.target.getAttribute('data-img')
            if(isimg){
                entry.target.classList.add('scale-85');
            }
            else{
                entry.target.classList.add('scale-50');
            }
            entry.target.classList.add('opacity-0');
        }
    })
    },{threshold:0.7}
);

const animateBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if(entry.target.getAttribute('data-first')=='true'){
                entry.target.classList.remove('-translate-x-[100vw]');
                entry.target.setAttribute('data-first','false')
            }
            entry.target.classList.remove('opacity-0');
        }
        else{
            entry.target.classList.add('opacity-0');
        }
    })
    },{threshold:0.5,rootMargin:'0px 0px 0px 4000px'}
);

const animateSliderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
        }
        else{
            entry.target.classList.add('opacity-0');
        }
    })
    },{threshold:0.3}
);

function openToast(icon,msg){
    const toast = $('toast');
    const prefixIcon = $('prefix-icon');
    const message = $('message');
    // const icon = '<i class="ri-error-warning-line"></i>'
    // const msg = 'Please try again.'
    prefixIcon.innerHTML = icon;
    message.innerHTML = msg;
    toast.classList.remove('translate-x-[100vw]');
    const timing = document.getElementById('timing')
    setTimeout(()=>{
        timing.classList.add('-translate-x-full');
    },100)
    timeout = setTimeout(() => {
        closeToast();
        timeout = null;
    }, 3000);
}

function closeToast(){
    const toast = $('toast');
    const timing = document.getElementById('timing')
    toast.classList.add('translate-x-[100vw]');
    timing.classList.remove('-translate-x-full')
}

async function submitForm() {
    // openToast('<i class="ri-checkbox-circle-line">','Sent successfully');
    // return;
    if(timeout){
        clearTimeout(timeout)
        closeToast();
    }
    const submitBtn = form.querySelector('button[type="submit"]');
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
            // alert("Your message has been sent.");
            openToast('<i class="ri-checkbox-circle-line">','Sent successfully');
            form.reset();
        } else {
            console.error(data.message);
            // alert("Error: Something went wrong. Please try again.");
            openToast('<i class="ri-error-warning-line"></i>','Please try again');
        }
    } catch (error) {
        // alert("Something went wrong. Please try again.");
        console.error(error);
        openToast('<i class="ri-error-warning-line"></i>','Please try again');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        // form.reset();
    }
}
//<i class="ri-check-line"></i> <i class="ri-checkbox-circle-line"></i>
async function loadSwiper() {
  const { default: Swiper } = await import(
    'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'
  );
  return Swiper;
}

async function forProject(){
    var Swiper = Swiper? Swiper : await loadSwiper();
    new Swiper(".card__content", {
        loop: true,
        spaceBetween: 32,
        grabCursor: true,
        pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: { 1024: { slidesPerView: 2 } }
    });
}

async function forAchievement(){
    var Swiper = Swiper? Swiper : await loadSwiper();
    new Swiper(".card__content2", {
        loop: true,
        spaceBetween: 32,
        grabCursor: true,
        pagination: { el: ".swiper-pagination2", clickable: true, dynamicBullets: true },
        navigation: {
            nextEl: ".swiper-button-next2",
            prevEl: ".swiper-button-prev2"
        },
        breakpoints: {
            720: {slidesPerView: 2},
            1174:{slidesPerView:3},
            1700:{slidesPerView:4}
        }
    });
}

function forContact(){
    const form = $('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitForm();
    });
}

function countingAnimation(problemCount){
    const Tcount = $('tech-count');
    counter(Tcount,9);
    const Pcount = $('project-count');
    counter(Pcount,3)
    const Prcount = $('problem-count');
    counter(Prcount,problemCount)
    const Acount = $('achievement-count');
    counter(Acount,9)
}

function darkMode(){
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem('data-theme','dark');
}

function lightMode(){
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('data-theme','light');
}

function activateListener(){
    const m_navbar = $('m-navbar');
    const x = $('x');
    const dashicon = $('dash-icon');
    const mynav = $('mynav');
    const light = $('light');
    const dark = $('dark');
    const light2 = $('light2');
    const dark2 = $('dark2');
    const color_picker = $('color-picker');
    const color_picker2 = $('color-picker2');
    const m_navbar2 = $('m-navbar2');
    const mynav2 = $('mynav2');
    const closetoast = $('close-toast');

    closetoast.addEventListener('click',()=>{
        closeToast();
    })

    light.addEventListener('click',()=>{
        lightMode();
    });
    dark.addEventListener('click',()=>{
        darkMode();
    });
    light2.addEventListener('click',()=>{
        lightMode();
    });
    dark2.addEventListener('click',()=>{
        darkMode();
    });

    color_picker.addEventListener('click',()=>{
        m_navbar2.classList.remove('w-0');
        m_navbar2.classList.add('w-40','border-2');
        mynav2.classList.remove('w-0');
        mynav2.classList.add('w-40');
    });
    
    color_picker2.addEventListener('click',()=>{
        m_navbar2.classList.remove('w-0');
        m_navbar2.classList.add('w-40','border-2');
        mynav2.classList.remove('w-0');
        mynav2.classList.add('w-40');
    });

    dashicon.addEventListener('click',()=>{
        m_navbar.classList.remove('w-0');
        m_navbar.classList.add('w-64','border-2');
        mynav.classList.remove('w-0');
        mynav.classList.add('w-64');
    });

    document.addEventListener('click',(e)=>{
        if(e.target!=dashicon){
            m_navbar.classList.remove('w-64','border-2');
            m_navbar.classList.add('w-0');
            mynav.classList.remove('w-64');
            mynav.classList.add('w-0');
        }
        if(e.target!=color_picker && e.target!=color_picker2){
            m_navbar2.classList.remove('w-40','border-2');
            m_navbar2.classList.add('w-0');
            mynav2.classList.remove('w-40');
            mynav2.classList.add('w-0');
        }
    });

    x.addEventListener('click',()=>{ 
        m_navbar.classList.remove('w-64','border-2');
        m_navbar.classList.add('w-0');
        mynav.classList.remove('w-64');
        mynav.classList.add('w-0');
    });

    x2.addEventListener('click',()=>{
        m_navbar2.classList.remove('w-40','border-2');
        m_navbar2.classList.add('w-0');
        mynav2.classList.remove('w-40');
        mynav2.classList.add('w-0');
    });
}

async function fetchCount() {
    try{
        const targetUrl = 'https://alfa-leetcode-api.onrender.com/Gopinath5002/solved';
        const myresponse = await fetch(targetUrl);
        const data = await myresponse.json();
        return data;
    }
    catch(error) {
        console.error(error);
        return {'solvedProblem':100};
    }
}

async function loadPage(){
    const loader_main = $('loader-main');
    const others = $('others');

    const leetcodeData = await fetchCount();
    const problemCount = leetcodeData['solvedProblem'];
    // const problemCount = 100;

    loader_main.classList.add('hidden');
    others.classList.remove('hidden');
    loader_main.innerHTML='';

    activateListener();

    const icons = document.querySelectorAll('.icons');
    icons.forEach(icon=> animationObserver.observe(icon));
    const boxes = document.querySelectorAll('.animatebox');
    boxes.forEach(box=> animateBoxObserver.observe(box));
    const sliders = document.querySelectorAll('.animateslider');
    sliders.forEach(slider=> animateSliderObserver.observe(slider));
    setTimeout(() => {
        countingAnimation(problemCount);
    }, 500);
}

async function loadComponent(id, path, callback) {
  const res = await fetch(path);
  $(id).innerHTML = await res.text();
  if(callback){
    callback();
  }
}

async function start(params) {
    await Promise.all([
        loadComponent('header', '/components/navbar.html'),
        loadComponent('about', '/components/about.html'),
        loadComponent('skills', '/components/skills.html'),
        loadComponent('projects', '/components/projects.html',forProject),
        loadComponent('experience', '/components/experience.html'),
        loadComponent('education', '/components/education.html'),
        loadComponent('achievements', '/components/achievements.html',forAchievement),
        loadComponent('contact', '/components/contact.html',forContact),
        loadComponent('footer', '/components/footer.html')
        ]);
    loadPage();
}

start();



