import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {


  get historial() {
    return this.gifsService.historial;
  }

  // inyectar el servicio
  constructor(
    private gifsService: GifsService
  ) { }

  buscar(term:string) {
    this.gifsService.buscarGifs(term);
  }

}
