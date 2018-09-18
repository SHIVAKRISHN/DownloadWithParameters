import { Component,OnInit } from '@angular/core'
import { AppServerService } from './app-server.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';  
  ngOnInit() {
    
  }

  constructor(private dataObj : AppServerService){

  }

  submit(form : NgForm)
  {
    console.log(form.value);
    
    this.dataObj.downloadTheRecepit(form.value);
  }


}
