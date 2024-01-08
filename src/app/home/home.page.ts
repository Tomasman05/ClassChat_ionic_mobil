import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages:any
  newMessage:any
  userName=""

  constructor(private base:BaseService) {
    this.base.getMessages().snapshotChanges().pipe(
      map((ch)=>ch.map(
        (c)=>({key:c.payload.key,...c.payload.val()})
      ))
    ).subscribe((res)=>this.messages=res)
  }
  addMessage(){
    let body={user:"Lajos:", time:new Date().toLocaleTimeString(),content:this.newMessage}
    this.userName=body.user
    this.base.addMessage(body)
    this.newMessage=""
  }

  deleteMessage(body:any){
    this.base.deleteMessage(body)
  }
  editMessage(body:any){
    this.base.uploadMessage(body)
  }
}
