import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "./service/authenticationService";
import {ActivatedRoute, Router} from "@angular/router";
import {ResultVO} from "../../model/commun/vo/ResultVO";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  mode:number=0;
  resultVO:ResultVO = new ResultVO();
  confirmedConnection:boolean = false;

  constructor(private authService:AuthenticationService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const param = params["param"];
      if (param != null && param !== '') {
        this.resultVO.messagesErrors = [params["param"]];
      }
    });
  }

  onLogin (user) {
    this.authService.estUserAlreadyConnected(user.username).then(resultat=>{
      this.resultVO = resultat;
      const isUserAlreadyConnected:Boolean = this.resultVO.data as Boolean;
      if(!isUserAlreadyConnected.valueOf() || this.confirmedConnection) {
        this.authService.login(user)
          .then(resp=>{
            const jwtToken = resp.headers.get('authorization');
            this.authService.saveToken(jwtToken);
            
            this.router.navigateByUrl('/pages');
          }, err=>{
            // console.log(err);
            this.mode=1;
            this.resultVO.messagesErrors = ['Invalide Utilisateur ou Mot de passe!'];
          });
      }
      else {
      //  if (confirm("Un autre utilisateur est déja connecté avec ce login, voulez-vous le déconnecter ?")) {
          this.confirmedConnection = true;
          this.onLogin(user);
      //  }
      }
    }, error=>{
      this.mode=1;
      this.resultVO.messagesErrors = ['Problème de connexion avec le serveur!'];
    });
    /*
 //   // console.log(user);
    this.authService.login(user)
      .then(resp=>{
        let jwtToken = resp.headers.get('authorization');
        this.authService.saveToken(jwtToken);
        this.router.navigateByUrl('/dashboard');
      }, err=>{
        // console.log(err);
        this.mode=1;
        this.resultVO.messagesErrors = ['Invalide Utilisateur ou Mot de passe!'];
      })
      */
  }


}
