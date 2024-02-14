import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  position,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import { useJsApiLoader,GoogleMap, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { SkeletonText } from '@chakra-ui/react/dist/chakra-ui-react.cjs' 
import { useState } from 'react'

import { useRef } from 'react';


// Center of the map (Goldsmiths University)
const center = {lat: 51.47442, lng: -0.03541}

//WESTMINSTER

//Violence (RED)
const WhitehallCt = {lat: 51.50602 , lng:-0.12462 }
const ParliamentSt = {lat: 51.50062, lng:-0.12615}
const WestminsterPier = {lat: 51.50185, lng:-0.12400}
const WestminsterArms = {lat: 51.50062, lng: -0.12980}
const CarteretSt = {lat: 51.49973, lng: -0.13271}
const DacreSt = {lat: 51.49890, lng: -0.13264}
const StarbucksCoffee = {lat: 51.49908, lng: -0.13550}
const VictoriaSt = {lat: 51.49754, lng: -0.13538}
const OldPyeSt = {lat: 51.49754, lng: -0.13222}
const StMatthewStreet = {lat: 51.497102, lng: -0.133238}
const GreycoatPlace = {lat: 51.496519, lng: -0.133701}
const GreatPeterStreet = {lat: 51.496876, lng:-0.130487}
const DeanTrenchSt = {lat: 51.495912, lng: -0.128100 }
const HorseferryRd = {lat: 51.494828, lng: -0.129069 }
const ArnewaySt = {lat: 51.495378, lng: -0.131864}
const ChadwichSt = {lat: 51.496322, lng: -0.131978}
const ThorneySt = {lat: 51.493969, lng: -0.126162}
const PageSt = {lat: 51.493938, lng: -0.129264}
const RegencySt = {lat: 51.494229, lng: -0.132351}
const VincentStreet = {lat: 51.492524, lng: -0.131342}
const RegencyStreet = {lat: 51.492406, lng: -0.132277}
const WalcottSt = {lat: 51.493295, lng: -0.137398}
const VauxhallBridgeRoad = {lat: 51.492621, lng: -0.137603}
const HatherleyStreet = {lat: 51.492692, lng: -0.137361}
const HerrickSt = {lat: 51.491102, lng: -0.129670}
const CuretonSt = {lat: 51.490623, lng: -0.130482}
const AtterburySt = {lat:51.490485, lng: -0.127659}
const VictoriaStreet = {lat: 51.496596, lng: -0.142520}
const ThirlebyRoad = {lat: 51.496158, lng: -0.138331}
const GreencoatRow = {lat: 51.495541, lng: -0.136404}
const FrancisSt = {lat: 51.495182, lng: -0.138114}
const MorpethTerrace = {lat:51.495287,lng:-0.139967}
const StillingtonStreet = {lat: 51.494323, lng: -0.137402}
const SpenserStreet = {lat: 51.497474, lng: -0.137060}
const VandonStreet = {lat: 51.498760, lng: -0.136475}
const BuckinghamGate = {lat: 51.499252, lng: -0.138648}
const PalaceStreet = {lat: 51.499008, lng: -0.142333}

//Theft (Lime)
const ScotlandYard = {lat: 51.50612 , lng:-0.12565 }
const KoreanCC = {lat: 51.50697,lng: -0.12499}
const CraigCt = {lat: 51.50671, lng: -0.12704}
const QueenElizabethCentre = {lat: 51.50053, lng:-0.12907}
const MargaretChurch = {lat: 51.50012, lng:-0.12626}
const TescoExpress = {lat: 51.50132, lng:-0.12484}
const GeorgeStreet = {lat: 51.50114, lng:-0.12804}
const OldQueenSt = {lat: 51.50078, lng:-0.13049}
const Broadway = {lat: 51.49967, lng:-0.13306}
const TheSanctuary = {lat: 51.49941, lng:-0.12937}
const PalmerSt = {lat: 51.49794, lng: -0.13540}
const B323St = {lat: 51.49764, lng: -0.13571}
const StMatthewSt = {lat: 51.4975, lng: -0.1333}
const RochesterRow = {lat: 51.496308,lng: -0.134781}
const GreatSmithSt = {lat: 51.498083,lng: -0.129897}
const GreatPeterSt = {lat: 51.496965,lng: -0.125598}
const TuftonSt = {lat: 51.496588,lng: -0.128445}
const BennettYard = {lat: 51.496046, lng: -0.128528}
const SmithSquare = {lat: 51.495759, lng: -0.126720}
const RomneySt = {lat: 51.495309, lng: -0.128019}
const HorseferryRoad = {lat: 51.494866, lng: -0.129485}
const MedwaySt = {lat: 51.495421, lng: -0.130969}
const ChadwichStreet = {lat: 51.496606, lng: -0.132080}
const PageStreet = {lat: 51.493996, lng:-0.126793}
const MaunselSt = {lat: 51.494517, lng: -0.132976}
const RochesterSt = {lat: 51.495079, lng: -0.134605}
const VincentSt = {lat: 51.492958, lng: -0.131147}
const HatherleySt = {lat: 51.492964, lng: -0.137797}
const DouglasStreet = {lat: 51.491329, lng: -0.133512}
const Millbank = {lat:51.491832, lng: -0.125412};
const BessboroughGardens = {lat: 51.488892, lng: -0.129819};
const VictoriaSquare = {lat: 51.497790, lng: -0.144900};
const LowerGrosvenorPlace = {lat: 51.496846, lng: -0.141836}
const KingsScholarsPassage = {lat: 51.495889, lng:-0.141602}
const AshleyPl = {lat: 51.496255, lng: -0.140257}
const AmbrosdenAvenue = {lat: 51.496387, lng: -0.139407}
const thirlebyrd = {lat: 51.496364, lng: -0.138538}
const howichplace = {lat: 51.496783, lng: -0.136799}
const ArtilleryRow = {lat: 51.496422, lng: -0.135673}
const FrancisStreet = {lat: 51.495283, lng: -0.138347}
const SpenserSt = {lat: 51.497923, lng: -0.136431}
const VandonSt = {lat: 51.498753, lng: -0.136759}
const QueenAnneGate = {lat: 51.500546, lng: -0.133356}
const PalaceSt = {lat: 51.499074, lng: -0.142662}
const Warwichrow = {lat: 51.498402, lng: -0.142873}
const StaffordPlace = {lat: 51.499522, lng: -0.141418}

//Robbery/Burglary/Shoplifting (Orange/Amber)
const HorseGuardsAve  ={lat:51.50500, lng: -0.12481}
const MatthewParkerSt = {lat:51.50032, lng:-0.13034}
const CaxtonSt = {lat: 51.49843, lng: -0.13591}
const B323 = {lat: 51.49736, lng: -0.13567}
const SaintMatthewSt = {lat: 51.496899,lng: -0.133187}
const MonckStreet = {lat: 51.495408, lng: -0.130747}
const HidePlace = {lat: 51.492091, lng: -0.133685}
const WillowPlace = {lat: 51.493132, lng: -0.137973}
const DouglasSt = {lat: 51.491377, lng: -0.133639}
const BeestonPlace = {lat: 51.497926, lng:-0.145605}
const VictoriaSqr = {lat: 51.497987,lng: - 0.144777}
const AllingtonSt = {lat: 51.496806, lng: -0.142958}
const VauxhallBridgeRd = {lat: 51.496271, lng: -0.142462}
const AmbrosdenAve = {lat: 51.496349, lng: -0.139490}
const HowichPlace = {lat:51.496689, lng: -0.137099}
const StillingtonSt = {lat: 51.494555, lng: -0.138282}
const CardinalWalk = {lat: 51.498009, lng: -0.140239}
const WarwichRow = {lat: 51.498428, lng:-0.142855}

//Vehicle crime (Purple)
const DacreSreet = {lat: 51.49894, lng: -0.13287}
const MonckSt = {lat: 51.496294, lng: -0.130817}
const RutherfordSt = {lat: 51.494081, lng:-0.132844}
const EsterbrookeSt = {lat: 51.491998, lng: -0.132809}
const PonsonbyPlace = {lat: 51.490199, lng: -0.130802}
const ThirlebyRd = {lat: 51.496344, lng: -0.138701}
const HowichPl = {lat: 51.496677, lng: -0.137328}
//Location


function App() {
const {isLoaded} = useJsApiLoader({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  })

  const [map, setMap] = useState (/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const originRef = useRef()

  const destionationRef = useRef()

/* global google */

  



  if(!isLoaded) {
    return <SkeletonText />
  }

  // HOW TO DO BUS ROUTES
      /* eslint-disable-next-line no-undef */
      // travelMode: google.maps.TransitMode.BUS,
      /* eslint-disable-next-line no-undef */
      // travelMode: google.maps.TravelMode.TRANSIT
  
  async function calculateRoute() {
    const selectTravelMode = document.getElementById('travels').value;
    if (originRef.current.value === '' || destionationRef.current.value === '') {
      return
    }
    /* eslint-disable-next-line no-undef */
    const directionsService = new google.maps.DirectionsService()
 
    const results = await directionsService.route ({
      
      origin: originRef.current.value,
      destination: destionationRef.current.value,
      /* eslint-disable-next-line no-undef */
      travelMode: getGoogleMapsTravelMode(selectTravelMode)

    });
  
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    }
  
   function getGoogleMapsTravelMode(selectTravelMode) {
    switch(selectTravelMode) {
      case 'Walking':
        return google.maps.TravelMode.WALKING;
      case 'Bicycling':
        return google.maps.TravelMode.BICYCLING;
      case 'Driving':
        return google.maps.TravelMode.DRIVING;
      case 'Public Transport':
        return google.maps.TravelMode.TRANSIT;
    }
   }
   function clearRoute() {
    setDirectionResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destionationRef.current.value = ''
   }

   var UserlocationLat = 0;
   var UserlocationLng = 0;
   const Userlocation = {lat: UserlocationLat, lng: UserlocationLng};

  findMyCoordinates();


   function findMyCoordinates() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        UserlocationLat = position.coords.latitude
        UserlocationLng = position.coords.longitude

        Userlocation.lat = UserlocationLat;
        Userlocation.lng = UserlocationLng;

      },
      (err) => {
        alert(err.message)
      })

    } else {
      alert("Geolocation is not supported by your browser")
    }
   }


  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      bgColor='blue.200'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* google maps* Api */}
        <GoogleMap 
        center={center} 
        zoom= {15} 
        mapContainerStyle={{width: '100%', height: '100%'}}
        
        onLoad={(map) => { 
          setMap(map)
          //Circle around goldsmiths test
          const circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: center,
            radius: 100,
            map: map
          });
        setMap(circle)
          
          //Westminster
          //Violence
          const V1 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: WhitehallCt,
            radius: 30,
            map: map
          });
        setMap(V1)

          const V2 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: ParliamentSt,
              radius: 50,
              map: map
            });
          setMap(V2)

          const V3 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: WestminsterPier,
              radius: 50,
              map: map
            });
          setMap(V3)

          const V4 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: WestminsterArms,
            radius: 20,
            map: map
          });
          setMap(V4)

          const V5 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: CarteretSt,
            radius: 15,
            map: map
          });
          setMap(V5)

          const V6 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: DacreSt,
            radius: 15,
            map: map
          });
          setMap(V6)

          const V7 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: StarbucksCoffee,
            radius: 15,
            map: map
          });
          setMap(V7)

          const V8 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: VictoriaSt,
            radius: 10,
            map: map
          });
          setMap(V8)

          const V9 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: OldPyeSt,
            radius: 40,
            map: map
          });
          setMap(V9)

          const V10 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: StMatthewStreet,
            radius: 10,
            map: map
          });
          setMap(V10)

          const V11 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: GreycoatPlace,
            radius: 10,
            map: map
          });
          setMap(V11)

          const V12 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: GreatPeterStreet,
            radius: 50,
            map: map
          });
          setMap(V12)
          const V13 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: DeanTrenchSt,
            radius: 10,
            map: map
          });
          setMap(V13)

          const V14 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: HorseferryRd,
            radius: 20,
            map: map
          });
          setMap(V14)

          const V15 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: ArnewaySt,
            radius: 20,
            map: map
          });
          setMap(V15)

          const V16 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: ChadwichSt,
            radius: 20,
            map: map
          });
          setMap(V16)

          const V17 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: ThorneySt,
            radius: 10,
            map: map
          });
          setMap(V17)

          const V18 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: PageSt,
            radius: 20,
            map: map
          });
          setMap(V18)

          const V19 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: RegencySt,
            radius: 20,
            map: map
          });
          setMap(V19)

          const V20 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: VincentStreet,
            radius: 20,
            map: map
          });
          setMap(V20)

          const V21 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: RegencyStreet,
            radius: 10,
            map: map
          });
          setMap(V21)

          const V22 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: WalcottSt,
            radius: 10,
            map: map
          });
          setMap(V22)

          
          const V23 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: VauxhallBridgeRoad,
            radius: 10,
            map: map
          });
          setMap(V23)

          const V24 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: HatherleyStreet,
            radius: 10,
            map: map
          });
          setMap(V24)

          const V25 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: HerrickSt,
            radius: 25,
            map: map
          });
          setMap(V25)

          const V26 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: CuretonSt,
            radius: 15,
            map: map
          });
          setMap(V26)

          const V27 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: AtterburySt,
            radius: 15,
            map: map
          });
          setMap(V27)

          const V28 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: VictoriaStreet,
            radius: 50,
            map: map
          });
          setMap(V28)

          const V29 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: ThirlebyRoad,
            radius: 20,
            map: map
          });
          setMap(V29)

          const V30 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: GreencoatRow,
            radius: 10,
            map: map
          });
          setMap(V30)

          const V31 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: FrancisSt,
            radius: 15,
            map: map
          });
          setMap(V31)

          const V32 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: MorpethTerrace, 
            radius: 10,
            map: map
          });
          setMap(V32)

          const V33 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: StillingtonStreet, 
            radius: 10,
            map: map
          });
          setMap(V33)

          const V34 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: SpenserStreet, 
            radius: 15,
            map: map
          });
          setMap(V34)

          const V35 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: VandonStreet, 
            radius: 10,
            map: map
          });
          setMap(V35)

          const V36 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: BuckinghamGate, 
            radius: 10,
            map: map
          });
          setMap(V36)

          const V37 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: PalaceStreet, 
            radius: 20,
            map: map
          });
          setMap(V37)





        //Theft
          const T1 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: ScotlandYard,
            radius: 30,
            map: map
          });
        setMap(T1)

          const T2 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: KoreanCC,
            radius: 20,
            map: map
          });
        setMap(T2)

          const T3 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: CraigCt,
            radius: 50,
            map: map
          });
        setMap(T3)

          const T4 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: QueenElizabethCentre,
            radius: 40,
            map: map
          });
        setMap(T4)

          const T5 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: MargaretChurch,
            radius: 40,
            map: map
          });
        setMap(T5)

          const T6 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: TescoExpress,
            radius: 60,
            map: map
          });
        setMap(T6)
          const T7 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: GeorgeStreet,
            radius: 30,
            map: map
          });
        setMap(T7)

          const T8 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: OldQueenSt,
            radius: 30,
            map: map
          });
        setMap(T8)

          const T9 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: Broadway,
            radius: 10,
            map: map
          });
        setMap(T9)

          const T10 = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#00FF00',
            fillOpacity: .4,
            center: TheSanctuary,
            radius: 10,
            map: map
          });
        setMap(T10)
        const T11 = new google.maps.Circle({
          strokeColor: '#00FF00',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#00FF00',
          fillOpacity: .4,
          center: PalmerSt,
          radius: 10,
          map: map
        });
      setMap(T11)

        const T12 = new google.maps.Circle({
          strokeColor: '#00FF00',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#00FF00',
          fillOpacity: .4,
          center: B323St,
          radius: 10,
          map: map
        });
      setMap(T12)

        const T13 = new google.maps.Circle({
          strokeColor: '#00FF00',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#00FF00',
          fillOpacity: .4,
          center: StMatthewSt,
          radius: 40,
          map: map
        });
      setMap(T13)

      const T14 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: RochesterRow,
        radius: 10,
        map: map
      });
    setMap(T14)

      const T15 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: GreatSmithSt,
        radius: 10,
        map: map
      });
    setMap(T15)

      const T16 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: GreatPeterSt,
        radius: 15,
        map: map
      });
    setMap(T16)

      const T17 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: TuftonSt,
        radius: 15,
        map: map
      });
    setMap(T17)

      const T18 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: BennettYard,
        radius: 18,
        map: map
      });
    setMap(T18)

      const T19 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: SmithSquare,
        radius: 10,
        map: map
      });
    setMap(T19)

      const T20 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: RomneySt,
        radius: 10,
        map: map
      });
    setMap(T20)

      const T21 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: HorseferryRoad,
        radius: 20,
        map: map
      });
    setMap(T21)

      const T22 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: MedwaySt,
        radius: 25,
        map: map
      });
    setMap(T22)

      const T23 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: ChadwichStreet,
        radius: 25,
        map: map
      });
    setMap(T23)

      const T24 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: PageStreet,
        radius: 40,
        map: map
      });
    setMap(T24)

      const T25 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: MaunselSt,
        radius: 20,
        map: map
      });
    setMap(T25)

      const T26 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: RochesterSt,
        radius: 10,
        map: map
      });
    setMap(T26)

      const T27 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: VincentSt,
        radius: 30,
        map: map
      });
    setMap(T27)

      const T28 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: HatherleySt,
        radius: 10,
        map: map
      });
    setMap(T28)

      const T29 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: DouglasStreet,
        radius: 10,
        map: map
      });
    setMap(T29)

      const T30 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: Millbank,
        radius: 20,
        map: map
      });
    setMap(T30)

      const T31 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: BessboroughGardens,
        radius: 30,
        map: map
      });
    setMap(T31)

      const T32 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: VictoriaSquare,
        radius: 20,
        map: map
      });
    setMap(T32)

      const T33 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: LowerGrosvenorPlace,
        radius: 45,
        map: map
      });
    setMap(T33)

      const T34 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center:KingsScholarsPassage,
        radius: 30,
        map: map
      });
    setMap(T34)

      const T35 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: AshleyPl,
        radius: 20,
        map: map
      });
    setMap(T35)

      const T36 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: AmbrosdenAvenue,
        radius: 10,
        map: map
      });
    setMap(T36)

      const T37 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: thirlebyrd,
        radius: 10,
        map: map
      });
    setMap(T37)

      const T38 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: howichplace,
        radius: 90,
        map: map
      });
    setMap(T38)

      const T39 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: ArtilleryRow,
        radius: 30,
        map: map
      });
    setMap(T39)

    
      const T40 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: SpenserSt,
        radius: 30,
        map: map
      });
    setMap(T40)

      const T41 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: FrancisStreet,
        radius: 20,
        map: map
      });
    setMap(T41)

      const T42 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: VandonSt,
        radius: 20,
        map: map
      });
    setMap(T42)

    
      const T43 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: QueenAnneGate,
        radius: 10,
        map: map
      });
    setMap(T43)


      const T44 = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#00FF00',
        fillOpacity: .4,
        center: PalaceSt,
        radius: 20,
        map: map
      });
    setMap(T44)

    const T45 = new google.maps.Circle({
      strokeColor: '#00FF00',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#00FF00',
      fillOpacity: .4,
      center: Warwichrow,
      radius: 30,
      map: map
    });
  setMap(T45)

    const T46 = new google.maps.Circle({
      strokeColor: '#00FF00',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#00FF00',
      fillOpacity: .4,
      center: StaffordPlace,
      radius: 40,
      map: map
    });
  setMap(T46)







        //Robbery/Burglary/Shoplifting (Orange/Amber)
          const RBS1 = new google.maps.Circle({
            strokeColor: '#FFA500',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FFA500',
            fillOpacity: .4,
            center: HorseGuardsAve,
            radius: 50,
            map: map
          });
        setMap(RBS1)

          const RBS2 = new google.maps.Circle({
            strokeColor: '#FFA500',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FFA500',
            fillOpacity: .4,
            center: MatthewParkerSt,
            radius: 20,
            map: map
          });
        setMap(RBS2)

          const RBS3 = new google.maps.Circle({
            strokeColor: '#FFA500',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FFA500',
            fillOpacity: .4,
            center: CaxtonSt,
            radius: 15,
            map: map
          });
        setMap(RBS3)
        
        const RBS4 = new google.maps.Circle({
          strokeColor: '#FFA500',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#FFA500',
          fillOpacity: .4,
          center: B323,
          radius: 10,
          map: map
        });
      setMap(RBS4)

        const RBS5 = new google.maps.Circle({
          strokeColor: '#FFA500',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#FFA500',
          fillOpacity: .4,
          center: SaintMatthewSt,
          radius: 10,
          map: map
        });
      setMap(RBS5)

      const RBS6 = new google.maps.Circle({
        strokeColor: '#FFA500',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#FFA500',
        fillOpacity: .4,
        center: MonckStreet,
        radius: 15,
        map: map
      });
    setMap(RBS6)

      const RBS7 = new google.maps.Circle({
        strokeColor: '#FFA500',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#FFA500',
        fillOpacity: .4,
        center: HidePlace,
        radius: 15,
        map: map
      });
    setMap(RBS7)
      
      const RBS8 = new google.maps.Circle({
        strokeColor: '#FFA500',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#FFA500',
        fillOpacity: .4,
        center: WillowPlace,
        radius: 10,
        map: map
      });
    setMap(RBS8)

      const RBS9 = new google.maps.Circle({
        strokeColor: '#FFA500',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#FFA500',
        fillOpacity: .4,
        center: DouglasSt,
        radius: 30,
        map: map
      });
    setMap(RBS9)

    const RBS10 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: BeestonPlace,
      radius: 20,
      map: map
    });
  setMap(RBS10)

    const RBS11 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: VictoriaSqr,
      radius: 20,
      map: map
    });
  setMap(RBS11)

    const RBS12 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: AllingtonSt,
      radius: 10,
      map: map
    });
  setMap(RBS12)

    const RBS13 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: VauxhallBridgeRd,
      radius: 25,
      map: map
    });
  setMap(RBS13)

    const RBS14 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: AmbrosdenAve,
      radius: 10,
      map: map
    });
  setMap(RBS14)

    const RBS15 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: HowichPlace,
      radius: 100,
      map: map
    });
  setMap(RBS15)

    const RBS16 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: StillingtonSt,
      radius: 10,
      map: map
    });
  setMap(RBS16)

    const RBS17 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: CardinalWalk,
      radius: 30,
      map: map
    });
  setMap(RBS17)

  const RBS18 = new google.maps.Circle({
    strokeColor: '#FFA500',
    strokeWeight: 2,
    strokeOpacity: 1,
    fillColor: '#FFA500',
    fillOpacity: .4,
    center: WarwichRow,
    radius: 15,
    map: map
  });
setMap(RBS18)




        //Vehicle Crimes
        const VehC1 = new google.maps.Circle({
          strokeColor: '#800080',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#800080',
          fillOpacity: .4,
          center: DacreSreet,
          radius: 10,
          map: map
        });
      setMap(VehC1)

        const VehC2 = new google.maps.Circle({
          strokeColor: '#800080',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#800080',
          fillOpacity: .4,
          center: MonckSt,
          radius: 20,
          map: map
        });
      setMap(VehC2)

      const VehC3 = new google.maps.Circle({
        strokeColor: '#800080',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#800080',
        fillOpacity: .4,
        center: RutherfordSt,
        radius: 20,
        map: map
      });
    setMap(VehC3)

      const VehC4 = new google.maps.Circle({
        strokeColor: '#800080',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#800080',
        fillOpacity: .4,
        center: EsterbrookeSt,
        radius: 20,
        map: map
      });
    setMap(VehC4)

      const VehC5 = new google.maps.Circle({
        strokeColor: '#800080',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#800080',
        fillOpacity: .4,
        center: PonsonbyPlace,
        radius: 20,
        map: map
      });
    setMap(VehC5)

      const VehC6 = new google.maps.Circle({
        strokeColor: '#800080',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#800080',
        fillOpacity: .4,
        center: ThirlebyRd,
        radius: 10,
        map: map
      });
    setMap(VehC6)

      const VehC7 = new google.maps.Circle({
        strokeColor: '#800080',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#800080',
        fillOpacity: .4,
        center: HowichPl,
        radius: 30,
        map: map
      });
    setMap(VehC7)











        }}
        
        >
          {/*Display zones or directions */}

          {directionsResponse && <DirectionsRenderer directions={directionsResponse}/> }
        </GoogleMap>


      </Box>

      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={4}>
          <Autocomplete>
            <Input type='text' placeholder='Origin' ref={originRef}/>
          </Autocomplete>

          <Autocomplete>
            <Input type='text' placeholder='Destination' ref={destionationRef}/>
          </Autocomplete>
          <label for ="travels">Choose a mode of transport:</label>
          <select name='travels' id='travels'>
          <option value="Walking">Walking</option>
          <option value="Bicycling">Bicycling</option>  
          <option value="Public Transport">Public Transport</option>  
          <option value="Driving">Driving</option>  
          </select>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance}</Text>
          <Text>Duration: {duration}</Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              if(map && map.panTo) {
                map.panTo(Userlocation);
              }
              else {console.error ("error")}
            }
              
            }
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App
