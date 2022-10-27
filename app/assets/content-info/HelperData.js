import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const helperData = [
    {category: 'NewAsk', name: 'HowToAsk', 
        value: `The way in which you ask a question is critical to get the most out of your learning and your buck.
Understand how you best communicate something to decide which of the below works for you.
The Ask fee charged varies with each type, as it determines the level of real-time engagement required by the tutor.
\n\
Text - This is a chat room where you can send and receive text messages, audio messages
and images between yourself and a tutor. 
Even after the Ask is finished, you can always view the chat room history whenever you want.
\n\
Book 1:1 Class - For a deeper learning about something, this will connect you to one of our
accredited agency partners on their Learning Management System. You can make use of tools such as 
virtual whiteboards, live video and real-time document editing.
\n\
Join Group - If there is already a group chatroom created, you can join to send and recieve
text messages, audio messages, and images between yourself, the tutor, and your friends. Coming soon!
\n\
Video - Best for discussing more complex concepts and questions that are hard to put into a text.
However, the usual text and audio messages are at your disposal to go along with this. Coming soon!`},
    {category: 'NewAsk', name: 'WhoToAsk', 
        value: `All tutors onboarded onto Nemo are rigorously assessed on their expertise on their chosen subjects, as well as general background checks.
If you already have a tutor in mind to ask, you can select them! Find them in your list of favourited tutors, the top-rated tutors leaderboard, or search all.
\n\
If you are not sure who to ask, we use AI to help us predict who the best tutor is to match with you.
We look at things like how you best communicate your Asks, what times of the day you both are most available, and the level of expertise needed.`},
    {category: 'NewAsk', name: 'WhatToAsk', 
        value: `This helps give the tutor an idea of what the Ask is about before they accept.
The more you can describe what the problem is, the better the tutor is prepared to solve it.`},
    {category: 'NewAsk', name: 'Summary', 
        value: `Based on the tutor (if selected) and topic of Ask, we estimate the usual time taken to solve the answer based on similar Asks by others.
This helps give a better idea of what the Ask fee may look like.
\n\
The Ask fee also factors in the following things:
-Level of tutor expertise needed
-Time of the day (peak or off-peak periods)
-How the Ask will be communicated`},

  ];

const howtoaskTest = helperData.filter((item)=>{return item.category=='NewAsk'});

const HowToAsk = () => {
  return (
    <View>
      <Text style={{textAlign:'left'}}>
          {helperData.filter((item)=>{
              return item.category==='NewAsk' && item.name==='HowToAsk'})[0].value}
        </Text>
    </View>
  )
}
const WhoToAsk = () => {
  return (
    <View>
      <Text style={{textAlign:'left'}}>
          {helperData.filter((item)=>{
              return item.category==='NewAsk' && item.name==='WhoToAsk'})[0].value}
        </Text>
    </View>
  )
}
const WhatToAsk = () => {
  return (
    <View>
      <Text style={{textAlign:'left'}}>
          {helperData.filter((item)=>{
              return item.category==='NewAsk' && item.name==='WhatToAsk'})[0].value}
        </Text>
    </View>
  )
}
const Summary = () => {
  return (
    <View>
      <Text style={{textAlign:'left'}}>
          {helperData.filter((item)=>{
              return item.category==='NewAsk' && item.name==='Summary'})[0].value}
        </Text>
    </View>
  )
}

export { HowToAsk, WhoToAsk, WhatToAsk, Summary }

const styles = StyleSheet.create({})