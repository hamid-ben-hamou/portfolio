// menu
let navTogglerElement = document.querySelector('.home nav .open-close');
let ulNavElement = document.querySelector('.home nav ul');

// function open menu
let openMainMenu = () => {

    ulNavElement.classList.remove('hidden');
    setTimeout(() => ulNavElement.classList.remove('closed') , 150)
    navTogglerElement.children[0].classList.remove('fa-bars');
    navTogglerElement.children[0].classList.add('fa-xmark');
    

}
 
let closeMainMenu = () => {

    ulNavElement.classList.add('closed');
    setTimeout(() => ulNavElement.classList.add('hidden') , 300)
    navTogglerElement.children[0].classList.add('fa-bars');
    navTogglerElement.children[0].classList.remove('fa-xmark');

} 
let handleMainMenu = (e) => {

    e.preventDefault();
    e.stopPropagation();

    if (ulNavElement.classList.contains('closed')) {

        openMainMenu();

    } else {

        closeMainMenu();

    }

}

document.addEventListener('click', (e) => {

    if (e.target !== navTogglerElement && !ulNavElement.contains(e.target) && !ulNavElement.classList.contains('closed')) {

        closeMainMenu();
        
    } 

})
// close whene a link is clicked
ulNavElement.addEventListener('click', (e) => {

    if (e.target.closest('a')) closeMainMenu();

})
// close with Escape
document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') closeMainMenu();

});

navTogglerElement.addEventListener('click', handleMainMenu);

// creat auto typing herp section
let typed = new Typed('#typed', {

    strings: [
      "Front-End Developer",
      "Freelancer",
      "Skilled in HTML, CSS, JavaScript & Bootstrap"
    ],
    typeSpeed: 80,
    backSpeed: 80,
    loop: true

});

// change theme
let togglerThemeBtn = document.querySelector('.theme-toggler-btn');

togglerThemeBtn.addEventListener('click', () => {

    togglerThemeBtn.children[0].children[0].classList.toggle('to-light');

    if (togglerThemeBtn.children[0].children[0].classList.contains('to-light')) {

        togglerThemeBtn.children[0].children[0].children[0].classList.remove('fa-moon');
        togglerThemeBtn.children[0].children[0].children[0].classList.add('fa-sun');
        document.querySelector('body').classList.add('dark-theme');

        // chage img 
        document.querySelector('.hero').style.backgroundImage = "url('../images/back-dark.jpg')";
        
        
    } else {
        
        togglerThemeBtn.children[0].children[0].children[0].classList.add('fa-moon');
        togglerThemeBtn.children[0].children[0].children[0].classList.remove('fa-sun');
        document.querySelector('body').classList.remove('dark-theme');
        
        // chage img 
        document.querySelector('.hero').style.backgroundImage = "url('../images/back-light.jpg')";

    }

})

// scroling and show section smooth
let observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            
            setTimeout(() => {
                entry.target.classList.add('show-element');
                entry.target.classList.remove('hide-element');
            }, 400)
            
        } else {

            setTimeout(() => {
                entry.target.classList.add('hide-element');
                entry.target.classList.remove('show-element');
            }, 400)
            
        }

    })

}, {});

let allElementsSowedWitheSmooth = document.querySelectorAll('.s-smooth');
allElementsSowedWitheSmooth.forEach(el => observer.observe(el));

// skils progress
let obsserverSkils = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
       
            setTimeout(() => {
                // add with automaticty
                entry.target.classList.add('show-rate');
                entry.target.style.width = entry.target.id.match(/\d+/)[0] + '%'; 
            }, 400)
            
            
        } else {
            
            
            setTimeout(() => {
                entry.target.classList.remove('show-rate');
                 // add with automaticty
                entry.target.style.width = '0';
            }, 400)

        }

    })

}, {});

let rateProgressElem = document.querySelectorAll('.rate .percent');
rateProgressElem.forEach(e => {
    
    e.children[0].innerHTML = e.id.match(/\d+/)[0] + '%';

    obsserverSkils.observe(e);
    
})

// projects script
let parentBoxes = document.querySelector('.projects .project-content');

// get file json and create boxes projects
fetch('./scripts/projects.json')
    .then(response => response.json()) // covert the response into ajs object
    .then(data => {

        for(let i = 0; i < Object.keys(data).length; i++) {

            let contentData = data[Object.keys(data)[i]];
            let projectLanguage = data[Object.keys(data)[i]]['language'].split(' ');

            let boxContent = `<img src="${contentData['img']}" alt="">
                    <div class="desc p-3">
                        <h2 class="text-center">${contentData['title']}</h2>
                        <p>Using: </p>
                        <a href="${contentData['link']}" class="btn text-decoration-none mt-2" target="blank" >Visit <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>`;
            let box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML += boxContent;

            parentBoxes.append(box);
            // make scroll in centre
            parentBoxes.scrollLeft = (parentBoxes.scrollWidth - parentBoxes.clientWidth) / 2;

            // add lungudges spans automaticly
            if (document.querySelectorAll('.box .desc h2')[i].innerHTML === contentData['title']) {

                for (let p = 0; p < projectLanguage.length; p++) {
                    
                    let span = document.createElement('span');
                    span.innerHTML = projectLanguage[p];
                    document.querySelectorAll('.box .desc p')[i].appendChild(span);

                }
                            
            }
                        
        }

        ScrollToBoxAfterHover();
        
    })
    .catch(error => console.log('error', error));

let ScrollToBoxAfterHover = () => {

    for(let box = 0; box < parentBoxes.children.length; box++){

        parentBoxes.children[box].addEventListener('mouseenter' , () => {

            parentBoxes.children[box].scrollIntoView({

                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'

            })
            parentBoxes.children[box].style.transform = 'scale(1)';

        })
        parentBoxes.children[box].addEventListener('mouseleave' , () => {

            parentBoxes.children[box].style.transform = 'scale(0.9)';

        })
        
    }
    

}