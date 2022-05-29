import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const AskHowText = () => {

  const words = ['Text','Audio'];

    const [text, setText] = useState("");
    const [wordIndex,setWordIndex] = useState(0);
    const [fullText, setFullText] = useState(
    "Text"
    )
    const [index, setIndex] = useState(0);
    const [deleteindex, setDeleteIndex] = useState();
    const [caretBlink, setcaretBlink] = useState(false);

    const deleteWord = async () => {
      if (deleteindex <= fullText.length) {
        setTimeout(() => {
          setText(fullText[0,-deleteindex])
          setDeleteIndex(deleteindex + 1)
        }, 800)
      }
    }

    useEffect(() => {

        if (deleteindex <= fullText.length) {
          setTimeout(() => {
            var currentFullText = fullText.slice(0,fullText.length-deleteindex);
            setText(currentFullText);
            setDeleteIndex(deleteindex + 1);
          }, 800)
        }
        else {
          setWordIndex(wordIndex + 1);
        }
      }, [deleteindex])

    useEffect(() => {

        if (index <= fullText.length) {
          setTimeout(() => {
            setText(text + fullText[index])
            setIndex(index + 1)
          }, 800)
        }
        else {
          setDeleteIndex(0);
        }
      }, [index])
      
    //Reset loop through words if index surpasses # of words, else start at beginning of next word
    useEffect(() => {
      if (wordIndex > words.length-1) {
        setWordIndex(0);
        setFullText(words[0]);
      }
      else {
        setFullText(words[wordIndex]);
      }
      setText('');
      setIndex(0);
      }, [wordIndex])

    useEffect(() => {
        setTimeout(() => {
            setcaretBlink(!caretBlink)
        }, 500)
    },[caretBlink])

  return (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text style={styles.headerText}>{text}</Text>
      {caretBlink && <Text style={styles.headerText}>|</Text>}
    </View>
  )
}

export default AskHowText

const styles = StyleSheet.create({
    headerText: {
        fontSize: 21,
        fontWeight: '600'
    },
})