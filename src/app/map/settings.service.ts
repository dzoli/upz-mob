import { Injectable } from '@angular/core';
import { TileLayer, latLng, icon } from 'leaflet';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    options = {
        zoom: 14,
        maxZoom: 18,
        zoomControl: true,
        preferCanvas: true,
        attributionControl: true,
        center: latLng(45.2484331, 19.8165728),
        layers: [new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
    };
    public def = icon({
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
    });

    public get iconDefault() {
        return this.def;
    }

    constructor() {}
}
