import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
    apiKey = '';
    @ViewChild('map') googleMap;
    mapElement: any;
    map: any;
    mapOptions: any;
    mapCenter = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
  constructor(private geolocation: Geolocation) {
      const script = document.createElement('script');
      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=';
      }
      document.head.appendChild(script);
      this.geolocation.getCurrentPosition().then((resp) => {
        this.mapCenter.lat = resp.coords.latitude;
        this.mapCenter.lng = resp.coords.longitude;
          // resp.coords.latitude
          // resp.coords.longitude
      }).catch((error) => {
          console.log('Error getting location', error);
      });
  }

  ngAfterViewInit(): void {
      this.mapElement = this.googleMap.nativeElement;
      this.mapOptions = {
          center: this.mapCenter,
          zoom: 8
      };

      setTimeout(() => {
          this.map = new google.maps.Map(this.mapElement, this.mapOptions);

          this.markerOptions.position = new google.maps.LatLng(this.mapCenter.lat, this.mapCenter.lng);
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'My Location';
          this.marker = new google.maps.Marker(this.markerOptions);

      }, 2000);

  }

}
