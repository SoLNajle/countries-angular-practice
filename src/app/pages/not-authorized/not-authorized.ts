import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-authorized',
  imports: [MatButton, RouterModule],
  templateUrl: './not-authorized.html',
  styleUrl: './not-authorized.scss',
})
export class NotAuthorizedComponent {}
