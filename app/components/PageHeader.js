import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import colors from '../styles/colors';
import elements from '../styles/elements';

const PageHeader = ({ headerTitle, subHeadingTitle, headerImage}) => {
  return (
    <View style={styles.header_container}>   
          {headerImage && <Image source={headerImage} resizeMode='contain'/>}
          <Text style={elements.contentHeading_text}>
              {headerTitle}
          </Text>
          <Text style={elements.contentSubheading_text}>
              {subHeadingTitle}
          </Text>
    </View>
  )
}

export default PageHeader

const styles = StyleSheet.create({
    header_container: {
        paddingVertical: 30,
        marginBottom: 30,
        marginHorizontal:20,
        borderBottomWidth:1,
        borderColor: colors.grey_light
      },
})