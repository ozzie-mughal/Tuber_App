import { Dimensions, StyleSheet, Text, TouchableOpacity, View, 
    Alert, Image, SafeAreaView, Button, ScrollView,
    KeyboardAvoidingView } from 'react-native';


const yesOrNo = [
  {key: 'Yes', value: 'Yes'},
  {key: 'No', value: 'No'},
]

const signUp_RoleType = [
    {key: 'Student', value: 'Student', desc: "Ask questions to a tutor of your choosing, or one recommended by our trusty Bumpy AI that can best vibe with your way of learning and activity.\n\nAsk in any way you please, whether it’s simple text, images, group session, video, or even audio recordings. \nNo matter how you do it, you are only charged for how long the question takes.\n\nAccess questions asked in full and at any time, and check out our resources and articles on how to learn smarter."},
    {key: 'Tutor', value: 'Tutor', desc: "Accept (or reject) questions bumped to you by students, in your subject expertise. \n\nThe quicker you solve the question, the more bump coins you can cash out!\n\nSelect what times of the day you are happy to answer questions, and recieve ratings and badges from students to improve your chances of Bumpy AI connecting you with more and more students.\n\nAnswer in any way you please, whether it’s simple text, images, group session, video, or even audio recordings. "},
    {key: 'Parent', value: 'Parent', desc: "Coming soon!"},
    ]
const signUp_AboutMe = [
    {key: 'AboutMe', value: 'AboutMe', desc: "For both students and tutors, Nemo AI uses information about you, as well as your preferences, to match the best people together and optimise your learning experience. \n\nThis can include finding tutors that are more available in your active hours, or top-rated in your preferred method of asking questions (eg. texting)"},
    ]
//Some dummy images
const tutorCardHeaderImage = <Image style={{width:100, height:100}} source={require('../../assets/tutor_card_header.png')}/>
const studentCardHeaderImage = <Image style={{width:100, height:100, resizeMode:'contain'}} source={require('../../assets/student_card_header.png')}/>
const parentCardHeaderImage = <Image style={{width:90, height:90, resizeMode:'contain'}} source={require('../../assets/parent_card_header.png')}/>

//Define options for selecting role type
const roleTypeOptions = [
    {key: 0, value: 'Student', icon: studentCardHeaderImage, desc: "I want to ask questions in my time, in my own way, at an affordable cost."},
    {key: 1, value: 'Tutor', icon: tutorCardHeaderImage, desc: "I want to answer questions in my time, in my area of expertise, and make extra cash - fast."},
    {key: 2, value: 'Parent', icon: parentCardHeaderImage, desc: "Coming soon!"},
  ];

//Define options for selecting gender
const genderOptions = [
    {key: 0, value: 'Male'},
    {key: 1, value: 'Female'},
    {key: 2, value: 'Indeterminate'},
    {key: 3, value: 'Unknown'},
  ];
//subject Options, based on year selected
  const subjectOptions = [
    {key: 0, category: 'K-6', value: 'English'},
    {key: 1, category: 'K-6', value: 'Geography'},
    {key: 2, category: 'K-6', value: 'History'},
    {key: 3, category: 'K-6', value: 'Languages'},
    {key: 4, category: 'K-6', value: 'Mathematics'},
    {key: 5, category: 'K-6', value: 'Science'},
    {key: 6, category: '7-10', value: 'Aboriginal Studies'},
    {key: 7, category: '7-10', value: 'Agricultural Tech'},
    {key: 8, category: '7-10', value: 'Commerce'},
    {key: 9, category: '7-10', value: 'Design & Tech'},
    {key: 10, category: '7-10', value: 'Drama'},
    {key: 11, category: '7-10', value: 'English'},
    {key: 12, category: '7-10', value: 'Geography'},
    {key: 13, category: '7-10', value: 'Graphics Tech'},
    {key: 14, category: '7-10', value: 'History'},
    {key: 15, category: '7-10', value: 'Industrial Tech'},
    {key: 16, category: '7-10', value: 'Information Tech'},
    {key: 17, category: '7-10', value: 'Languages'},
    {key: 18, category: '7-10', value: 'Mathematics'},
    {key: 19, category: '7-10', value: 'Music'},
    {key: 20, category: '7-10', value: 'PDHPE'},
    {key: 21, category: '7-10', value: 'Science'},
    {key: 22, category: '7-10', value: 'Visual Arts/Design'},
    {key: 23, category: 'Prelim/HSC', value: 'Aboriginal Studies'},
    {key: 24, category: 'Prelim/HSC', value: 'Biology'},
    {key: 25, category: 'Prelim/HSC', value: 'Business Studies'},
    {key: 26, category: 'Prelim/HSC', value: 'Chemistry'},
    {key: 27, category: 'Prelim/HSC', value: 'Design & Tech'},
    {key: 28, category: 'Prelim/HSC', value: 'Drama'},
    {key: 29, category: 'Prelim/HSC', value: 'Economics'},
    {key: 30, category: 'Prelim/HSC', value: 'Engineering Studies'},
    {key: 31, category: 'Prelim/HSC', value: 'English Advanced'},
    {key: 32, category: 'Prelim/HSC', value: 'English Standard'},
    {key: 33, category: 'Prelim/HSC', value: 'English Extension'},
    {key: 34, category: 'Prelim/HSC', value: 'Geography'},
    {key: 35, category: 'Prelim/HSC', value: 'Languages'},
    {key: 36, category: 'Prelim/HSC', value: 'Legal Studies'},
    {key: 37, category: 'Prelim/HSC', value: 'Mathematics Advanced'},
    {key: 38, category: 'Prelim/HSC', value: 'Mathematics Standard'},
    {key: 39, category: 'Prelim/HSC', value: 'Mathematics Ext 1'},
    {key: 40, category: 'Prelim/HSC', value: 'Mathematics Ext 2'},
    {key: 41, category: 'Prelim/HSC', value: 'Music'},
    {key: 42, category: 'Prelim/HSC', value: 'PDHPE'},
    {key: 43, category: 'Prelim/HSC', value: 'Physics'},
    {key: 44, category: 'Prelim/HSC', value: 'Studies of Religion I'},
    {key: 45, category: 'Prelim/HSC', value: 'Studies of Religion II'},
    {key: 46, category: 'Prelim/HSC', value: 'Visual Arts/Design'},
    {key: 60, category: 'Prelim/HSC', value: 'UCAT'},
    {key: 61, category: 'Prelim/HSC', value: 'GAMSAT'},
    {key: 47, category: 'University', value: 'UCAT'},
    {key: 48, category: 'University', value: 'GAMSAT'},
    {key: 49, category: 'University', value: 'Architecture & Planning'},
    {key: 50, category: 'University', value: 'Arts & Social Sciences'},
    {key: 51, category: 'University', value: 'Arts & Design'},
    {key: 52, category: 'University', value: 'Business'},
    {key: 53, category: 'University', value: 'Education/Social Work'},
    {key: 54, category: 'University', value: 'Engineering'},
    {key: 55, category: 'University', value: 'Medicine/Health'},
    {key: 56, category: 'University', value: 'Music'},
    {key: 57, category: 'University', value: 'IT'},
    {key: 58, category: 'University', value: 'Law'},
    {key: 59, category: 'University', value: 'Science'},
  ];
//Detailed Times Options
  const detailedTimesOptions = [
    {key: 0, category: 'DetailedTime', value: '9:00 AM'},
    {key: 1, category: 'DetailedTime', value: '10:00 AM'},
    {key: 2, category: 'DetailedTime', value: '11:00 AM'},
    {key: 3, category: 'DetailedTime', value: '12:00 PM'},
    {key: 4, category: 'DetailedTime', value: '1:00 PM'},
    {key: 5, category: 'DetailedTime', value: '2:00 PM'},
    {key: 6, category: 'DetailedTime', value: '3:00 PM'},
    {key: 7, category: 'DetailedTime', value: '4:00 PM'},
    {key: 8, category: 'DetailedTime', value: '5:00 PM'},
    {key: 9, category: 'DetailedTime', value: '6:00 PM'},
    {key: 10, category: 'DetailedTime', value: '7:00 PM'},
    {key: 11, category: 'DetailedTime', value: '8:00 PM'},
    {key: 12, category: 'DetailedTime', value: '9:00 PM'},
    {key: 13, category: 'DetailedTime', value: '10:00 PM'},
    {key: 14, category: 'DetailedTime', value: '11:00 PM'},
    {key: 15, category: 'DetailedTime', value: '12:00 AM'},
    {key: 16, category: 'DetailedTime', value: '1:00 AM'},
    {key: 17, category: 'DetailedTime', value: '2:00 AM'},
    {key: 18, category: 'DetailedTime', value: '3:00 AM'},
    {key: 19, category: 'DetailedTime', value: '4:00 AM'},
    {key: 20, category: 'DetailedTime', value: '5:00 AM'},
    {key: 21, category: 'DetailedTime', value: '6:00 AM'},
    {key: 22, category: 'DetailedTime', value: '7:00 AM'},
    {key: 23, category: 'DetailedTime', value: '8:00 AM'},
  ];
//Simple Times options
const simpleTimeOptions = [
  {key: 1, label: 'Mornings', description: 'Generally between 7-11AM', value: 'Mornings'},
  {key: 2, label: 'Afternoons', description: 'Generally between 11AM-4PM', value: 'Afternoons'},
  {key: 3, label: 'Evenings', description: 'Generally between 4-8PM', value: 'Evenings'},
  {key: 4, label: 'Night', description: 'Until midnight.', value: 'Night'},
  {key: 5, label: 'Late Night', description: 'You must be cramming for an exam too.', value: 'Late Night'},
];

  const tutorSubjectOptions = [
    {key: 0, category: 'K-6', value: 'K-6 English'},
    {key: 1, category: 'K-6', value: 'K-6 Geography'},
    {key: 2, category: 'K-6', value: 'K-6 History'},
    {key: 3, category: 'K-6', value: 'K-6 Languages'},
    {key: 4, category: 'K-6', value: 'K-6 Mathematics'},
    {key: 5, category: 'K-6', value: 'K-6 Science'},
    {key: 11, category: '7-10', value: '7-10 English'},
    {key: 12, category: '7-10', value: '7-10 Geography'},
    {key: 14, category: '7-10', value: '7-10 History'},
    {key: 17, category: '7-10', value: '7-10 Languages'},
    {key: 18, category: '7-10', value: '7-10 Mathematics'},
    {key: 21, category: '7-10', value: '7-10 Science'},
    {key: 24, category: 'Prelim/HSC', value: 'Prelim/HSC Biology'},
    {key: 25, category: 'Prelim/HSC', value: 'Prelim/HSC Business Studies'},
    {key: 26, category: 'Prelim/HSC', value: 'Prelim/HSC Chemistry'},
    {key: 29, category: 'Prelim/HSC', value: 'Prelim/HSC Economics'},
    {key: 30, category: 'Prelim/HSC', value: 'Prelim/HSC Engineering Studies'},
    {key: 31, category: 'Prelim/HSC', value: 'Prelim/HSC English Advanced'},
    {key: 32, category: 'Prelim/HSC', value: 'Prelim/HSC English Standard'},
    {key: 33, category: 'Prelim/HSC', value: 'Prelim/HSC English Extension'},
    {key: 34, category: 'Prelim/HSC', value: 'Prelim/HSC Geography'},
    {key: 35, category: 'Prelim/HSC', value: 'Prelim/HSC Languages'},
    {key: 36, category: 'Prelim/HSC', value: 'Prelim/HSC Legal Studies'},
    {key: 37, category: 'Prelim/HSC', value: 'Prelim/HSC Mathematics Advanced'},
    {key: 38, category: 'Prelim/HSC', value: 'Prelim/HSC Mathematics Standard'},
    {key: 39, category: 'Prelim/HSC', value: 'Prelim/HSC Mathematics Ext 1'},
    {key: 40, category: 'Prelim/HSC', value: 'Prelim/HSC Mathematics Ext 2'},
    {key: 41, category: 'Prelim/HSC', value: 'Prelim/HSC Music'},
    {key: 43, category: 'Prelim/HSC', value: 'Prelim/HSC Physics'},
    {key: 44, category: 'Prelim/HSC', value: 'Prelim/HSC Studies of Religion I'},
    {key: 45, category: 'Prelim/HSC', value: 'Prelim/HSC Studies of Religion II'},
    {key: 47, category: 'University', value: 'UCAT'},
    {key: 48, category: 'University', value: 'GAMSAT'},
    {key: 49, category: 'University', value: 'Tertiary - Architecture & Planning'},
    {key: 50, category: 'University', value: 'Tertiary - Arts & Social Sciences'},
    {key: 51, category: 'University', value: 'Tertiary - Arts & Design'},
    {key: 52, category: 'University', value: 'Tertiary - Business'},
    {key: 53, category: 'University', value: 'Tertiary - Education/Social Work'},
    {key: 54, category: 'University', value: 'Tertiary - Engineering'},
    {key: 55, category: 'University', value: 'Tertiary - Medicine/Health'},
    {key: 56, category: 'University', value: 'Tertiary - Music'},
    {key: 57, category: 'University', value: 'Tertiary - IT'},
    {key: 58, category: 'University', value: 'Tertiary - Law'},
    {key: 59, category: 'University', value: 'Tertiary - Science'},
  ];
  const yearOptions = [
    {key: 0, category: 'Year', name: 'Primary - K-6', value: 'K-6'},
    {key: 1, category: 'Year', name: 'Secondary - 7-10', value: '7-10'},
    {key: 2, category: 'Year', name: 'Secondary - Prelim/HSC', value: 'Prelim/HSC'},
    {key: 3, category: 'Year', name: 'University', value: 'University'},

  ];
  const PartnerCentreOptions = [
    {key: 0, category: 'Partner', name: 'Uplift Education', value: 'Uplift Education'},
    {key: 1, category: 'Partner', name: 'Matrix Education', value: 'Matrix Education'},
    {key: 2, category: 'Partner', name: 'Dux Tuition', value: 'Dux Tuition'},

  ];


export { signUp_RoleType, signUp_AboutMe, roleTypeOptions, genderOptions,
  subjectOptions, yesOrNo, tutorSubjectOptions, yearOptions, PartnerCentreOptions,
  detailedTimesOptions,simpleTimeOptions};