import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {GoogleAuthProvider, GithubAuthProvider} from '@angular/fire/auth'
import { fetchSignInMethodsForEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth, private router:Router) { }

  //Login Method

  login(email:string, password:string){

    this.fireauth.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem('token','true')
      
      if(res.user?.emailVerified == true) {        
        this.router.navigate(['dashboard'])
      } else {
        this.router.navigate(['/verify-email'])
      }
    }, err =>{
      alert(err.message)
      this.router.navigate(['/login'])

    })
  }

    //Register Method

    register(email:string, password:string){

      this.fireauth.createUserWithEmailAndPassword(email,password).then( res=>{
        alert('registration successful')
        this.router.navigate(['/login'])
        this.sendEmailForVerify(res.user)
  
      }, err =>{
        alert(err.message)
        this.router.navigate(['/register'])
  
      })
    }


  // Log Out
  
    logout(){
      this.fireauth.signOut().then(()=>{
        localStorage.removeItem('token')
        this.router.navigate(['/home'])

      }, err =>{
        alert(err.message)
      })
    }


    // Forgot 

forgotPassword(email: string) {
  
  // this.fireauth.fetchSignInMethodsForEmail(email).then((user) => {
  //   if (user && user.length > 0) {
      
  //   }else {
  //     alert('User with the provided email does not exist.');
  //   }

  // });

  this.fireauth.sendPasswordResetEmail(email).then(() => {
    this.router.navigate(['/verify-email']);
  },err=>{
    alert('Something went wrong');
  });

}



    

  // Verify Mail

  sendEmailForVerify(user:any){

    user.sendEmailVerification().then((res:any)=>{

      this.router.navigate(['/verify-email'])
    }, (err:any) =>{
      alert('something went wrong , Not able to send Mail')

    })
    
    
  }
    

  // Sign in with Google

  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      this.router.navigate(['/dashboard'])
      localStorage.setItem('token',JSON.stringify(res.user?.uid))

    },err=>{
      alert(err.message)
    })
  }


    // Sign in with Google

    githubSignIn(){
      return this.fireauth.signInWithPopup(new GithubAuthProvider).then(res=>{
        this.router.navigate(['/dashboard'])
        localStorage.setItem('token',JSON.stringify(res.user?.uid))
  
      },err=>{
        alert(err.message)
      })
    }
}
