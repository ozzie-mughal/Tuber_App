import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AskNowHelp = () => {
  return (
    <View>
        <Text style={styles.paragraphText}>
            How you ask a question gets you the most out of your learning and your buck.
            Understand how you best communicate something to decide what works for you. {'\n'}{'\n'}
            The Ask fee charged varies on this, as it determines the level of real-time engagement required by the tutor.
            
        </Text>

        <Text style={styles.headingText}>
            How to Ask 
        </Text>
        <Text style={styles.subHeadingText}>
            Text
        </Text>
        <Text style={styles.paragraphText}>
            This is a chat room where you can send and receive text messages, audio messages
            and images between yourself and a tutor. 
            {'\n'}
            Even after the Ask is finished, you can always view the chat room history whenever you want.
        </Text>
        <Text style={styles.subHeadingText}>
            Book 1:1 Class
        </Text>
        <Text style={styles.paragraphText}>
            For a deeper learning about something, this will connect you to one of our
            accredited agency partners on their Learning Management System. You can make use of tools such as 
            virtual whiteboards, live video and real-time document editing.
        </Text>
        <Text style={styles.subHeadingText}>
            Video
        </Text>
        <Text style={styles.paragraphText}>
            Best for discussing more complex concepts and questions that are hard to put into a text.
            However, the usual text and audio messages are at your disposal to go along with this. Coming soon!
        </Text>

        <Text style={styles.headingText}>
            What to Ask 
        </Text>
        <Text style={styles.paragraphText}>
            This helps give the tutor an idea of what the Ask is about before they accept.
            {'\n'}
            The more you can describe what the problem is, the better the tutor is prepared to solve it.
        </Text>

        <Text style={styles.headingText}>
            Who to Ask 
        </Text>
        <Text style={styles.paragraphText}>
            All tutors onboarded onto Nimble are rigorously assessed on their expertise on their chosen subjects, as well as general background checks.
            {'\n'}{'\n'}
            If you already have a tutor in mind to ask, you can select them! Find them in your list of favourited tutors, the top-rated tutors leaderboard, or search all.
            {'\n'}{'\n'}
            If you are not sure who to ask, we use AI to help predict who the best tutor is to match with you.
            {'\n'}
            We look at things like how you best communicate your Asks, times of the day you both are most available, and level of expertise needed.
            {'\n'}{'\n'}
            Based on the tutor and topic, we estimate the usual time taken to solve based on other similar Asks.
            {'\n'}
            This helps give a better idea of what the Ask fee may look like.
   
        </Text>
    </View>
  )
}

export default AskNowHelp

const styles = StyleSheet.create({
    headingText: {
        fontFamily:'Nunito-Bold',
        fontSize:34,
        paddingVertical: 10
    },
    subHeadingText: {
        fontFamily:'Nunito-SemiBold',
        fontSize:24,
        paddingVertical: 5
    },
    paragraphText: {
        fontFamily:'Nunito-Medium',
        fontSize:17
    }
})
