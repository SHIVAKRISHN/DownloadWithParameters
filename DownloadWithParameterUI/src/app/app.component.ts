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

  constructor(private backendService : AppServerService){

  }

  angular2Submit(form : NgForm)
  {
    console.log(form.value);
    
    this.backendService.ExportPdfInAngular2(form.value);
  }

  angular6Submit(form : NgForm)
  {
    this.backendService.ExportPdfInAngular6(form.value);
  }


}
