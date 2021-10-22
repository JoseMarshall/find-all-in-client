import submitForm from "./submitForm.js";
import {getCSRF, isLogged} from "../utils.js";

const form = document.querySelector(".login-form");

form.addEventListener("submit",submitForm);

async function main(){
  try {
    const token = await getCSRF();
    if(!token) throw new Error("Not Token");

    const isAuth = (await isLogged()).payload.error.details.isAuthenticated;
    if(!isAuth) throw new Error("Not authenticated");
    
  } catch (error) {
   console.error(error); 
  }
}
