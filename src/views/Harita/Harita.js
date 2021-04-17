import React, { Component } from "react";
import Ol from "ol/proj/projections";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import {Point} from "ol/geom";
import {Circle, Fill, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Feature, Map, Overlay, View} from 'ol/index';

class PublicMap extends Component {
  constructor(props) {
    super(props);

    var place = [this.props.lon, this.props.lat];
    var point = new Point(place);

var point = new Point(place);
    this.state = { center: [this.props.lon, this.props.lat], zoom: props.zoom };

    this.olmap = new OlMap({
      target: null,
      layers: [
        new OlLayerTile({
          source: new OlSourceOSM()
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(point)],
          }),
          style: new Style({
            image: new Circle({
              radius: 9,
              fill: new Fill({color: 'red'}),
            }),
          }),
        })
      ],
      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom,
        projection: "EPSG:4326"
      })
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [this.props.lon, this.props.lat], zoom: 5 });
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map" style={{ height: "720px" }}>
        <button onClick={e => this.userAction()}>Evin konumuna git</button>
      </div>
    );
  }
}

export default PublicMap;
