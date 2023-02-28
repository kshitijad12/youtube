
class User{
  
   constructor(){
      //this.name= n;
   }

    validateUsername(username){
        // if(username.includes("@")){
        //     return false;
        // }
        // else{
        //     return true;
        // }
      return username.includes("@") ? false :true;
    }
    
    validatePassword(password){
        // if password length is less than 8, return false elase true

        return password.length < 8 ? false : true;
    }

   async signUP(n,e,u,p,m,d){
      //check if user is submitting valid username & password
      
      let isValidated = this.validateUsername(u) && this.validatePassword(p);
      if(isValidated){
        //good to store the data
        this.name= n;
        this.email =e;
        this.username=u;
        this.password=p;
        this.mobile=m;
        this.description=d;

        const register_api ="https://masai-api-mocker.herokuapp.com/auth/register"
        
        const response = await fetch(register_api, {
            method: 'POST',
            body: JSON.stringify(this),
            headers:{
                'Content-Type':'application/json',
            },
        });
         
        const data = await response.json();
        console.log('data:', data);
      }
   }

   async Login(u,p){
     const login_data ={
        username:u,
        password:p,
     };
     
    const login_api =`https://masai-api-mocker.herokuapp.com/auth/login`
    
    const response = await fetch (login_api,{
        method: 'POST',
        body: JSON.stringify(login_data),
        headers:{
            'Content-Type':'application/json',
        },
    
   });
    const data = await response.json();
    //console.log('data:',data);
    return data;
  }

}


let user = new User()


const Register =()=>{
    const reg_form = document.getElementById("reg_form");

    const name= reg_form.name.value;
    const email = reg_form.email.value;
    const username = reg_form.username.value;
    const password = reg_form.password.value;
    const mobile = reg_form.mobile.value;
    const description = reg_form.description.value;

    user.signUP(name,email,username,password,mobile,description);
    console.log('user:',user);

};

const Login= async ()=>{
    const username = document.getElementById('login-username').value;

   const password = document.getElementById('login-password').value;
   let {token} = await user.Login(username,password);
   getProfile(username,token)

};
const getProfile = async (username,token)=>{
let api_link = `https://masai-api-mocker.herokuapp.com/user/${username}`

let response = await fetch(api_link,{
    headers:{
         Authorization:`Bearer ${token}`,
         'Content-type': 'application/json'
    },
});
 let data = await response.json();
 console.log('data:',data);
  window.location.href="./index.html";
}