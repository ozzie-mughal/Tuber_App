import { StyleSheet, Text, Pressable, View, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../styles/colors';
import icons from '../styles/icons';
import MultiPicker from './MultiPicker';
import { simpleTimeOptions, detailedTimesOptions }  from '../assets/content-info/ReferenceData';
import MultipleOptionLineBreaker from './MultipleOptionLineBreaker';
import Collapsible from 'react-native-collapsible';


const DayTimePicker = ({ selectedCurrentData, updateSelections, 
    resetFieldsToggle, setResetFieldsToggle }) => {
    
    const [showDetailedTimes, setShowDetailedTimes] = useState(false);
    const [showSimpleTimes, setShowSimpleTimes] = useState(true);
    const [currentTimes, setCurrentTimes] = useState();

    const [timesAnytime, setTimesAnytime] = useState(true);

    const selectedAnytimeOption = (dayLabel) => {
        //Update selectedCurrentData state, then pass this state to updateSelections() in useEffect
        setTimesAnytime(true);
        setShowDetailedTimes(false);
        setCurrentTimes({
            dayLabel: dayLabel,
            times: {
                anytime: true,
                simple: [],
                detailed: [],
            },
            available: true
        })
    }
    
    const selectedSimpleTimesOption = (value, dayLabel) => {
        //Update selectedCurrentData state, then pass this state to updateSelections() in useEffect
        setTimesAnytime(false);
        setShowDetailedTimes(false);
        setCurrentTimes({
            dayLabel: dayLabel,
            times: {
                anytime: false,
                simple: value,
                detailed: [],
            },
            available: true
        })

    }
    const selectedDetailedTimesOption = (value, dayLabel) => {
        setTimesAnytime(false);
        setCurrentTimes({
            dayLabel: dayLabel,
            times: {
                anytime: false,
                simple: [],
                detailed: value,
            },
            available: true
        })
    }

    //Update availability selections with copy of updated selection
    useEffect(() => {
        updateSelections(currentTimes);
    },[currentTimes])

    useEffect(() => {
        if (!selectedCurrentData?.available){return};

        //Initial values
        if (selectedCurrentData?.times?.anytime === undefined ||
            selectedCurrentData?.times?.simple === undefined ||
            selectedCurrentData?.times?.detailed === undefined)
        {
            return;
        }
        setTimesAnytime(selectedCurrentData.times.anytime);

    },[selectedCurrentData])

  return (
        <View >
            <View>
                {/* Anytime selection */}
                <Pressable 
                    onPress={()=>{
                        selectedAnytimeOption(selectedCurrentData?.dayLabel);
                    }}
                    style={[
                        timesAnytime ? 
                        styles.activeContainer : styles.inactiveContainer,
                    ]}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={timesAnytime ? 
                                    styles.activeTextStyle : styles.inactiveTextStyle
                                }>
                            Anytime
                        </Text>
                        {timesAnytime && 
                            <View>
                                {icons.selected_tick}
                            </View>
                        }
                    </View>
                </Pressable>
            </View>
                <MultipleOptionLineBreaker/>
                {/* Switch type of time selection */}
                <View style={styles.multipleToggle}>
                    <Text style={styles.multipleToggle__title}>General Times</Text>
                    <Switch
                        style={{ transform: [{ scaleX: .75 }, { scaleY: .75 }] }}
                        trackColor={{true:colors.lavender_blue}}
                        ios_backgroundColor={colors.turquoise_green}
                        value={showDetailedTimes}
                        onValueChange={()=>{
                            setShowDetailedTimes(!showDetailedTimes);
                            setShowSimpleTimes(!showSimpleTimes);
                        }}
                        />
                    <Text style={styles.multipleToggle__title}>Specific Times</Text>
                </View>
                {/* Simple time selection */}
                <Collapsible collapsed={!showSimpleTimes} align="center">

                <View>
                    <Text style={{fontStyle:'italic', marginLeft: 5, fontSize: 12, marginVertical: 5}}>
                        Select all that apply
                    </Text>
                    <MultiPicker setSelectedOptions={(value)=>{
                        selectedSimpleTimesOption(value,selectedCurrentData?.dayLabel);
                    }} 
                        data={simpleTimeOptions}
                        resetFieldsToggle={resetFieldsToggle}
                        setResetFieldsToggle={setResetFieldsToggle}
                        itemTextSize={12}
                        selectedBackgroundColor={colors.yellow_sun}/>            
                </View>
                </Collapsible>

                {/* Detailed time selection */}

            <Collapsible collapsed={!showDetailedTimes} align="center">
            <View>
                <Text style={{fontStyle:'italic', marginLeft: 5, fontSize: 12, marginVertical: 5}}>
                    Select all that apply
                </Text>
                <MultiPicker setSelectedOptions={(value)=>{
                    selectedDetailedTimesOption(value,selectedCurrentData?.dayLabel);
                    }} 
                    data={detailedTimesOptions}
                    resetFieldsToggle={resetFieldsToggle}
                    setResetFieldsToggle={setResetFieldsToggle}
                    itemTextSize={12}
                    selectedBackgroundColor={colors.yellow_sun}/>
            </View>
            </Collapsible>

        </View>
  )
}

export default DayTimePicker

const styles = StyleSheet.create({
    valuePickerContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 25,
        padding: 5
    },
    activeContainer: {
        borderRadius: 25,
        backgroundColor: colors.yellow_sun,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        alignSelf: 'flex-start',
        width: 80
    },
    activeTextStyle: {
        fontSize: 12,
        fontWeight: "600",
        color: 'black',
    },
    inactiveContainer: {
        borderRadius: 25,
        backgroundColor: colors.grey_light,
        alignSelf: 'flex-start',
        padding: 5,
        width: 60
    },
    inactiveTextStyle: {
        fontSize: 12,
        color: 'black'
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedCategoryHeadingText: {
        fontWeight: '600',
        fontSize: 21,
        margin: 10,
    },
    selectedCategorySubheadingText: {
        fontWeight: '600',
        fontSize: 18,
        margin: 10
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 0,
        alignItems: 'center',
      },
      multipleToggle__title: {
        fontSize: 14,
        marginHorizontal: 5,
      },
})