import Phaser from "phaser";
import {BotonSencillo} from "../js/button";
import { getPhrase } from "../services/translations";

export default class SeleccionFaccion extends Phaser.Scene
{
    #lenguaje;
    ready1;
    ready2;
    constructor(){
        super('SeleccionFaccion')
    }

    init(data){
        this.sonidos = data.sonidos
        this.#lenguaje = data.lenguaje
    }
    create() {
        let style = {
            fontSize: '20px',
            fontFamily: 'asian',
            color: '#000',
            border: 5 ,
        }
        this.registry.events.on('resetear listas para jugar de nuevo', ()=>{
            this.ready1 = null;
            this.ready2 = null;
        });
        this.cameras.main.fadeIn(2000);
        this.sonidos.MainMenuSonido.resume()
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'elegirFaccion')
        //ELIGE TU facción
        this.add.text(this.cameras.main.centerX, 70, getPhrase('ELIGE TU FACCIÓN'), style).setStyle({fontSize: '70px', fontDamily: 'asian'}).setOrigin(.5)

        new BotonSencillo({scene:this, x:70, y:60, texture:'botonVolver', text:'', size:0,  callback:() => this.scene.start('MainMenu', {sonidos:this.sonidos, languaje:this.#lenguaje}), scale:0.75, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})

        new BotonSencillo({scene:this, x:330, y:630, texture:'botonListo', text:getPhrase('LISTO'), size:50,  callback:() => {this.ready1 = true, this.reviewReady()}, scale:0.70, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
        new BotonSencillo({scene:this, x:950, y:630, texture:'botonListo', text:getPhrase('LISTO'), size:50,  callback:() => {this.ready2 = true, this.reviewReady()}, scale:0.70, callbackHover:()=>{this.sonidos.HoverBoton.play()}, callbackOut:()=>{this.sonidos.HoverBoton.pause()}})
    
    }
    update(){
        this.reviewReady();
    }
    reviewReady(){
        (this.ready1 && this.ready2 === true)?[this.scene.start('SeleccionPersonaje', {sonidos:this.sonidos, lenguaje:this.#lenguaje})]:null;
    }
}
