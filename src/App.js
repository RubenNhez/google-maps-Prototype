import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
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



//Robbery/Burglary/Shoplifting (Orange/Amber)
const HorseGuardsAve  ={lat:51.50500, lng: -0.12481}
const MatthewParkerSt = {lat:51.50032, lng:-0.13034}

//Vehicle crime (Purple)
const DacreSreet = {lat: 51.49894, lng: -0.13287}


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
    if (originRef.current.value === '' || destionationRef.current.value === '') {
      return
    }
    /* eslint-disable-next-line no-undef */
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route ({
      
      origin: originRef.current.value,
      destination: destionationRef.current.value,
      /* eslint-disable-next-line no-undef */
      travelMode: google.maps.TravelMode.WALKING

    })

    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

   function clearRoute() {
    setDirectionResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destionationRef.current.value = ''
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
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App
