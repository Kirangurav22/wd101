let element = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let user_entries = [];

function fillTable(){
    let obj = localStorage.getItem("user_entries");
    if(obj){
        user_entries = JSON.parse(obj);
    }else{
        user_entries = [];
    }
    return user_entries;
}
user_entries = fillTable();

let username = element("name"),
  email = element("email"),
  password = element("password"),
  tc = element("tc"),
  dob = element("dob");

let errormsg = classes("errormsg");

let form = element("form");

function verify(elem,message,cnd){
    if(cnd){
        elem.style.border = "2px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    }else{
        elem.style.border = "2px solid green";
        elem.setCustomValidity('');

    }
}

function checkDOB(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age>55){
        return false;
    }else{
        return true;
    }
}
let message_name = "Username must be at least 3 characters long";
let message_email = "Email must be valid";
let message_agree = "You must agree to the terms and conditions";
let message_dob = "You age must be between 18 and 55 to continue";

username.addEventListener("input", (e) => {
    let cond_name = username.value.length < 3;
    e.preventDefault();
    verify(username,message_name,cond_name);
});

email.addEventListener("input", (e) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    verify(email,message_email,cond_email);
});

dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verify(dob,message_dob,cond_dob);
});
tc.addEventListener("input", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    verify(tc,message_agree,cond_agree);
});

function makeObject(){
    let check = false;
    if(tc.checked){
        check = true;
    }
    let obj = {
        name: username.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        checked: check
    }
    return obj;
}


function displayTable(){
    let table = element("user-table");
    let entries = user_entries;
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].checked}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
    let cond_agree= !tc.checked;
    e.preventDefault();
    if (!cond_agree) {
        let obj = makeObject();
        user_entries.push(obj);
        localStorage.setItem("user_entries", JSON.stringify(user_entries));
    }
    displayTable();
});
window.onload = (event) => {
    displayTable();
};
body{
    background-color: #75afc2;
    color: #0c0b0b;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 16px;
    line-height: 1.42857143;
    margin: 0;
    align-items: center;
}

#main{
    margin: 100px 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 500px;
    width: 90%;
}

#main h1{
    padding-top: 10px;
    padding-left: 20px;
    font-size: 42px;
}

#form-box{
    background-color: rgb(221, 207, 216);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    border-radius: 30px;
    height: 500px;
    width: 500px;
    box-shadow: rgba(18, 18, 35, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.inputs{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: left;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 30px;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
}
.inputs input{
    width: 240px;
    height: 30px;
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

#agree{
    padding-left: 20px;
    padding-top: 20px;
    font-size: 16px;
}
#agree input{
    margin-top: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid rgb(137, 24, 24);
    border-radius: 4px;
}

#submit{
    margin-left: 280px;
    margin-top: 10px;
    font-size: 20px;
    height: 50px;
    width: 90px;
    border: 0;
    border-radius: 10px;
    box-shadow: rgba(53, 53, 106, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

#table-box{
    margin : 0 20px;
    background-color: rgb(168, 228, 89);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    border-radius:20px;
    height: 500px;
    width: 800px;
    box-shadow: rgba(62, 172, 78, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

td,th{
    padding-left: 10px;
    width: 100px;
    text-align: left;
}
