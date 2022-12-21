//prebuild variables
let curentPage="recipeList", currentRecipe, lastList, lastSearched=false;
//Loader
    
//Navigation
    const recipes=document.getElementById("recipes");
    const about=document.getElementById("about");
    const contact=document.getElementById("contact");

    const recipeScreen=document.getElementById("recipeScreen");
    const recipesList=document.getElementById("recipesList");
    const aboutScreen=document.getElementById("aboutScreen");
    const contactScreen=document.getElementById("contactScreen");
    const sectionTitle=document.getElementById("sectionTitle");
    const noRecipes=document.getElementById("noRecipes");
    const goBack=document.getElementById("goBack");
    goBack.addEventListener("click",()=>{
        curentPage="recipeList";
        goBack.style.display="none";
        currentRecipe=0;
        recipesList.innerHTML=lastList;
        document.getElementById("noRecipes").style.display="none";
        recipeScreen.style.display="none";
        recipesList.style.display="block";
        aboutScreen.style.display="none";
        contactScreen.style.display="none";
        if(curretLang.language=="polish"){
            sectionTitle.innerHTML=`Receptury`;
        }else{
            sectionTitle.innerHTML=`Recipes`;
        }
        scrollUp();
    });
    class NavBtns
    {
        navigate(choice)
        {
            switch (choice){
                case 1:
                    lastSearched=false;
                    curentPage="recipeList";
                    goBack.style.display="none";
                    currentRecipe=0;
                    dataforList();
                    document.getElementById("noRecipes").style.display="none";
                    recipeScreen.style.display="none";
                    recipesList.style.display="block";
                    aboutScreen.style.display="none";
                    contactScreen.style.display="none";
                    scrollUp();
                    if(curretLang.language=="polish"){
                        sectionTitle.innerHTML=`Receptury`;
                    }else{
                        sectionTitle.innerHTML=`Recipes`;
                    }
                break;
                case 2:
                    curentPage="about";
                    goBack.style.display="none";
                    currentRecipe=0;
                    recipeScreen.style.display="none";
                    recipesList.style.display="none";
                    aboutScreen.style.display="block";
                    contactScreen.style.display="none";
                    scrollUp();
                    if(curretLang.language=="polish"){
                        sectionTitle.innerHTML=`O Nas`;
                        document.querySelector(".ele1").innerHTML=`
                        <p>UnderBeer jest fikcyjnym portalem kulinarnym z przepisami
                         o charakterze alkoholowym i nie tylko.</p>`;
                         document.querySelector(".ele4").innerHTML=`
                        <p>Chciałem gdzieś zamieścić swój sposób na przygotowanie
                         podpiwka i tak zrodził się pomysł na projekt.</p>`;
                         document.querySelector(".ele5").innerHTML=`
                        <p>Może kiedyś ta strona stanie się czymś więcej,
                         ale póki co, nie mam takich planów.</p>`;           
                    }else{
                        sectionTitle.innerHTML=`About`;
                        document.querySelector(".ele1").innerHTML=`
                        <p>UnderBeer is a fictional culinary portal
                        with recipes of an alcoholic character and more.</p>`;
                        document.querySelector(".ele4").innerHTML=`
                        <p>I wanted to post somewhere my way of preparing homemade
                        brew and the idea for the project was born.</p>`;
                        document.querySelector(".ele5").innerHTML=`
                        <p>Maybe someday this site will become
                        something more, but for now, I don't have such plans.</p>`; 
                    }                    
                break;
                case 3:
                    curentPage="contact";
                    goBack.style.display="none";
                    currentRecipe=0;
                    recipeScreen.style.display="none";
                    recipesList.style.display="none";
                    aboutScreen.style.display="none";
                    contactScreen.style.display="block";
                    scrollUp();
                    if(curretLang.language=="polish"){
                        sectionTitle.innerHTML=`Kontakt`;
                        document.getElementById("contactInfo").innerHTML=`
                        <h1>E-Mail:</h1>
                        <p>UnderBeer@business.com</p>
                        <h1>Adres:</h1>
                        <p>Wernera 8 Łączki Brzeskie Polska</p>
                        <h1>Telefon:</h1>
                        <p>48+ 705-742-3221</p>`;
                        document.getElementById("writeToUs").innerHTML="Napisz do nas!";
                        document.getElementById("sendMail").innerHTML="Wyślij";
                    }else{
                        sectionTitle.innerHTML=`Contact`;
                        document.getElementById("contactInfo").innerHTML=`
                        <h1>E-Mail:</h1>
                        <p>UnderBeer@business.com</p>
                        <h1>Adress:</h1>
                        <p>Wernera 8 Łączki Brzeskie Polska</p>
                        <h1>Phone:</h1>
                        <p>48+ 705-742-3221</p>`;
                        document.getElementById("writeToUs").innerHTML="Write to us!";
                        document.getElementById("sendMail").innerHTML="Send";
                    }  
                break;
            }
        }
    }
    let navbtns= new NavBtns;

    recipes.addEventListener("click",()=>{
        navbtns.navigate(1);
    });
    about.addEventListener("click",()=>{
        navbtns.navigate(2);
    });
    contact.addEventListener("click",()=>{
        navbtns.navigate(3);
    });

//Data
async function dataforList()
{
        const response= await fetch("sources/data/data.json");
        const data=await response.json();
        let i=1, html=``; 
        data.forEach(data=>{
            if(curretLang.language=="polish"){
                html+=`<div class="recipeWrap">
                <div class="targetRecipe" onclick="showRecipe(`+i+`)">
                    <div id="thumbnail">
                        <img src="`+data.imgUrl+`" alt="" id="recipeimg">
                    </div>
                    <div class="content">
                        <div>
                            <div>
                                <h1 id="recipeName">`+data.polish.name+`</h1>
                            </div>
                            <div>
                                <p>`+data.polish.description+`</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                i++;
                document.getElementById("recipesList").innerHTML=html+
                `<div class="recipeWrap" id="noRecipes">
                <h1>Przykro nam, nie udało się znaleźć tego, czego szukasz.</h1>
                </div>`;
                lastList=document.getElementById("recipesList").innerHTML;
            }else{
                html+=`<div class="recipeWrap">
                <div class="targetRecipe" onclick="showRecipe(`+i+`)">
                    <div id="thumbnail">
                        <img src="`+data.imgUrl+`" alt="" id="recipeimg">
                    </div>
                    <div class="content">
                        <div>
                            <div>
                                <h1 id="recipeName">`+data.english.name+`</h1>
                            </div>
                            <div>
                                <p>`+data.english.description+`</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                i++;
                lastList=html+
                `<div class="recipeWrap" id="noRecipes">
                <h1>Sorry, we couldn't find what you were looking for.</h1>
                </div>`;
                document.getElementById("recipesList").innerHTML=lastList;
            }
        });
}
dataforList();
async function dataforSearch(phrase)
{
        lastSearched=true;
        const response= await fetch("sources/data/data.json");
        const data=await response.json();
        let html=``, found=false;
        data.forEach(data=>{
            let i=0, recipeDisplayed=false;
                while(data.tags[i]!=undefined){
                if(data.tags[i].includes(phrase)==true){
                    if(recipeDisplayed==false){
                        recipeDisplayed=true;
                        found=true;
                        if(curretLang.language=="polish"){
                            html+=`<div class="recipeWrap">
                            <div class="targetRecipe" onclick="showRecipe(`+i+1+`)">
                                <div id="thumbnail">
                                    <img src="`+data.imgUrl+`" alt="" id="recipeimg">
                                </div>
                                <div class="content">
                                    <div>
                                        <div>
                                            <h1 id="recipeName">`+data.polish.name+`</h1>
                                        </div>
                                        <div>
                                            <p>`+data.polish.description+`</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        }
                        else{
                            html+=`<div class="recipeWrap">
                            <div class="targetRecipe" onclick="showRecipe(`+i+1+`)">
                                <div id="thumbnail">
                                    <img src="`+data.imgUrl+`" alt="" id="recipeimg">
                                </div>
                                <div class="content">
                                    <div>
                                        <div>
                                            <h1 id="recipeName">`+data.english.name+`</h1>
                                        </div>
                                        <div>
                                            <p>`+data.english.description+`</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        }
                    }
                }
                i++;
            }
        });
        if(curretLang.language=="polish"){
            document.getElementById("recipesList").innerHTML=html+
            `<div class="recipeWrap" id="noRecipes">
            <h1>Przykro nam, nie udało się znaleźć tego, czego szukasz.</h1>
            </div>`;
        }
        else{
            document.getElementById("recipesList").innerHTML=html+
            `<div class="recipeWrap" id="noRecipes">
            <h1>Sorry, we couldn't find what you were looking for.</h1>
            </div>`;
            
        }
        
            if(found==false)
            {
                document.getElementById("noRecipes").style.display="flex";
            }else{
                lastList=document.getElementById("recipesList").innerHTML;
            }

}
async function showRecipe(id)
{
    curentPage="recipe";
    scrollUp();
    let checkmarks=0;
    const response= await fetch("sources/data/data.json");
    const data=await response.json();
    let html1=``, html2=``, desc1=``, desc2=``, comments=``; 
    data.forEach(data=>{
        let i=0;
        currentRecipe=id;
        if(data.id==id){
            if(curretLang.language=="polish"){
                sectionTitle.innerHTML=data.polish.name;
                desc1=data.polish.description;
                while(data.polish.requiredItems[i]!=undefined){
                    checkmarks++;
                    html1+=`
                    <li class="recipeItems">
                    <div class="checkmark" id="checkmark`+i+`">
                        ✓
                    </div>
                    <div>
                        <p>`+data.polish.requiredItems[i]+`</p>
                    </div>
                    </li>`
                    i++;
                }
                desc2=data.polish.postStepsDescription;
                i=0;
                while(data.polish.steps[i]!=undefined){
                    html2+=`
                    <div>
                        <h3>Krok `+(i+1)+`</h3>
                        <p>`+data.polish.steps[i]+`</p>
                    </div>`
                    i++;
                }
            }
            else{
                sectionTitle.innerHTML=data.english.name;
                desc1=data.english.description;
                while(data.english.requiredItems[i]!=undefined){
                    checkmarks++;
                    html1+=`
                    <li class="recipeItems">
                    <div class="checkmark" id="checkmark`+i+`">
                        ✓
                    </div>
                    <div>
                        <p>`+data.english.requiredItems[i]+`</p>
                    </div>
                    </li>`
                    i++;
                }
                desc2=data.english.postStepsDescription;
                i=0;
                while(data.english.steps[i]!=undefined){
                    html2+=`
                    <div>
                        <h3>Step `+(i+1)+`</h3>
                        <p>`+data.english.steps[i]+`</p>
                    </div>`
                    i++;
                }
            }
            i=0;
            while(data.comments.name[i]!=undefined){
                comments+=`
                <div class="comment">
                    <div class="comwrap">
                        <div class="nick">`+data.comments.name[i]+`</div>
                        <div class="commentDate">`+data.comments.date[i]+`</div>
                        <div class="description">`+data.comments.content[i]+`</div>
                    </div>
                </div>`
                i++;
            }
        }
    });
    if(curretLang.language=="polish"){
    document.getElementById("recipeTile").innerHTML=`
    <section class="requiredItems gridItem">
    <div id="need">
        <h2>Potrzebujesz:</h2>
    </div>
    <ul class="itemList">
        `+html1+`
    </ul>
    </section>
    <section class="steps gridItem">
    <div>
        <h2>Sposób Przygotowania</h2>
    </div>
    <span class="steps-wrap">
        <div>
            <p class="recipeDesc">`+desc1+`</p>
        </div>
        `+html2+`
        <div>
            <p class="recipeDesc">`+desc2+`</p>
        </div>
    </span>
    </section>
    </section>`;
    document.getElementById("commenth1-1").innerHTML="Komentarze";
    document.getElementById("goToCom").innerHTML="Napisz Komentarz";
    document.getElementById("commenth1-2").innerHTML="Napisz Komentarz";
    document.getElementById("commentUserName").innerHTML="Nazwa Użytkownika";
    document.getElementById("sendComment").innerHTML="Opublikuj";
    }else{
        document.getElementById("recipeTile").innerHTML=`
    <section class="requiredItems gridItem">
    <div id="need">
        <h2>Need</h2>
    </div>
    <ul class="itemList">
        `+html1+`
    </ul>
    </section>
    <section class="steps gridItem">
    <div>
        <h2>Preparation Method</h2>
    </div>
    <span class="steps-wrap">
        <div>
            <p class="recipeDesc">`+desc1+`</p>
        </div>
        `+html2+`
        <div>
            <p class="recipeDesc">`+desc2+`</p>
        </div>
    </span>
    </section>
    </section>`;
    document.getElementById("commenth1-1").innerHTML="Comments";
    document.getElementById("goToCom").innerHTML="Write a Comment";
    document.getElementById("commenth1-2").innerHTML="Write a Comment";
    document.getElementById("commentUserName").innerHTML="User Nickname";
    document.getElementById("sendComment").innerHTML="Publish";
    }
    
    document.getElementById("comments").innerHTML=comments;

    for(let i=0; i<checkmarks ;i++)
{
    document.getElementById("checkmark"+i).addEventListener("click",()=>{
        if(document.getElementById("checkmark"+i).style.color=="rgb(19, 192, 19)"){
            document.getElementById("checkmark"+i).style.color="black";
        }else
        document.getElementById("checkmark"+i).style.color="rgb(19, 192, 19)"
    });
}
    goBack.style.display="block";
    recipeScreen.style.display="block";
    recipesList.style.display="none";
    aboutScreen.style.display="none";
    contactScreen.style.display="none";
}
//Searching

    const searcher=document.getElementById("searcher");
    const searchingBar=document.getElementById("searchingBar");
    const closeSearch=document.getElementById("closeSearch");
    const searchInput=document.getElementById("searchInput");
    const searchbtn=document.getElementById("searchbtn");
    let searchedPhrase;
    searcher.addEventListener("click",()=>{
        searchingBar.style.display="flex";
        searchInput.focus();
    });
    closeSearch.addEventListener("click",()=>{
        searchingBar.style.display="none";
        searchInput.value="";
    });
    searchbtn.addEventListener("click",()=>{
        if(searchInput.value!=""){
            navbtns.navigate(1);
            searchingBar.style.display="none";
            searchedPhrase=searchInput.value;
            sectionTitle.innerHTML=searchedPhrase;
            searchedPhrase=searchedPhrase.toLowerCase();
            searchInput.value="";
            dataforSearch(searchedPhrase);
        }
    });
    searchingBar.addEventListener("keydown",(event)=>{
        let keyPressed=event.code;
        switch(keyPressed)
        {
            case "Enter":
            if(searchInput.value!=""){
                navbtns.navigate(1);
                searchingBar.style.display="none";
                searchedPhrase=searchInput.value;
                sectionTitle.innerHTML=searchedPhrase;
                searchedPhrase=searchedPhrase.toLowerCase();
                searchInput.value="";
                dataforSearch(searchedPhrase);
            }
            break;
            case "Escape":
                searchingBar.style.display="none";
                searchInput.value="";
            break;
        }

    });

//Language

class Language
{
    constructor()
    {
        this.language="polish";
    }
    changeLang()
    {
        scrollUp();
        if(this.language=="english"){
            this.language="polish";
            recipes.innerHTML=`<div>Receptury</div>`;
            about.innerHTML=`<div>O Nas</div>`;
            contact.innerHTML=`<div>Kontakt</div>`;
            document.getElementById("followUs").innerHTML="Obserwuj nas!";
            searchbtn.innerHTML="Szukaj";
            if(curentPage=="recipeList"){
                dataforList();
                sectionTitle.innerHTML=`Receptury`;
            }
            else if(curentPage=="recipe"){
                showRecipe(currentRecipe);
            }else if(curentPage=="about"){
                sectionTitle.innerHTML=`O Nas`;
                document.querySelector(".ele1").innerHTML=`
                <p>UnderBeer jest fikcyjnym portalem kulinarnym z przepisami
                 o charakterze alkoholowym i nie tylko.</p>`;
                 document.querySelector(".ele4").innerHTML=`
                <p>Chciałem gdzieś zamieścić swój sposób na przygotowanie
                 podpiwka i tak zrodził się pomysł na projekt.</p>`;
                 document.querySelector(".ele5").innerHTML=`
                <p>Może kiedyś ta strona stanie się czymś więcej,
                 ale póki co, nie mam takich planów.</p>`; 
            }
            else if(curentPage=="contact"){
                sectionTitle.innerHTML=`Kontakt`;
                document.getElementById("contactInfo").innerHTML=`
                    <h1>E-Mail:</h1>
                    <p>UnderBeer@business.com</p>
                    <h1>Adres:</h1>
                    <p>Wernera 8 Łączki Brzeskie Polska</p>
                    <h1>Telefon:</h1>
                    <p>48+ 705-742-3221</p>`;
                    document.getElementById("writeToUs").innerHTML="Napisz do nas!";
                    document.getElementById("sendMail").innerHTML="Wyślij";
            }
        }else if(this.language=="polish"){
            this.language="english";
            recipes.innerHTML=`<div>Recipes</div>`;
            about.innerHTML=`<div>About</div>`;
            contact.innerHTML=`<div>Contact</div>`;
            document.getElementById("followUs").innerHTML="Follow us!";
            searchbtn.innerHTML="Search";
            if(curentPage=="recipeList"){
                dataforList();
                sectionTitle.innerHTML=`Recipes`;
            }
            else if(curentPage=="recipe"){
                showRecipe(currentRecipe);
            }else if(curentPage=="about"){
                sectionTitle.innerHTML=`About`;
                document.querySelector(".ele1").innerHTML=`
                <p>UnderBeer is a fictional culinary portal
                 with recipes of an alcoholic character and more.</p>`;
                 document.querySelector(".ele4").innerHTML=`
                <p>I wanted to post somewhere my way of preparing homemade
                 brew and the idea for the project was born.</p>`;
                 document.querySelector(".ele5").innerHTML=`
                <p>Maybe someday this site will become
                 something more, but for now, I don't have such plans.</p>`; 
            }
            else if(curentPage=="contact"){
                sectionTitle.innerHTML=`Contact`;
                document.getElementById("contactInfo").innerHTML=`
                <h1>E-Mail:</h1>
                <p>UnderBeer@business.com</p>
                <h1>Adress:</h1>
                <p>Wernera 8 Łączki Brzeskie Polska</p>
                <h1>Phone:</h1>
                <p>48+ 705-742-3221</p>`;
                document.getElementById("writeToUs").innerHTML="Write to us!";
                document.getElementById("sendMail").innerHTML="Send";
            }
        }
        if(lastSearched==true){
            dataforSearch(searchedPhrase);
        }
    }
}
let curretLang=new Language;
const plFlag=document.getElementById("plFlag");
const engFlag=document.getElementById("engFlag");

plFlag.addEventListener("click",()=>{
    if(curretLang.language=="english"){
        plFlag.style.outline="2px solid rgb(19, 192, 19)";
        engFlag.style.outline="none";
        curretLang.changeLang();
    }
});
engFlag.addEventListener("click",()=>{
    if(curretLang.language=="polish"){
        plFlag.style.outline="none";
        engFlag.style.outline="2px solid rgb(19, 192, 19)";
        curretLang.changeLang();
    }
});

//Color Modes

let darkMode=false;
let colorMode = document.querySelector(':root');
function changeColorMode(){
    if(darkMode==true){
        colorMode.style.setProperty('--primaryColor', "#101820FF");
        colorMode.style.setProperty('--secondaryColor', "#FFD662FF");
        colorMode.style.setProperty('--navText', "#FFD662FF");
        colorMode.style.setProperty('--navHover', "#101820FF");
        colorMode.style.setProperty('--siteNameColor', "#FCF6F5FF");
        document.getElementById("colorChanger").src="/images/darkmode.png";
        
    }else{
        colorMode.style.setProperty('--primaryColor', "#FCF6F5FF");
        colorMode.style.setProperty('--secondaryColor', "rgb(197, 45, 63)");
        colorMode.style.setProperty('--navText', "black");
        colorMode.style.setProperty('--navHover', "#FCF6F5FF");
        colorMode.style.setProperty('--siteNameColor', "rgb(197, 45, 63)");
        document.getElementById("colorChanger").src="/images/lightmode.png";
    }
}
document.getElementById("colorChanger").addEventListener("click",()=>{
    if(darkMode==true){
        darkMode=false;
    }else{
        darkMode=true;
    }
    changeColorMode();
});

//Scrolling
    let scrollbehavior = document.querySelector(':root');
    const goUp=document.getElementById("goUp");
    let currentHeight=window.innerHeight;
    window.onscroll = ()=>
    {
        currentHeight=window.innerHeight;
        if(scrollY >= window.innerHeight) {
            goUp.style.display="block";
        }else
            goUp.style.display="none";
    }
    goUp.addEventListener("click",()=>{
        scrollbehavior.style.setProperty('scroll-behavior', "smooth");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    document.getElementById("goToCom").addEventListener("click",()=>{
        scrollbehavior.style.setProperty('scroll-behavior', "smooth");
        document.getElementById("writeComment").scrollIntoView();
    });
    function scrollUp(){
        scrollbehavior.style.setProperty('scroll-behavior', "auto");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }




