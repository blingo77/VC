import React from 'react';
import './Map.css';

class Map extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAUCSgCxCbZBXR1o8L5gy2cjJ0VnaO1OEY&callback=initMap`;
    script.async = true;
    script.defer = true; // Ensure the script is deferred

    script.onerror = () => {
      console.error('Error loading Google Maps API script');
    };

    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google) {
        console.error('Google Maps API failed to load');
      } else {
        this.initMap();
      }
    };
  }

  initMap() {
    // Your map initialization code here
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 36.17158889770508, lng: -115.13925170898438 },
      zoom: 12,
    });
  }

  render() {
    return (
      <div id="map">
        {/* Google Map will be rendered here */}
      </div>
    );
  }
}

export default Map;