import React from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import { innerdata } from '../busData/inner'
import { outerdata } from '../busData/outer'
import Modal from 'react-modal';
import BusModal from './busModal';
import axios from 'axios'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '-10%',
        transform: 'translate(-50%, -50%)',
        display: 'block'
    }
};

const BusLogo = { url: require('./assets/mapIcons/Slug_Bus.png'), scaledSize: { width: 55, height: 35 } };
const logo = require('./assets/mapIcons/Logo_2.png')
const BlueIcon = { url: require('./assets/mapIcons/Blue_Stop.png'), scaledSize: { width: 25, height: 32 } };
const RedIcon = { url: require('./assets/mapIcons/Red_Stop.png'), scaledSize: { width: 25, height: 32 } }
export class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 36.990790,
                lng: -122.058555,

            },
            zoom: 15,
            toolTipActive: false,
            showingInfoWindow: false,
            activeMarker: {},
            markerObjects: [],
            selectedStop: {},
            selectedStopURL: "",
            stopDetailsVisible: false,

        }
    }


    updateBusMarkers() {
    }

    componentDidMount() {
        console.log("GERE", this.props)
        //setInterval(this.updateBusMarkers.bind(this), 3000)
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }


    onMarkerClick(busStop) {

        console.log("DGSG", busStop)
        this.setState({
            selectedStop: busStop,
            selectedStopURL: busStop.pic,
            stopDetailsVisible: true
        });
    }

    closeModal() {
        this.setState({
            stopDetailsVisible: false
        })
    }

    onMapClicked() {
        console.log("MAP CLICKED");
        this.setState({
            showingInfoWindow: false
        })
    }
    

    onRequestClose = () => {
        console.log("closed")
    }
    render() {
        return (
            <div id="wrapper" >

                <div className="floating-panel">
                    <img style={{ width: 145, height: 55 }} src={logo}  ></img>

                </div>

                <Map
                    id="map"
                    google={this.props.google}
                    zoom={15.2}
                    onClick={this.onMapClicked.bind(this)}
                    initialCenter={{
                        lat: 36.989,
                        lng: -122.058555
                    }}
                >

                    {innerdata.map((x, index) =>

                        <Marker
                            options={{ icon: BlueIcon }}
                            title={`${x.name}
                                     ${x.lat}
                                     ${x.uid}
                                     ${x.pic}`}
                            key={x.uid}
                            position={{ lat: x.lat, lng: x.lng }}
                            onClick={this.onMarkerClick.bind(this, x)}
                        >
                        </Marker>
                    )
                    }
                    {outerdata.map((x, index) =>
                        <Marker
                            options={{ icon: RedIcon }}
                            onClick={this.onMarkerClick.bind(this, x)}
                            key={x.uid}
                            title={`
                            ${x.name}
                            ${x.lat}
                            ${x.uid}
                            ${x.pic}`}
                            position={{ lat: x.lat, lng: x.lng }}
                        >

                        </Marker>

                    )
                    }
                    {this.props.busArray.map((x, index) =>
                        <Marker

                            options={{ icon: BusLogo }}
                            key={x.id}
                            title={`
                            ${x.name}
                            ${x.lat}
                            ${x.id}
                            ${x.type}`}
                            position={{ lat: x.lat, lng: x.lgn }}>
                        </Marker>
                    )}

                </Map>


                <Modal
                    isOpen={this.state.stopDetailsVisible}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={this.closeModal.bind(this)}
                >
                    <BusModal closeModal={this.closeModal.bind(this)} selectedStop={this.state.selectedStop} />

                </Modal>


            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCVBkdLAA2jhdd9iCuPyPL4dD9xpRD32AQ")
})(MapView);

