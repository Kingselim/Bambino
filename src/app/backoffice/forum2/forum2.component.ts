import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/service/forum.service';
@Component({
  selector: 'app-forum2',
  templateUrl: './forum2.component.html',
  styleUrls: ['./forum2.component.css',
              "../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../assets/BackOffice/assets/css/demo.css",
              "../../../assets/BackOffice/assets/css/fonts.css",
              "../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class Forum2Component implements OnInit {
 Forums: any[] = [];

  constructor(private forumService: ForumService) {}

  ngOnInit() {
    this.loadForums();
  }

  loadForums() {
    this.forumService.getAllForums().subscribe({
      next: (data) => {
        this.Forums = data;
      },
   
    });
  }

}
