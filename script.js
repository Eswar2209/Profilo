/* TYPING EFFECT */

const nameText="Eswar Kethavarapu";
const roleText="AI-ML Engineer | Frontend Developer | Problem Solver";

let i=0;
let j=0;

function typeName(){
if(i<nameText.length){
document.getElementById("typing-name").innerHTML+=nameText.charAt(i);
i++;
setTimeout(typeName,100);
}else{
typeRole();
}
}

function typeRole(){
if(j<roleText.length){
document.getElementById("typing-role").innerHTML+=roleText.charAt(j);
j++;
setTimeout(typeRole,60);
}
}

typeName();


/* PAGE SWITCH */

const links=document.querySelectorAll("nav a");
const pages=document.querySelectorAll(".page");

links.forEach(link=>{
link.addEventListener("click",function(e){

e.preventDefault();

const target=this.getAttribute("href").replace("#","");

pages.forEach(page=>{
page.classList.remove("active");
});

document.getElementById(target).classList.add("active");

if(target==="skills"){
showSkills();
}

});
});


/* SKILLS STEP BY STEP */

function showSkills(){
const skills=document.querySelectorAll(".skill");

skills.forEach((skill,index)=>{
setTimeout(()=>{
skill.classList.add("show");
},index*300);
});
}