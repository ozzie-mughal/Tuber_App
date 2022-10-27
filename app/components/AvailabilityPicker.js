import { StyleSheet, Switch, Text, Pressable, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../styles/colors';
import DayTimePicker from './DayTimePicker';
import Collapsible from 'react-native-collapsible';
import SecondaryButtonInline from './SecondaryButtonInline';
    
    const AvailabilityPicker = ({ setSelectedOptions }) => {

        const AVAILABILITIES = [
            {dayLabel: 'Monday'},
            {dayLabel: 'Tuesday'},
            {dayLabel: 'Wednesday'},
            {dayLabel: 'Thursday'},
            {dayLabel: 'Friday'},
            {dayLabel: 'Saturday'},
            {dayLabel: 'Sunday'},
        ].map((day) => {
            return (
                {...day, 
                    times: {
                        anytime: true,
                        simple: [],
                        detailed: [],
                    },
                    available: false}
            )
        })

    const [isAllAvailable, setIsAllAvailable] = useState(false);
    const [availabilities, setAvailabilities] = useState(AVAILABILITIES);
    const [resetFieldsToggle, setResetFieldsToggle] = useState(false);

    //Update availableDays value state in sign-up screen
    useEffect(() => {
        setSelectedOptions(availabilities);
    },[availabilities])
  
    const toggleAvailable = (availability, dayIndex) => {

        const toggleIsAvailable = availabilities.map((availability,i) => {
            
            if (i === dayIndex) {
                    let prevAvailable = availability.available;
                    //Update available toggle
                    if (prevAvailable === true) {
                        //Also reset fields as day is no longer available
                        console.log('resetted fields for ',availability.dayLabel)
                        return {...availability, 
                            available: !prevAvailable,
                            times: {
                                anytime: false,
                                simple: [],
                                detailed: [],} 
                        };
                    }
                    else {
                        return {...availability, available: !prevAvailable};
                    }
                }
                else {
                    return {...availability};
                }
        });

        setAvailabilities([...toggleIsAvailable]);
    };

    const updateAvailabilities = (updatedAvailability, dayIndex) => {
        const updatedAvailabilities = availabilities.map((availability, i)=> {
            return (
                i === dayIndex ? updatedAvailability : availability
            )
        });
        setAvailabilities([...updatedAvailabilities])
        
    };

    const setAvailableAllDays = () => {
        const updatedIsAllAvailable = !isAllAvailable;
        setIsAllAvailable(!isAllAvailable);

        //Updated to Available All Days or not, depending on updatedIsAllAvailable
        const toggleIsAllAvailable = availabilities.map((availability,i) => {   
            //Update available toggle to true
            return {...availability, available: updatedIsAllAvailable ? true : false};
        }
        );
        setAvailabilities([...toggleIsAllAvailable]);

    }

    const setResetAllDays = () => {
        setResetFieldsToggle(true);

        const toggleResetAllDays = availabilities.map((availability,i) => {   
            //Update available toggle to false
            return {...availability, available: false};
        }
        );
        setAvailabilities([...toggleResetAllDays]);
    }

      return (
        <View style={styles.container}>
            {/* <SecondaryButtonInline title='see latest availabilities' onPress={()=>console.log(availabilities)}/> */}
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={styles.multipleToggle}>
                    <Switch
                        style={{ transform: [{ scaleX: .75 }, { scaleY: .75 }] }}
                        value={isAllAvailable}
                        onValueChange={setAvailableAllDays}
                    />
                    <Text style={styles.multipleToggle__title}>Available all days</Text>
                </View>
                <SecondaryButtonInline title='Reset' onPress={setResetAllDays}/>
            </View>
            {availabilities.map((availability,i) => {
                return (
                <View>
                    <Pressable>
                        <View
                            style={[styles.header, availability?.available ? styles.active : styles.inactive,
                                {flexDirection:'row',justifyContent:'space-between'}]}
                            >
                            <Text style={styles.headerText}>{availability?.dayLabel}</Text>

                            <View style={styles.multipleToggle}>
                                <Switch
                                    style={{ transform: [{ scaleX: .75 }, { scaleY: .75 }] }}
                                    value={availability?.available}
                                    onValueChange={() => toggleAvailable(availability,i)}
                                />
                                <Text style={styles.multipleToggle__title}>Available</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Collapsible collapsed={!availability?.available} align="center">
                        
                    <View style={styles.content}>
                        <DayTimePicker selectedCurrentData={availability}
                            resetFieldsToggle={resetFieldsToggle}
                            setResetFieldsToggle={setResetFieldsToggle}
                            updateSelections={(updatedValue)=>{
                                updateAvailabilities(updatedValue,i)}}/>
                    </View>
                    </Collapsible>
                </View>
                )
            })
            }
        </View>
      );
    }

    export default AvailabilityPicker
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: colors.grey_lightest,
      padding: 10,
    },
    headerText: {
      textAlign: 'left',
      fontSize: 15,
      fontFamily: 'Nunito-Bold',
    },
    content: {
      padding: 10,
      backgroundColor: '#fff',
    },
    active: {
      backgroundColor: colors.turquoise_blue,
    },
    inactive: {
      backgroundColor: colors.grey_lightest,
      borderBottomWidth: 1,
      borderColor: colors.grey_light
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 0,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 15,
      marginHorizontal: 5,
      fontFamily: 'Nunito-Medium',
    },
  });