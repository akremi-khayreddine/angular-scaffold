import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss'],
})
export class SidenavHeaderComponent implements OnInit {
  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {}
}
