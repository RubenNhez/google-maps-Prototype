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

//Theft (Lime)
const ScotlandYard = {lat: 51.50612 , lng:-0.12565 }
const KoreanCC = {lat: 51.50697,lng: -0.12499}
const CraigCt = {lat: 51.50671, lng: -0.12704}
//Robbery/Burglary/Shoplifting (Orange/Amber)
const HorseGuardsAve  ={lat:51.50500, lng: -0.12481}

//Vehicle crime (Purple)


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
