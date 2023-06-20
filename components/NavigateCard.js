import React from 'react'
import tw from 'twrnc'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setDestination } from '../slice/NavSlice';
import NavFavourite from './NavFavourite';
import { Icon } from '@rneui/base';

const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Hello, Rodrigo</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete 
                placeholder='Where to?'
                styles={toInputBoxStyles}
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                onPress={(data, details = null)=>{
                    dispatch(
                        setDestination({
                            location: details.geometry.location,
                            description: data.description
                        })
                    )
                    navigation.navigate('RideOptionsCard')
                }}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
        </View>
        <NavFavourite />
      </View>

      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>

        <TouchableOpacity 
            style={tw`flex flex-row justify-between items-center bg-black  w-26 px-4 py-3 rounded-full`}
            onPress={() => navigation.navigate("RideOptionsCard")}
        >
            <Icon name='car' type='font-awesome' color='white' fontSize={16} />
            <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`flex flex-row justify-between items-center w-26 px-4 py-3 rounded-full`}>
            <Icon name='fast-food-outline' type='ionicon' color='black' fontSize={16} />
            <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})