import React, { useState, useEffect, useRef } from 'react';
import { Modal, TextInput, View, Image, Animated, StyleSheet, ScrollView, StatusBar, Easing, TouchableOpacity } from 'react-native';
import { Text, PaperProvider, DataTable, useTheme, } from 'react-native-paper';
import images from '../../assets/images';
import  { useNavigation, useRoute } from '@react-navigation/native';
import HButton from '../../components/Hbutton'
import MFooter from '../../components/Mfooter';
import MHeader from '../../components/Mheader';
import SubNavbar from '../../components/SubNavbar';
import ImageButton from '../../components/ImageButton';
import { useAtom } from 'jotai';
import { firstNameAtom, emailAtom, userRoleAtom, entryDateAtom, phoneNumberAtom, addressAtom } from '../../context/ClinicalAuthProvider';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
// import MapView from 'react-native-maps';
import { Jobs, PostJob } from '../../utils/useApi';
import moment from 'moment';

export default function ShiftListing ({ navigation }) {
  //---------------------------------------Animation of Background---------------------------------------
  const [backgroundColor, setBackgroundColor] = useState('#0000ff'); // Initial color
  let colorIndex = 0;
  const [isModal, setModal] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      if(colorIndex >= 0.9) {
        colorIndex = 0;
      } else {
        colorIndex += 0.1;
      }

      const randomColor = colorIndex == 0 ? `#00000${Math.floor(colorIndex * 256).toString(16)}` : `#0000${Math.floor(colorIndex * 256).toString(16)}`;
      setBackgroundColor(randomColor);
      // console.log(randomColor)
    }, 500); // Change color every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const theme = useTheme();
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [userRole, setUserRole] = useAtom(userRoleAtom);
  const [entryDate, setEntryDate] = useAtom(entryDateAtom);
  const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const handleNavigate = (navigateUrl) => {
    navigation.navigate(navigateUrl);
  }

  // const userInfo = [
  //   {title: 'Entry Date', content: firstName},
  //   {title: 'Phone', content: phoneNumber},
  //   {title: 'email', content: userRole},
  //   {title: 'Caregiver', content: caregiver},
  // ]


  let info = [
    {title: 'Job-ID', content: ""},
    {title: 'Job Num. -#', content: ''},
    {title: 'Caregiver', content: ''},
    {title: 'Pay Rate', content: ""},
    {title: 'Job', content: ""},
    {title: 'Job Status', content: ""},
    {title: 'Shift Date/Time Text', content: ''},
    {title: 'Shift Dates & Times', content: ''},
    {title: 'Location', content: ""},
    {title: 'Bonus', content: ""},
  ];
  const [data, setData] = useState([]);
  const [userInfos, setUserInfo] = useState([]);
  const [detailedInfos, setDetailedInfo] = useState([]);
  useEffect(() => {
    async function getData() {
      let Data = await Jobs('jobs', 'Clinicians');
      if(!Data) {
        setData(['No Data'])
      }
      else {
        setData(Data);
        console.log("date------------------------",data);
        const transformedData = Data.map(item => [{
          title: 'Job-ID',
          content: item.jobId
        },{
          title: 'Title',
          content: item.degree
        },{
          title: 'Pay Rate',
          content: item.payRate
        },{
          title: 'Job',
          content: item.unit
        },{
          title: 'Job Status',
          content: item.jobStatus
        },{
          title: 'Shift Date/Time Text',
          content: moment(item.shiftDate).format("MM/DD/YYYY")
        },{
          title: 'Location',
          content: item.location
        }]);
        console.log(transformedData, '-----++++++')
        setUserInfo(transformedData);
        console.log('iserer', userInfos);
      }
      // // setTableData(Data[0].degree)
      // tableScan(Data);
    }
    getData();
    // tableData = tableScan(Data);
  }, []);

  const userInfo = [[
    {title: 'JOB-ID', content: "344"},
    {title: 'Job', content: 'Long Term Care'},
    {title: 'Location', content: "Lancaster, NY"},
    {title: 'Title', content: "LPN"},
    {title: 'Shift', content: '6/9/24, 6p-11p'},
    {title: 'Status', content: "Available"},
    {title: 'Pay Rate', content: "$35.00"},
  ]]

  const detailedInfo = [
    {
      jobId: '344', 
      job: 'Long Term Care', 
      jobNum: '', 
      caregiver: 'LPN', 
      payRate: '$35.00', 
      jobStatus: 'Available', 
      shiftDateTime: '07/21/2024, 3p-11p',
      shiftDates: '',
      location: 'Lancaster, NY',
      bonus: ''
    }
  ]
  
  const toggleModal = () => {
    setModal(!isModal);
  }

  const handleEdit = (id) => {
    console.log('handleEdit--->', id);
    console.log(data)
    let cnt =1;
    const infoData = data.find(item => item.jobId === id)
    setDetailedInfo([...detailedInfos, {
      title: 'Job-ID',
      content: infoData.jobId
    },{
      title: 'Job Num. -#',
      content: infoData.jobNum
    },{
      title: 'Caregiver',
      content: infoData.degree
    },{
      title: 'Pay Rate',
      content: infoData.payRate
    },{
      title: 'Job',
      content: infoData.unit
    },{
      title: 'Job Status',
      content: infoData.jobStatus
    },{
      title: 'Shift Date/Time Text',
      content: moment(infoData.shiftDate).format("MM/DD/YYYY"),
    },{
      title: 'Shift Dates & Times',
      content: infoData.shiftDates
    },{
      title: 'Location',
      content: infoData.location
    },{
      title: 'Bonus',
      content: infoData.bonus
    }])
    toggleModal()  
  }
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [mile, setMile] = useState('10');
  const handleItemPress = (e) => {
    setMile(e);
    setShowModal(false);
  }

  const handleChange = (e) => {
    setText(e.value);
  } 
  const handleSubmit = async (id) => {
    console.log(content);
    const data = {content: content, jobId: id};
    let response = await PostJob(data, 'Jobs');
    handleBack();
  }
  const handleBack = () => {
    setModal(!isModal)
  }
  return (
      <View style={styles.container}>
        <StatusBar 
            translucent backgroundColor="transparent"
        />
        <MHeader navigation={navigation} />
        <SubNavbar navigation={navigation} name={'ClientSignIn'} />
        <ScrollView style={{width: '100%', marginTop: 140}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topView}>
            <Animated.View style={[styles.backTitle, {backgroundColor}]}>
              <Text style={styles.title}>JOB / SHIFT LISTINGS</Text>
            </Animated.View>
            <View style={styles.bottomBar}/>
          </View>
          <Text style={styles.text}>View and Apply for Shifts below, once applied the Facility will be notified, and if <Text style={{fontWeight: 'bold'}}>&nbsp;"AWARDED"&nbsp;</Text> the shift will appear on your <Text style={{fontWeight: 'bold'}}>&nbsp;"MY SHIFTS TAB"&nbsp;</Text>.</Text>
          <View style={styles.imageButton}>
            <ImageButton title={"My Home"} onPress={() => handleNavigate('MyHome')} />
            <ImageButton title={"My Profile"} onPress={() => handleNavigate('MyProfile')} />
            <ImageButton title={"My Shifts"} onPress={() => handleNavigate('Shift')} />
            <ImageButton title={"My Reporting"} onPress={() => handleNavigate('Reporting')} />
          </View>
          <View style={styles.profile}>
            <View style={styles.profileTitleBg}>
              <Text style={styles.profileTitle}>🖥️ ALL AVAILABLE SHIFTS</Text>
            </View>
            <Text style={styles.name}>Showing 1-25 of 25</Text>
              {userInfos.map((it, idx) =>
                <View key={idx} style={styles.subBar}>
                  {it.map((item, index) => 
                    <View key={index} style={{flexDirection: 'row', width: '100%'}}>
                      <Text style={[styles.titles, item.title=="JOB-ID" ? {backgroundColor: "#00ffff"} : {}]}>{item.title}</Text>
                      <Text style={[
                        styles.content, 
                        item.title == "JOB-ID" || item.title == "Status" ? {fontWeight: 'bold'} : {}
                      ]}>{item.content}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.edit} onPress = {() => handleEdit(it[0].content)}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}> VIEW & APPLY</Text>
                  </TouchableOpacity>
                </View>)
              }
          </View>
          <View style={{marginBottom: 100, marginLeft: '10%'}}>
            <Text style={[styles.title, {color: 'black', fontSize: 20}]}>Jobs</Text>
            <View style = {{}}>
              <Text style={{marginBottom: 10}}>Search</Text>
              <View style={{flexDirection: 'row', width:'80%'}}>
                <TextInput
                  style={styles.textModalInput}
                  placeholder="City, State, or Zip"
                  onChangeText={e => handleChange(e)}
                  value={text}
                />
                <Text style={[styles.text, {marginTop: 11, marginLeft: 0, width: 50}]}>within</Text>
                
                <TouchableOpacity onPress = {()=>setShowModal(true)} style={{height: 30, width: '100%', zIndex: 10}}>
                </TouchableOpacity>
                <TextInput
                  style={[styles.textModalInput, {width: 100, position: 'absolute', left: '78%', zIndex: 0}]}
                  placeholder=""
                  editable= {false}
                  // onChangeText={e => handleChange(e)}
                  value={mile ? mile+" Miles": '' }
                />
                {showModal && <Modal
                  Visible={false}
                  transparent= {true}
                  animationType="slide"
                  onRequestClose={() => {
                    setShowModal(!showModal);
                  }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.calendarContainer}>
                      <Text style={styles.subtitle} onPress={()=>handleItemPress('5')}>5 Miles</Text>
                      <Text style={styles.subtitle} onPress={()=>handleItemPress('10')}>10 Miles</Text>
                      <Text style={styles.subtitle} onPress={()=>handleItemPress('25')}>25 Miles</Text>
                      <Text style={styles.subtitle} onPress={()=>handleItemPress('50')}>50 Miles</Text>
                      <Text style={styles.subtitle} onPress={()=>handleItemPress('100')}>100 Miles</Text>
                      <Text style={styles.subtitle} onPress={()=>handleItemPress('any')}>Any</Text>
                    </View>
                  </View>
                </Modal>}
              </View>
            </View>
            <TouchableOpacity style={[styles.edit, {backgroundColor: 'rgba(15, 118, 193, 0.73)', width: '90%' }]} onPress = {() => handleEdit()}>
              <Text style={{color: 'white', fontSize: 20}}> Search </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {isModal && <Modal
          Visible={false}
          transparent= {true}
          animationType="slide"
          onRequestClose={() => {
            setShowModal(!showModal);
          }}
        >
          <StatusBar translucent backgroundColor='transparent' />
          <ScrollView style={styles.modalsContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.viewContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>View Job/ Shift Details</Text>
                <TouchableOpacity style={{width: 20, height: 20, }} onPress={toggleModal}>
                  <Image source = {images.close} style={{width: 20, height: 20,}}/>
                </TouchableOpacity>
              </View>
              <View style={styles.body}>
                <TouchableOpacity style={styles.backBtn} onPress = {handleBack}>
                  <Text style={[styles.profileTitle, {textAlign: 'center'}]}>Back to Job / Shift Listings {'>'}</Text>
                </TouchableOpacity>
                <View style={styles.modalBody}>
                  {detailedInfos.map((item, index) => 
                    <View key={index} style={{flexDirection: 'row', width: '100%'}}>
                      <Text style={[styles.titles, {backgroundColor: '#f2f2f2', marginBottom: 5, paddingLeft: 2}]}>{item.title}</Text>
                      <Text style={styles.content}>{item.content}</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.profileTitleBg, {marginTop: 20}]}>
                  <Text style={styles.profileTitle}>🖥️ SUBMIT INTEREST IN THIS SHIFT</Text>
                </View>
                <Text style={[styles.text, {color: 'blue', fontWeight: 'bold', marginTop: 0, textAlign: 'left'}]}>You will be notified via email, if this shift is awarded to you!</Text>
                <View style={styles.msgBar}>
                  <Text style={[styles.subtitle, {textAlign: 'left', marginTop: 10, fontWeight: 'bold'}]}>ADD A BRIEF MESSAGE (optional)</Text>
                  <TextInput
                    style={styles.inputs}
                    onChangeText={setContent}
                    value={content}
                    multiline={true}
                    textAlignVertical="top"
                    placeholder=""
                  />
                </View>
                <View style={[styles.btn, {marginTop: 20}]}>
                  <HButton style={styles.subBtn} onPress={()=> handleSubmit(detailedInfo[0].content) }>
                    Submit
                  </HButton>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>}
        <MFooter />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%'
  },
  topView: {
    marginTop: 30,
    marginLeft: '10%',
    width: '80%',
    position: 'relative'
  },
  backTitle: {
    backgroundColor: 'black',
    width: '90%',
    height: '55',
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    color: 'black',
    top: 10
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'transparent',
    paddingVertical: 10
  },
  bottomBar: {
    marginTop: 30,
    height: 5,
    backgroundColor: '#4f70ee1c',
    width: '100%'
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 30,
    width: '90%',
    marginLeft: '5%'
  },
  imageButton: {
    width: '90%',
    marginLeft: '5%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  homepage: {
    // paddingHorizontal: 30,
    // paddingVertical: 70,
    marginLeft: '15%',
    width: 250,
    height: 200,
    marginTop: 30,
    marginBottom: 100
  },
  profile: {
    marginTop: 20,
    width: '84%',
    marginLeft: '7%',
    padding: 20,
    backgroundColor: '#c2c3c42e',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#b0b0b0'
    // elevation: 1,
    // // shadowColor: 'rgba(0, 0, 0, 0.4)',
    // // shadowOffset: { width: 1, height: 1 },
    // shadowRadius: 0,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 30,
    width: '40%'
  },
  content: {
    fontSize: 16,
    lineHeight: 30,
  },
  profileTitleBg: {
    backgroundColor: '#BC222F',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    // width: '80%',
    marginRight: '10%',
    marginBottom: 20
  },
  profileTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  nurse: {
    width: 200,
    height: 200
  },
  name: {
    fontSize: 14,
    marginVertical: 10,
  },
  backBtn: {
    padding: 10,
    width: '70%',
    justifyContent: 'flex-start',
    borderColor: '#ffaa22',
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#194f69'
  },
  edit: {
    backgroundColor: '#BC222F',
    padding: 5,
    borderRadius: 10,
    fontWeight: 'bold',
    color: 'white',
    width: '45%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  subBar: {
    width: '100%',
    backgroundColor: "#f0fbfe",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#c6c5c5",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalsContainer: {
    // flex: 1,
    // justifyContent: 'flex-start',
    paddingTop: 30,
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    width: '60%',
    height: '30%',
    marginLeft: '20',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 20
  },
  textModalInput: { 
    backgroundColor: 'white', 
    width: '60%', 
    height: 40, 
    marginBottom: 10, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'hsl(0, 0%, 86%)', 
    paddingLeft: 10, 
    marginRight: 0,
    color: 'black'
  },
  viewContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    elevation: 5,
    width: '90%',
    marginLeft: '5%',
    flexDirection: 'flex-start',
    borderWidth: 3,
    borderColor: '#7bf4f4',
    marginBottom: 100
  },
  modalBody: {
    backgroundColor: '#e3f2f1',
    borderRadius: 10,
    borderColor: '#c6c5c5',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: '20%,',
    padding: 20,
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'red',
  },
  body: {
    marginTop: 10,
    paddingHorizontal:20,
  },
  inputs: {
    marginTop: 5,
    marginBottom: 20,
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  btn: {flexDirection: 'column',
    gap: 20,
    marginBottom: 30,
  },
  subBtn: {
    marginTop: 0,
    padding: 10,
    backgroundColor: '#447feb',
    color: 'black',
    fontSize: 16,
  },
});
  