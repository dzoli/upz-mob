import { latLng, geoJSON } from 'leaflet';
import { Injectable } from '@angular/core';
import * as geojson from 'geojson';

@Injectable({
    providedIn: 'root',
})
export class ShapeService {
    ns = latLng(45.2484331, 19.8165728); // Novi Sad

    grbavica: geojson.Polygon = {
        coordinates: [
            [
                [19.8165728, 45.2484331],
                [19.8228384, 45.2402747],
                [19.8408199, 45.2433871],
                [19.8374082, 45.2519831],
                [19.8165728, 45.2484331],
            ],
        ],
        type: 'Polygon',
    };

    markerFeature: geojson.Feature = {
        type: 'Feature',
        properties: {
            name: 'Coors Field',
            amenity: 'Baseball Stadium',
            popupContent: 'This is where the Rockies play!',
        },
        geometry: {
            type: 'Point',
            coordinates: [19.8165728, 45.2484331],
        },
    };

    get nsGeoJSON() {
        return geoJSON(this.grbavica);
    }

    get nsLatLng() {
        return this.ns;
    }

    get ns1MarkerFeature() {
        return this.markerFeature;
    }

    constructor() {}
}
