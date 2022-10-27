import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const AskHowText = ({ words, deleteAnimation, typingSpeed }) => {

  //const words = ['Text','Audio Text','Video','Group Call'];

    const [text, setText] = useState("");
    const [wordIndex,setWordIndex] = useState(0);
    const [fullText, setFullText] = useState(
    ""
    )
    const [index, setIndex] = useState();
    const [deleteindex, setDeleteIndex] = useState();
    const [caretBlink, setcaretBlink] = useState(false);

    useEffect(() => {
        //console.log('running deleteIndex')
        if (deleteAnimation) {
          if (deleteindex <= fullText.length) {
            let t = setTimeout(() => {
              var currentFullText = fullText.slice(0,fullText.length+1-deleteindex);
              setText(currentFullText);
              setDeleteIndex(deleteindex + 1);
            }, 400)
            return () => clearTimeout(t);
          }
          else {
            setWordIndex(wordIndex + 1);
            setDeleteIndex(0);
          }
        }

      }, [deleteindex])

    useEffect(() => {
      //console.log('running index')

        if (index < fullText.length) {
          let t = setTimeout(() => {
            setText(text + fullText[index])
            setIndex(index + 1)
          }, typingSpeed)
          return () => clearTimeout(t);
        }
        else {
          if (deleteAnimation) {
            setDeleteIndex(0);
          }
          else {
            setWordIndex(wordIndex + 1);
          }
        }
      }, [index])
      
    //Reset loop through words if index surpasses # of words, else start at beginning of next word
    useEffect(() => {
      //console.log('running wordIndex')

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
        let t = setTimeout(() => {
            setcaretBlink(!caretBlink)
        }, 500)
        return () => clearTimeout(t);
    },[caretBlink])

  return (
    <View style={{flexDirection:'row', alignItems:'center',height:40,}}>
      {fullText.length <= 5 ? 
        <Text style={styles.headerText}>{text}</Text> :
        <Text style={styles.smallHeaderText}>{text}</Text>
      }
      {caretBlink && 
      <Text style={styles.headerText}>|</Text>
      }
    </View>
  )
}

export default AskHowText

const styles = StyleSheet.create({
    headerText: {
        fontSize: 21,
        fontWeight: '600'
    },
    smallHeaderText: {
        fontSize: 14,
        fontWeight: '600'
    },
})