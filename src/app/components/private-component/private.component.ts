import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-component',
  template: `
    <p>
      This is the private component
    </p>
  `,
  styles: [
  ]
})
export class PrivateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
