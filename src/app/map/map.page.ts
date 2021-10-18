import { Task } from './../task-list/task/task.model';
import { SettingsService } from './settings.service';
import { ShapeService } from './shape.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { circle, LayerGroup, tileLayer, TileLayer, latLng, Map as LMap, polygon, geoJSON, icon, Marker } from 'leaflet';
import { BaseLayer } from './BaseLayer.enum';
import { GeoJsonGeometryTypes } from 'geojson';
import { Router } from '@angular/router';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage {
    public map: LMap;
    public baseMapUrls = {
        [BaseLayer.osm]: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        [BaseLayer.offline]: './assets/map_test/{z}/{x}/{y}.png',
    };
    public selectedLayer: string;
    public baseLayer = BaseLayer;
    private baseMapLayerGroup = new LayerGroup();

    public locating = false;
    private gpsLoadingEl: HTMLIonLoadingElement;
    private locationLayerGroup = new LayerGroup();
    task: Task;

    //GeoJSON
    private geoJSONLayer;

    constructor(
        private alertController: AlertController,
        private loadingController: LoadingController,
        private toastCtrl: ToastController,
        private serviceShape: ShapeService,
        public settingsService: SettingsService,
        private ctrlModal: ModalController,
        private router: Router
    ) {
        Marker.prototype.options.icon = settingsService.iconDefault;
    }

    ionViewDidEnter() {
        console.log('history', history.state.task);
        if (history.state.task) {
            this.task = history.state.task;
        } else {
            this.task = null;
        }
    }

    public async onMapReady(lMap: LMap) {
        this.map = lMap;
        this.map.addLayer(this.baseMapLayerGroup);
        this.map.addLayer(this.locationLayerGroup);
        this.switchLayer(BaseLayer.osm);
        setTimeout(() => lMap.invalidateSize(true), 0);
        this.geoJSONLayer = geoJSON().addTo(this.map);
        this.geoJSONLayer.addData(this.serviceShape.markerFeature);
        this.geoJSONLayer.addData(this.serviceShape.grbavica);
    }

    public switchLayer(baseLayerName: string) {
        if (this.selectedLayer === baseLayerName) {
            return;
        }
        this.baseMapLayerGroup.clearLayers();
        const baseMapTileLayer = new TileLayer(this.baseMapUrls[baseLayerName]);
        this.baseMapLayerGroup.addLayer(baseMapTileLayer);
        this.selectedLayer = BaseLayer[baseLayerName];
    }

    presentToast(msg: string) {
        this.toastCtrl
            .create({
                message: msg,
                duration: 2000,
            })
            .then((toastEl) => {
                toastEl.present();
            });
    }

    presentModal() {
        // this.ctrlModal
        //     .create({
        //         component: AnalysisDialogComponent,
        //     })
        //     .then((el) => {
        //         el.present();
        //     });
    }

    public async locate() {
        this.presentModal();
        // this.locationLayerGroup.clearLayers();
        // await this.presentLoading();
        // Geolocation.getCurrentPosition()
        //     .then((pos) => {
        //         this.onLocationSuccess(pos);
        //     })
        //     .catch((err) => {
        //         this.onLocateError(err);
        //     });
    }

    private onLocationSuccess(position: GeolocationPosition) {
        const { accuracy, latitude, longitude } = position.coords;
        const latlng = [latitude, longitude];
        console.log('onLocationSuccess', position);
        this.hideLoading();
    }

    private async onLocateError(error) {
        this.hideLoading();
        const alert = await this.alertController.create({
            header: 'GPS error',
            message: error.message,
            buttons: ['OK'],
        });

        await alert.present();
    }

    private async presentLoading() {
        this.gpsLoadingEl = await this.loadingController.create({
            message: 'Locating device ...',
        });
        await this.gpsLoadingEl.present();
    }

    private hideLoading() {
        this.gpsLoadingEl.dismiss();
    }
}
