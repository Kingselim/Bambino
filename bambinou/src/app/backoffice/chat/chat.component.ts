import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {User} from "../../model/User";
import { UserServiceService } from '../../service/user-service.service';
import { Conversation } from 'src/app/model/Conversation';
import { Message } from 'src/app/model/Message';
import {  MessageService } from '../service/message.service';
import { ConversationService} from "../service/conversation.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css',"../../../assets/BackOffice/assets/css/bootstrap.min.css",
    "../../../assets/BackOffice/assets/css/demo.css",
    "../../../assets/BackOffice/assets/css/fonts.css",
    "../../../assets/BackOffice/assets/css/fonts.min.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class ChatComponent {
  CurrentEmail! : string;
  CurrentName! : string;
  CurrentConversation! : number;
  User! : User;
  listConversation! : Conversation[];
  listMessageEnvoye: Message[] = [];
  listMessageRecu: Message[] = [];
  listMessage! : Message[];
  id : number = 4;
  MessageForm: FormGroup;
  private intervalId: any;
  listUsers! : User[];

  // ici cest pour la creation dune nouvelle conversation
  UserConv! : User;

  //ici pour la suppresion dune conv
  RemoveConv! : Conversation;
  constructor(private authService: AuthService,private rt:Router,private UserService: UserServiceService, private ConversationService: ConversationService, private MessageService: MessageService) {
    this.MessageForm = new FormGroup({
      message: new FormControl('', [Validators.required])
    })
   }
  
  ngOnInit() {
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      if (decodedToken) {
        this.CurrentEmail = decodedToken.sub;
        this.CurrentName = decodedToken.name;
        console.log(this.CurrentEmail);

        this.UserService.getUserByEmail(this.CurrentEmail).subscribe(data => {
          this.User = data
          console.log('dans chat User email:', this.User.email);
          console.log('dans chat User id:', this.User.id);
          

          this.ConversationService.getConversationsByUser(this.User.id).subscribe(data => {
          console.log("Conversations récupérées :", data);
          this.listConversation = data;



          this.listConversation.forEach(conv => {
            console.log(conv.creationDate);
              
            });
    
    
         
          this.MessageService.getMessagesByConversation(this.id).subscribe(data => {
            console.log("les messages sont  récupérées :", data);

            this.listMessage = data
            console.log('le nombre de message est :', this.listMessage.length);
            console.log('le message est :', this.listMessage[0].sender.id);
            this.listMessage.forEach(msg => {
              if (msg.sender.id == this.User.id) {
                this.listMessageEnvoye = [...this.listMessageEnvoye, msg];
                console.log(msg);
              } else {
                this.listMessageRecu = [...this.listMessageRecu, msg];
                console.log(msg);
              }
            })
            this.loadData();

    this.intervalId = setInterval(() => {
      this.loadData();
    }, 5000);

            
          })
    
          
        })
    
        })

       
      


      }


      
      
    }

    this.UserService.getUser().subscribe(data => {
      this.listUsers = data
    })
    

  // fin ngonInit
  }
  loadData(): void {
    
    console.log('Données mises à jour...');
    this.MessageService.getMessagesByConversation(this.id).subscribe(data => {
      console.log("les messages sont  récupérées :", data);

      this.listMessage = data
    })
    // Ajoute ici la logique à exécuter toutes les secondes
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  sendMessage() {
    console.log('message envoyé');
    console.log(this.MessageForm.value.message);

    this.MessageService.addMessageToConversation(this.id,this.User.id ,this.MessageForm.value.message).subscribe(
    ()=> {    this.ngOnInit();
    })
    this.MessageForm.reset(); // Efface le champ après envoi

  }

  setconversation(id : number){
    this.id=id;
    this.ngOnInit();
  }

  createConversation(id : number){
    const conv = new Conversation();
     this.UserService.getUserById(id).subscribe(data => {
      this.UserConv = data
    })
    conv.creationDate = new Date();
    conv.users = [this.UserConv, this.User];
    this.ConversationService.addConversation(conv).subscribe(data => {
     this.ConversationService.addUserToConversation(data.idConversation, this.User.id).subscribe(data =>{
      this.ConversationService.addUserToConversation(data.idConversation, this.UserConv.id).subscribe(
        ()=> this.ngOnInit()
      )
    }
      
     )
     
    })
  }

  removeconversation(id : number){
    this.RemoveConv = this.listConversation.find(conv => conv.idConversation == id)!;
    this.ConversationService.removeUserFromConversation(id, this.User.id).subscribe(
     
    )
    this.ConversationService.removeUserFromConversation(id, this.UserConv.id).subscribe( 
        
    )
    this.RemoveConv.messages.forEach(msg => {
      this.MessageService.deleteMessage(msg.idMessage).subscribe()
    })

    this.ConversationService.deleteConversation(id).subscribe(
      ()=> this.ngOnInit()
    )
  }

}
