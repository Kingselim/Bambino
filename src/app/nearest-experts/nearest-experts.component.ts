import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NearestExpertsService } from '../services/nearest-experts.service';


// 2) CUSTOM: Example of using a custom icon for user
const userIcon = L.icon({
  iconUrl: '../../assets/img/user-map-marker-icon.webp',  // put your user-marker image here
  iconSize: [51, 51],    // adjust to your preference
  iconAnchor: [26, 50],  // so that the "tip" is at the correct position
  popupAnchor: [1, -34]
});

// 3) CUSTOM: Example of using a custom icon for experts
const expertIcon = L.icon({
  iconUrl: '../../assets/img/map-marker-icon.png', // put your expert-marker image here
  iconSize: [35, 51],
  iconAnchor: [17, 34],
  popupAnchor: [1, -34]
});

@Component({
  selector: 'app-nearest-experts',
  templateUrl: './nearest-experts.component.html',
  styleUrls: ['./nearest-experts.component.css']
})
export class NearestExpertsComponent implements OnInit {
  selectedSpecialty: string = 'Doctor';
  selectedRadius: number = 1;
  specialties: string[] = ['Doctor', 'Nutritionist', 'Coach'];
  userPosition: { lat: number; lng: number } | null = null;
  map: L.Map | null = null;
  markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private expertsService: NearestExpertsService) {}

  ngOnInit(): void {
    this.getUserPosition();
  }

  getUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.initMap();
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }

  initMap() {
    if (this.userPosition) {
      this.map = L.map('map').setView([this.userPosition.lat, this.userPosition.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // ADD THE USER MARKER with a custom userIcon
      L.marker([this.userPosition.lat, this.userPosition.lng], {
        icon: userIcon,
        title: 'Your Location'
      })
        .addTo(this.map)
        .bindPopup('You are here')
        .openPopup();
    }
  }

  searchNearestExperts() {
    if (!this.userPosition) {
      return;
    }
    
    // Clear previous markers
    this.markersLayer.clearLayers();

    this.expertsService.getNearestExperts(
      this.selectedSpecialty,
      this.userPosition.lat,
      this.userPosition.lng,
      this.selectedRadius
    ).subscribe((experts: any[]) => {
        experts.forEach(expert => {
          // Use the custom expertIcon for each expert
          const marker = L.marker([expert.latitude, expert.longitude], {
            icon: expertIcon,
            title: expert.name
          }).bindPopup(`<b>${expert.name}</b><br>Specialty: ${expert.specialty}`);

          this.markersLayer.addLayer(marker);
        });
        this.markersLayer.addTo(this.map!);

        // Optionally adjust the map view to fit new markers
        if (experts.length) {
          const group = new L.FeatureGroup(this.markersLayer.getLayers());
          this.map!.fitBounds(group.getBounds(), { padding: [50, 50] });
        }
      }, error => {
        console.error('Error fetching nearest experts:', error);
      });
  }
}
