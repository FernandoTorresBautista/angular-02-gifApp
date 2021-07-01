import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string="C36FBdbOVnYLHLo5ONHpda2VpDE7cGXg"; 
  private serviceUrl:string="https://api.giphy.com/v1/gifs"; 
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  // inyectar el httpClient
  constructor(private http: HttpClient){
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
    /*if ( localStorage.getItem('historial') ){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }*/
  }

  //async buscarGifs(query: string = '') { // para el await
  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify( this._historial ) ); // guardar el historial
    }

    // usar el fetch, axios o usando el modulo http ...
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=C36FBdbOVnYLHLo5ONHpda2VpDE7cGXg&q=gatos&limit=10')
    // .then(resp =>{
    //   resp.json().then(data => {
    //     console.log(data);
    //   })
    // });
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=C36FBdbOVnYLHLo5ONHpda2VpDE7cGXg&q=gatos&limit=10')
    // const data = await resp.json();
    // console.log(data);

    const params = new HttpParams()
                        .set("api_key",this.apiKey)
                        .set("limit",10)
                        .set("q",query);
    
    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params}) // {params:params})
      .subscribe( ( resp ) => {
        //console.log("resp: ", resp);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      }); // se ejecuta cuando se tenga resolucion del then
    
    //console.log(this._historial);
  }

}
