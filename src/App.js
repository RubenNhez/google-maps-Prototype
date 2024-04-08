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
const YeomanRow = {lat: 51.497041, lng: -0.166462}

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
//Scams (Yellow)
const WestminsterBridge = {lat: 51.500871, lng: -0.122025}

// Kensington And Chelsea

//Violence (RED)
const OvingtonMews = {lat: 51.497801, lng: -0.165987}
const EgertonGardensMews = {lat: 51.496971, lng: -0.167552}
const HaskerStreet = {lat: 51.494559, lng: -0.164822}
const CadoganGate = {lat: 51.494537, lng: -0.158688}
const RawlingsSt = {lat: 51.493170, lng: -0.163328}
const DraycottAve = {lat: 51.492443, lng: -0.164563}
const MakinsSt = {lat: 51.492144, lng: -0.166630}
const IxworthPlace = {lat:51.491883, lng: -0.168751}
const BuryWalk = {lat: 51.491314, lng: -0.171191}
const DanuseSt = {lat: 51.490201, lng: -0.167067}
const CaleSt = {lat: 51.490142, lng: -0.170399}
const FloodWalk = {lat: 51.486593, lng: -0.166984}
const roalhospitalroad = {lat: 51.484959, lng: -0.162886}
const PetytPlace = {lat: 51.483023, lng: -0.171458}
const DanversSt = {lat: 51.482906, lng: -0.172499}
const CarlyleSquare = {lat: 51.486648, lng: -0.172969}
const ElmParkGardens = {lat: 51.487232, lng: -0.177330}
const kingsrd = {lat: 51.485102, lng: -0.174481}
const PeonyCourt = {lat: 51.486211, lng: -0.179851}
const ChelseaParkGardens = {lat: 51.485217, lng: -0.177765}
const BeaufordStreet = {lat: 51.484544, lng: -0.175621}
const lamontroadpassage = {lat: 51.483899, lng: -0.176918}
const LimerstonStreet = {lat: 51.484386, lng: -0.179350}
const NightingalePl = {lat: 51.484519, lng: -0.180736}
const LangtonSt = {lat: 51.482440, lng: -0.180627}
const RileySt = {lat: 51.481952, lng: -0.176829}
const AnnLane = {lat: 51.482614, lng: -0.177716}
const EdithGroveCarPark = {lat: 51.480378, lng: -0.179936}
const ChelseaTheatre = {lat: 51.48165,lng: -0.17977}
//Theft (Lime)
const EgertonTerrace = {lat: 51.497004, lng:-0.168021}
const FirstSt = {lat: 51.495003, lng: -0.165864}
const CrescentPl = {lat: 51.494492, lng: -0.168298}
const ClabonMews = {lat: 51.495061, lng: -0.161870}
const PavilionRd = {lat: 51.494333, lng: -0.159004}
const CadoganStreet = {lat: 51.493372, lng: -0.161631}
const DraycottTerrace = {lat: 51.492616, lng: -0.160657}
const culfordgardens = {lat: 51.491954, lng: -0.160568}
const SymonsSt = {lat: 51.492464, lng: -0.159449}
const A3216 = {lat: 51.492721, lng: -0.156835}
const SaatchiGallery = {lat: 51.491039, lng: -0.158560}
const parkingarea = {lat: 51.490514, lng: -0.161048}
const MarkhamSquare = {lat: 51.490054, lng: -0.164922}
const CaleStreet = {lat: 51.490092, lng: -0.170533}
const wellingtonsquare = {lat: 51.489579, lng: -0.163216}
const ManresaRd = {lat: 51.487463, lng: -0.171406}
const KingsRd = {lat: 51.487370, lng: -0.168958}
const OakleyGardens = {lat: 51.485388, lng: -0.167115}
const StLooAve = {lat: 51.485087, lng: -0.164984}
const eastroad = {lat: 51.488180, lng: -0.156784}
const ElmParkRd = {lat: 51.486212, lng: -0.177255}
const MulberryWalk = {lat: 51.486004, lng: -0.175742}
const ParkWalk = {lat: 51.486045, lng: -0.180261}
const beaufortst = {lat: 51.484708, lng: -0.175972}
const MoravianPl = {lat: 51.482578, lng: -0.175882}
const annlane = {lat: 51.482541, lng: -0.177908}
const EdithYard = {lat: 51.481527, lng: -0.180572}
//Robbery/Burglary/Shoplifting (Orange/Amber)
const BeauchampPlace = {lat: 51.497393, lng: -0.164317}
const WaltonStreet = {lat: 51.495586, lng: -0.165685}
const MilnerSt = {lat: 51.494328, lng: -0.163893}
const PavilionSt = {lat: 51.496797, lng: -0.159499}
const CadoganSt = {lat: 51.493447, lng: -0.161218}
const SloaneAvenue = {lat: 51.491994, lng: -0.164937}
const burywalk = {lat: 51.491378, lng: -0.171252}
const LincolnSt = {lat:51.491321, lng: -0.161242}
const CulfordGardens = {lat: 51.491843, lng: -0.160803}
const SymonsStreet = {lat: 51.492524, lng: -0.159197}
const ParkingArea = {lat: 51.490471, lng: -0.161031}
const CoulsonSt = {lat: 51.490956, lng: -0.162167}
const BywaterSt = {lat: 51.490092, lng: -0.163832}
const DanuseStreet = {lat: 51.490140, lng: -0.167058}
const SParade = {lat: 51.489183, lng: -0.174755}
const DovehouseSt = {lat: 51.488955, lng: -0.171503}
const TheTrafalgar = {lat: 51.48857, lng:-0.16701}
const MarksAndSpencer = {lat: 51.48895,lng: -0.16470}
const WoodfallSt = {lat: 51.488513, lng: -0.162567}
const StLeonardsTerrace = {lat: 51.488754, lng: -0.160931}
const ChelseaManorGardens = {lat: 51.486613, lng: -0.168426}
const CheyneWalk = {lat: 51.483683, lng: -0.166591}
const EastRoad = {lat: 51.488214, lng: -0.156857}
const PaultonsSquare = {lat: 51.484193, lng: -0.173104}
const MallordSt = {lat: 51.485938, lng: -0.174194}
const KingsRoad = {lat: 51.485058, lng: -0.174578}
const FullhamRd = {lat: 51.486342, lng: -0.180217}
const WintertonPlace = {lat: 51.485352, lng: -0.180164}
const SlaidburnSt = {lat: 51.482390, lng: -0.181394}
const BlantyreStreet = {lat: 51.481524, lng: -0.178327}
//Vehicle crime (Purple)
const BeauchampPl = {lat: 51.496964, lng: -0.163356}
const EgertonGardens = {lat: 51.496778, lng: -0.167996}
const EgertonGardens_two = {lat: 51.495638, lng: -0.168404}
const OvingstonStreet = {lat: 51.495813, lng: -0.165249}
const CrescentPlace = {lat: 51.494493, lng: -0.168153}
const HalseySt = {lat: 51.494375, lng: -0.163276}
const MilnerStreet = {lat: 51.494884, lng: -0.161753}
const ShafloMews = {lat: 51.496332, lng: -0.161021}
const CadoganGardens = {lat: 51.492660, lng: -0.160315}
const DraycottAvenue = {lat: 51.492478, lng: -0.164651}
const SloaneAve = {lat: 51.491833, lng: -0.164570}
const SprimontPl = {lat: 51.490914, lng: -0.164573}
const JubileePl = {lat: 51.489498, lng: -0.166167}
const WellingtonSquare = {lat: 51.489547, lng: -0.163095}
const DovehouseStreet = {lat: 51.488786, lng: -0.171348}
const stleonardsterrace = {lat: 51.488812, lng: -0.160852}
const ManresaRoad = {lat: 51.487419, lng: -0.171367}
const CheyneGardens = {lat: 51.484388, lng: -0.165688}
const RoyalHospitalRoad = {lat: 51.484895, lng: -0.162965}
const ParadiseWalk = {lat: 51.485147, lng: -0.160781}
const FranklinsRow = {lat: 51.489218, lng: -0.158497}
const SloaneCourtWest = {lat: 51.489998, lng: -0.157125}
const LordshipPl = {lat: 51.483620, lng: -0.169996}
const OldChurchStreet = {lat: 51.486598, lng: -0.173539}
const elmparkgarndens = {lat: 51.487124, lng: -0.177274}
const kingsroad = {lat: 51.485030, lng: -0.174527}
const parkwalk = {lat: 51.484913, lng: -0.178669}
const BeaufortSt = {lat: 51.484555, lng: -0.175819}
const LamontRoadPassage = {lat: 51.483840, lng: -0.177209}
const limerstonstreet = {lat: 51.484193, lng: -0.179150}
const GertrudeStreet = {lat: 51.483486, lng: -0.180667}
const LamontRoad = {lat: 51.482759, lng: -0.179820}
const LangtonStreet = {lat: 51.482484, lng: -0.180696}
//Scams (Yellow)


function App() {
const {isLoaded} = useJsApiLoader({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ['places', 'geometry'],
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
  
    //check if route enters with horseGuardes ave circle test
    const routeCoordinates = results.routes[0].overview_path;
    const circleCenter = new google.maps.LatLng(HorseGuardsAve.lat,HorseGuardsAve.lng);
    const circleRadius = 50;

    for(const coordinate of routeCoordinates) {
      const distanceToCenter = google.maps.geometry.spherical.computeDistanceBetween(coordinate,circleCenter);
      if (distanceToCenter <= circleRadius) {
        alert('Route entered HorseGuardsAve circle radius!');
        break;
      }
    }

    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    }
  // Select travel mode
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

          const V38 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: OvingtonMews, 
            radius: 10,
            map: map
          });
          setMap(V38)

          const V39 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: EgertonGardensMews, 
            radius: 10,
            map: map
          });
          setMap(V39)

          const V40 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: HaskerStreet, 
            radius: 10,
            map: map
          });
          setMap(V40)

          const V41 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: CadoganGate, 
            radius: 10,
            map: map
          });
          setMap(V41)

          const V42 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: RawlingsSt, 
            radius: 20,
            map: map
          });
          setMap(V42)

          const V43 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: DraycottAve, 
            radius: 15,
            map: map
          });
          setMap(V43)

          const V44 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: MakinsSt, 
            radius: 15,
            map: map
          });
          setMap(V44)

          const V45 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: IxworthPlace, 
            radius: 10,
            map: map
          });
          setMap(V45)

          const V46 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: BuryWalk, 
            radius: 20,
            map: map
          });
          setMap(V46)

          const V47 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: DanuseSt, 
            radius: 10,
            map: map
          });
          setMap(V47)

          const V48 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: CaleSt, 
            radius: 10,
            map: map
          });
          setMap(V48)

          const V49 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: TheTrafalgar, 
            radius: 15,
            map: map
          });
          setMap(V49)

          const V50 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: KingsRd, 
            radius: 15,
            map: map
          });
          setMap(V50)

          const V51 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: FloodWalk, 
            radius: 25,
            map: map
          });
          setMap(V51)

          const V52 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: roalhospitalroad, 
            radius: 10,
            map: map
          });
          setMap(V52)

          const V53 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: PetytPlace, 
            radius: 10,
            map: map
          });
          setMap(V53)

          const V54 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: DanversSt, 
            radius: 10,
            map: map
          });
          setMap(V54)

          const V55 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: CarlyleSquare, 
            radius: 10,
            map: map
          });
          setMap(V55)

          const V56 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: ElmParkGardens, 
            radius: 10,
            map: map
          });
          setMap(V56)

          const V57 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: kingsrd, 
            radius: 10,
            map: map
          });
          setMap(V57)

          const V58 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: PeonyCourt, 
            radius: 15,
            map: map
          });
          setMap(V58)

          const V59 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: ChelseaParkGardens, 
            radius: 10,
            map: map
          });
          setMap(V59)

          const V60 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: BeaufordStreet,
            radius: 10,
            map: map
          });
          setMap(V60)

          const V61 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center:lamontroadpassage,
            radius: 10,
            map: map
          });
          setMap(V61)

          const V62 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center:LimerstonStreet,
            radius: 10,
            map: map
          });
          setMap(V62)

          const V63 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: NightingalePl,
            radius: 10,
            map: map
          });
          setMap(V63)

          const V64 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: LangtonSt,
            radius: 10,
            map: map
          });
          setMap(V64)

          const V65 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: RileySt,
            radius: 10,
            map: map
          });
          setMap(V65)

          const V66 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: AnnLane,
            radius: 15,
            map: map
          });
          setMap(V66)

          const V67 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: EdithGroveCarPark,
            radius: 10,
            map: map
          });
          setMap(V67)

          const V68 = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: '#FF0000',
            fillOpacity: .4,
            center: EdithGroveCarPark,
            radius: 20,
            map: map
          });
          setMap(V68)

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

    const T47 = new google.maps.Circle({
      strokeColor: '#00FF00',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#00FF00',
      fillOpacity: .4,
      center: YeomanRow,
      radius: 10,
      map: map
    });
  setMap(T47)

    const T48 = new google.maps.Circle({
      strokeColor: '#00FF00',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#00FF00',
      fillOpacity: .4,
      center: EgertonTerrace,
      radius: 10,
      map: map
    });
  setMap(T48)

  const T49 = new google.maps.Circle({
    strokeColor: '#00FF00',
    strokeWeight: 2,
    strokeOpacity: 1,
    fillColor: '#00FF00',
    fillOpacity: .4,
    center: FirstSt,
    radius: 15,
    map: map
  });
setMap(T49)

const T50 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: CrescentPl,
  radius: 20,
  map: map
});
setMap(T50)

const T51 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: ClabonMews,
  radius: 10,
  map: map
});
setMap(T51)

const T52 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: PavilionRd,
  radius: 10,
  map: map
});
setMap(T52)

const T53 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: CadoganStreet,
  radius: 10,
  map: map
});
setMap(T53)

const T54 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: DraycottTerrace,
  radius: 10,
  map: map
});
setMap(T54)

const T55 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: culfordgardens,
  radius: 15,
  map: map
});
setMap(T55)

const T56 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: SymonsSt,
  radius: 25,
  map: map
});
setMap(T56)


const T57 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: A3216,
  radius: 15,
  map: map
});
setMap(T57)

const T58 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: SaatchiGallery,
  radius: 40,
  map: map
});
setMap(T58)

const T59 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: parkingarea,
  radius: 20,
  map: map
});
setMap(T59)

const T60 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: MarkhamSquare,
  radius: 10,
  map: map
});
setMap(T60)

const T61 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: CaleStreet,
  radius: 15,
  map: map
});
setMap(T61)

const T62 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: wellingtonsquare,
  radius: 10,
  map: map
});
setMap(T62)

const T63 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: TheTrafalgar,
  radius: 25,
  map: map
});
setMap(T63)

const T64 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: ManresaRd,
  radius: 10,
  map: map
});
setMap(T64)

const T65 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: KingsRd,
  radius: 25,
  map: map
});
setMap(T65)

const T66 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: FloodWalk,
  radius: 10,
  map: map
});
setMap(T66)

const T67 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: OakleyGardens,
  radius: 10,
  map: map
});
setMap(T67)

const T68 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: StLooAve,
  radius: 10,
  map: map
});
setMap(T68)

const T69 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: eastroad,
  radius: 10,
  map: map
});
setMap(T69)

const T70 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: ElmParkRd,
  radius: 10,
  map: map
});
setMap(T70)

const T71 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: MulberryWalk,
  radius: 10,
  map: map
});
setMap(T71)

const T72 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: ParkWalk,
  radius: 10,
  map: map
});
setMap(T72)

const T73 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: beaufortst,
  radius: 10,
  map: map
});
setMap(T73)

const T74 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: MoravianPl,
  radius: 10,
  map: map
});
setMap(T74)

const T75 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: annlane,
  radius: 10,
  map: map
});
setMap(T75)

const T76 = new google.maps.Circle({
  strokeColor: '#00FF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#00FF00',
  fillOpacity: .4,
  center: EdithYard,
  radius: 10,
  map: map
});
setMap(T76)

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


    const RBS19 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: BeauchampPlace,
      radius: 10,
      map: map
    });
  setMap(RBS19)

    const RBS20 = new google.maps.Circle({
      strokeColor: '#FFA500',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#FFA500',
      fillOpacity: .4,
      center: WaltonStreet,
      radius: 15,
      map: map
    });
  setMap(RBS20)

  const RBS21 = new google.maps.Circle({
    strokeColor: '#FFA500',
    strokeWeight: 2,
    strokeOpacity: 1,
    fillColor: '#FFA500',
    fillOpacity: .4,
    center: MilnerSt,
    radius: 10,
    map: map
  });
setMap(RBS21)

const RBS22 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: PavilionSt,
  radius: 10,
  map: map
});
setMap(RBS22)


const RBS23 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: CadoganSt,
  radius: 10,
  map: map
});
setMap(RBS23)

const RBS24 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: SloaneAvenue,
  radius: 10,
  map: map
});
setMap(RBS24)

const RBS25 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: burywalk,
  radius: 10,
  map: map
});
setMap(RBS25)

const RBS26 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: LincolnSt,
  radius: 10,
  map: map
});
setMap(RBS26)

const RBS27 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: CulfordGardens,
  radius: 15,
  map: map
});
setMap(RBS27)

const RBS28 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: SymonsStreet,
  radius: 20,
  map: map
});
setMap(RBS28)

const RBS29 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: ParkingArea,
  radius: 30,
  map: map
});
setMap(RBS29)

const RBS30 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: CoulsonSt,
  radius: 10,
  map: map
});
setMap(RBS30)

const RBS31 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: SprimontPl,
  radius: 10,
  map: map
});
setMap(RBS31)

const RBS32 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: BywaterSt,
  radius: 10,
  map: map
});
setMap(RBS32)

const RBS33 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: DanuseStreet,
  radius: 10,
  map: map
});
setMap(RBS33)

const RBS34 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: SParade,
  radius: 10,
  map: map
});
setMap(RBS34)

const RBS35 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: DovehouseSt,
  radius: 10,
  map: map
});
setMap(RBS35)

const RBS36 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: TheTrafalgar,
  radius: 30,
  map: map
});
setMap(RBS36)

const RBS37 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: MarksAndSpencer,
  radius: 20,
  map: map
});
setMap(RBS37)

const RBS38 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: WoodfallSt,
  radius: 10,
  map: map
});
setMap(RBS38)

const RBS39 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: StLeonardsTerrace,
  radius: 10,
  map: map
});
setMap(RBS39)

const RBS40 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: KingsRd,
  radius: 10,
  map: map
});
setMap(RBS40)

const RBS41 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: ChelseaManorGardens,
  radius: 10,
  map: map
});
setMap(RBS41)

const RBS42 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: CheyneWalk,
  radius: 10,
  map: map
});
setMap(RBS42)

const RBS43 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: EastRoad,
  radius: 10,
  map: map
});
setMap(RBS43)

const RBS44 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: PaultonsSquare,
  radius: 10,
  map: map
});
setMap(RBS44)

const RBS45 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: MallordSt,
  radius: 10,
  map: map
});
setMap(RBS45)

const RBS46 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: KingsRoad,
  radius: 15,
  map: map
});
setMap(RBS46)

const RBS47 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: FullhamRd,
  radius: 10,
  map: map
});
setMap(RBS47)

const RBS48 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: WintertonPlace,
  radius: 10,
  map: map
});
setMap(RBS48)

const RBS49 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: SlaidburnSt,
  radius: 10,
  map: map
});
setMap(RBS49)

const RBS50 = new google.maps.Circle({
  strokeColor: '#FFA500',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFA500',
  fillOpacity: .4,
  center: BlantyreStreet,
  radius: 10,
  map: map
});
setMap(RBS50)

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

      const VehC8 = new google.maps.Circle({
        strokeColor: '#800080',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#800080',
        fillOpacity: .4,
        center: BeauchampPl,
        radius: 10,
        map: map
      });
    setMap(VehC8)

      const VehC9 = new google.maps.Circle({
        strokeColor: '#800080',
        strokeWeight: 2,
        strokeOpacity: 1,
        fillColor: '#800080',
        fillOpacity: .4,
        center: EgertonGardens,
        radius: 10,
        map: map
      });
    setMap(VehC9)

    const VehC10 = new google.maps.Circle({
      strokeColor: '#800080',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#800080',
      fillOpacity: .4,
      center: EgertonGardens_two,
      radius: 10,
      map: map
    });
  setMap(VehC10)

  const VehC11 = new google.maps.Circle({
    strokeColor: '#800080',
    strokeWeight: 2,
    strokeOpacity: 1,
    fillColor: '#800080',
    fillOpacity: .4,
    center: OvingstonStreet,
    radius: 15,
    map: map
  });
setMap(VehC11)

const VehC12 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: CrescentPlace,
  radius: 10,
  map: map
});
setMap(VehC12)

const VehC13 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: HalseySt,
  radius: 10,
  map: map
});
setMap(VehC13)

const VehC14 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: MilnerStreet,
  radius: 20,
  map: map
});
setMap(VehC14)

const VehC15 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: ShafloMews,
  radius: 10,
  map: map
});
setMap(VehC15)

const VehC16 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: CadoganGardens,
  radius: 10,
  map: map
});
setMap(VehC16)

const VehC17 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: DraycottAvenue,
  radius: 10,
  map: map
});
setMap(VehC17)

const VehC18 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: SloaneAve,
  radius: 15,
  map: map
});
setMap(VehC18)

const VehC19 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: JubileePl,
  radius: 10,
  map: map
});
setMap(VehC19)

const VehC20 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: WellingtonSquare,
  radius: 10,
  map: map
});
setMap(VehC20)

const VehC21 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: DovehouseStreet,
  radius: 10,
  map: map
});
setMap(VehC21)

const VehC22 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: stleonardsterrace,
  radius: 10,
  map: map
});
setMap(VehC22)

const VehC23 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: ManresaRoad,
  radius: 10,
  map: map
});
setMap(VehC23)

const VehC24 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: CheyneGardens,
  radius: 10,
  map: map
});
setMap(VehC24)

const VehC25 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: RoyalHospitalRoad,
  radius: 10,
  map: map
});
setMap(VehC25)

const VehC26 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: ParadiseWalk,
  radius: 10,
  map: map
});
setMap(VehC26)

const VehC27 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: FranklinsRow,
  radius: 10,
  map: map
});
setMap(VehC27)

const VehC28 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: SloaneCourtWest,
  radius: 10,
  map: map
});
setMap(VehC28)

const VehC29 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: LordshipPl,
  radius: 10,
  map: map
});
setMap(VehC29)

const VehC30 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: OldChurchStreet,
  radius: 10,
  map: map
});
setMap(VehC30)

const VehC31 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: elmparkgarndens,
  radius: 10,
  map: map
});
setMap(VehC31)

const VehC32 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: kingsroad,
  radius: 10,
  map: map
});
setMap(VehC32)

const VehC33 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: parkwalk,
  radius: 10,
  map: map
});
setMap(VehC33)

const VehC34 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: BeaufortSt,
  radius: 15,
  map: map
});
setMap(VehC34)

const VehC35 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: LamontRoadPassage,
  radius: 10,
  map: map
});
setMap(VehC35)

const VehC36 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: limerstonstreet,
  radius: 10,
  map: map
});
setMap(VehC36)

const VehC37 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: GertrudeStreet,
  radius: 10,
  map: map
});
setMap(VehC37)

const VehC38 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: LamontRoad,
  radius: 10,
  map: map
});
setMap(VehC38)

const VehC39 = new google.maps.Circle({
  strokeColor: '#800080',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#800080',
  fillOpacity: .4,
  center: LangtonStreet,
  radius: 15,
  map: map
});
setMap(VehC39)

// Scams (Yellow)
const S1 = new google.maps.Circle({
  strokeColor: '#FFFF00',
  strokeWeight: 2,
  strokeOpacity: 1,
  fillColor: '#FFFF00',
  fillOpacity: .4,
  center: WestminsterBridge,
  radius: 100,
  map: map
});
setMap(S1)








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
