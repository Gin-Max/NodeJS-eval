import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
Nom : string;
id : number;

  heroes = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
    ];
    
    @Input() heroesId: number;
    @Input() heroesName: string;
    nameheroes : string;
    
    Heroselection;
    onClique(hero): void {
      this.Heroselection = hero;
    }

  constructor() { }

  ngOnInit(): void {
  }

}
