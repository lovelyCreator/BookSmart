import React, { useState, useEffect, useRef } from 'react';
import { Modal, TextInput, View, Image, Animated, StyleSheet, ScrollView, StatusBar, Easing, TouchableOpacity } from 'react-native';
import { Text, PaperProvider, DataTable, useTheme } from 'react-native-paper';
import images from '../../assets/images';
import  { useNavigation, useRoute } from '@react-navigation/native';
import HButton from '../../components/Hbutton'
import MFooter from '../../components/Mfooter';
import MHeader from '../../components/Mheader';
import SubNavbar from '../../components/SubNavbar';
import ImageButton from '../../components/ImageButton';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
// import TimePicker from 'react-time-picker';
// import { AntDesign } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { firstNameAtom, emailAtom, userRoleAtom, entryDateAtom, phoneNumberAtom, addressAtom } from '../../context/ClinicalAuthProvider';
// import MapView from 'react-native-maps';
import * as Progress from 'react-native-progress';
import { Jobs, PostJob } from '../../utils/useApi';
import moment from 'moment';

export default function Shift ({ navigation }) {
  //---------------------------------------Animation of Background---------------------------------------
  const [backgroundColor, setBackgroundColor] = useState('#0000ff'); // Initial color
  let colorIndex = 0;
  const [isModal, setModal] = useState(false);
  const [isUpload, setUpload] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

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
  const [data, setData] = useState([]);
  const [userInfos, setUserInfo] = useState([]);
  const [detailedInfos, setDetailedInfos] = useState([]);

  const userInfo = [[
    {title: 'JOB-ID', content: "344"},
    {title: 'Location', content: "Lancaster, NY"},
    {title: 'Pay Rate', content: "$30.00"},
    {title: 'SHIFT  STATUS', content: 'Pending - Completed Verification'},
    {title: 'Caregiver', content: 'Dale'},
    {title: 'Timesheet', content: 'animatedsticker.tgs'},
  ]]
  //------------------hour event------------------------
  const [content, setContent] = useState({
    startTime: '',
    endTime: '',
    lunch: '',
    comments: ''
  });

  const handleContent = (target, e) => {
    setContent({...content, [target]: e});
  }
  const handleSubmit = () => {
    console.log(content);
    toggleModal();
  }
  
  const [detailedInfo, setDetailedInfo] = useState([
    {
      jobId: '344', 
      entryDate: '07/11/2024', 
      caregiver: 'Dale', 
      payRate: '$35.00', 
      shiftDateTime: '',
      hoursWorked: '11:50am to 12:50pm = 1.00',
      hoursSubmitted: 'no', 
      hoursApproved: 'no',
    }
  ]);
  const [info, setInfo] = useState([
    {title: 'Job-ID', content: ""},
    {title: 'Entry Date', content: ''},
    {title: 'Caregiver', content: ''},
    {title: 'Shift Date & Time', content: ''},
    {title: 'Hours Worked', content: ""},
    {title: 'Hours Submitted?', content: "yes"},
    {title: 'Hours Approved?', content: "pending"},
  ]);
  
  const toggleModal = () => {
    setModal(!isModal);
  }

  const handleHoursEdit = (id) => {
    console.log('handleEdit--->', id);
    let cnt =1;
    detailedInfo.forEach(item => {
      console.log('SUcceddd')
      if (item.jobId === id) {
        setInfo([
          {title: 'Job-ID', content: item.jobId},
          {title: 'Entry Date', content: item.entryDate},
          {title: 'Caregiver', content: item.caregiver},
          {title: 'Shift Date & Time', content: item.shiftDateTime},
          {title: 'Hours Worked', content: item.hoursWorked},
          {title: 'Hours Submitted?', content: item.hoursSubmitted},
          {title: 'Hours Approved?', content: item.hoursApproved},
        ])
        cnt++;
      }
    });
    if (cnt == 0) {
      console.log('failledd')
      setInfo([
        {title: 'Job-ID', content: ""},
        {title: 'Entry Date', content: ''},
        {title: 'Caregiver', content: ''},
        {title: 'Shift Date & Time', content: ''},
        {title: 'Hours Worked', content: ""},
        {title: 'Hours Submitted?', content: "yes"},
        {title: 'Hours Approved?', content: "pending"},
      ]);
    }
    toggleModal()  
  }

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
          title: 'Location',
          content: item.location
        },{
          title: 'SHIFT STATUS',
          content: item.jobStatus
        },{
          title: 'Caregiver',
          content: firstName
        },{
          title: 'Timesheet',
          content: item.timeSheet? "TimeSheet" : ''
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
  //-----------------------handleUpload event--------------------------
  
  const [timeFile, setTimeFile] = useState('');

  const handleUploadSubmit = async (id) => {
    console.log(timeFile)
    const data = {jobId: id, timeSheet: timeFile}
    const response = await PostJob(data, 'jobs')
    setUpload(!isUpload)
  }
  const [detailedUploadInfo, setDetailedUploadInfo] = useState([
    {
      jobId: '344',
      caregiver: 'Dale',
      timeSheet: 'animatedsticker.tgs',
    }
  ]);

const [uploadInfo, setUploadInfo] = useState([
    { title: 'Job-ID', content: "" },
    { title: 'Caregiver', content: '' },
    { title: 'TimeSheet', content: '' },
]);

const toggleUploadModal = () => {
    setUpload(!isUpload);
};

const handleUploadEdit = (id) => {
  console.log('handleEdit--->', id);
  let cnt = 0;
  let infoData = data.find(item => item.jobId === id)
  // data.forEach(item => {
  //   if (item.jobId === id) {
  //     console.log('Success');
      setDetailedInfos([
        { title: 'Job-ID', content: infoData.jobId },
        { title: 'Caregiver', content: firstName },
        { title: 'TimeSheet', content: infoData.timeSheet },
      ]);
      // cnt++;
    // }
    // setDetailedInfos([...detailedInfos, {
    //   title: 'Job-ID',
    //   content: infoData.jobId
    // },{
    //   title: 'Job Num. -#',
    //   content: infoData.jobNum
    // },{
    //   title: 'Caregiver',
    //   content: infoData.degree
    // },{
    //   title: 'Pay Rate',
    //   content: infoData.payRate
    // },{
    //   title: 'Job',
    //   content: infoData.unit
    // },{
    //   title: 'Job Status',
    //   content: infoData.jobStatus
    // },{
    //   title: 'Shift Date/Time Text',
    //   content: moment(infoData.shiftDate).format("MM/DD/YYYY"),
    // },{
    //   title: 'Shift Dates & Times',
    //   content: infoData.shiftDates
    // },{
    //   title: 'Location',
    //   content: infoData.location
    // },{
    //   title: 'Bonus',
    //   content: infoData.bonus
    // }])
  // }});

  if (cnt === 0) {
    console.log('failed');
    setUploadInfo([
      { title: 'Job-ID', content: "" },
      { title: 'Caregiver', content: "" },
      { title: 'TimeSheet', content: "" },
    ]);
  }

  console.log(uploadInfo);
  toggleUploadModal();
};

  const handleEdit = () => {
    console.log('handleEdit')
  }
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const handleItemPress = (e) => {
    setText(e);
    setShowModal(false);
  }

  const pageItems = [
    {label: '10 per page', value: '1'},
    {label: '25 per page', value: '2'},
    {label: '50 per page', value: '3'},
    {label: '100 per page', value: '4'},
    {label: '500 per page', value: '5'},
    {label: '1000 per page', value: '6'},
  ]

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const handleDelete = () => {
    setDetailedInfo(prevUploadInfo => {
      return prevUploadInfo.map((item, index) => {
        if (index === 2) { // Index 2 corresponds to the third item (0-based index)
            return { ...item, content: '' }; // Update the content of the third item
        }
        return item; // Keep other items unchanged
      });
    });
  }
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Specify the type of files to pick (e.g., images)
      });

      setDetailedInfo;(prevUploadInfo => {
        return prevUploadInfo.map((item, index) => {
          if (index === 2) { // Index 2 corresponds to the third item (0-based index)
              return { ...item, content: res[0].name }; // Update the content of the third item
          }
          return item; // Keep other items unchanged
        });
      });

      // Read the file content and convert it to base64
      const fileContent = await RNFS.readFile(res[0].uri, 'base64');
      setTimeFile(`data:${res.type};base64,${fileContent}`)
      console.log('success');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Handle other errors
      }
    }
  };

  return (
      <View style={styles.container}>
        <StatusBar 
            translucent backgroundColor="transparent"
        />
        <MHeader navigation={navigation} />
        <SubNavbar navigation={navigation} name={'ClientSignIn'}/>
        <ScrollView style={{width: '100%', marginTop: 140}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topView}>
            <Animated.View style={[styles.backTitle, {backgroundColor}]}>
              <Text style={styles.title}>AWARDED & COMPLETED SHIFTS</Text>
            </Animated.View>
            <View style={styles.bottomBar}/>
          </View>
          <Text style={styles.text}>All of your<Text style={{fontWeight: 'bold'}}>&nbsp;"AWARD"&nbsp;</Text> shifts will appear below. Once you have completed a shift, upload your timesheet and the shift status will update to <Text style={{fontWeight: 'bold'}}>&nbsp;"COMPLETE"&nbsp;</Text>.</Text>
          <View style={styles.imageButton}>
            <ImageButton title={"My Home"} onPress={() => handleNavigate('MyHome')} />
            <ImageButton title={"My Profile"} onPress={() => handleNavigate('MyProfile')} />
            <ImageButton title={"All Shift Listings"} onPress={() => handleNavigate('ShiftListing')} />
            <ImageButton title={"My Reporting"} onPress={() => handleNavigate('Reporting')} />
          </View>
          <View style={styles.profile}>
            <View style={styles.profileTitleBg}>
              <Text style={styles.profileTitle}>🖥️ MY SHIFTS</Text>
            </View>
            {/* <Text style={styles.name}>100 per page</Text> */}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={pageItems}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'100 per page'}
              // searchPlaceholder="Search..."
              value={value ? value : pageItems[3].value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <View
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
              {userInfos.map((it, idx) =>
                <View key={idx} style={styles.subBar}>
                  {it.map((item, index) => 
                    <View key={index} style={{flexDirection: 'row', width: '100%', gap: 10}}>
                      <Text style={[styles.titles, item.title=="JOB-ID" ? {backgroundColor: "#00ffff"} : {}]}>{item.title}</Text>
                      <Text style={[
                        styles.content, 
                        item.title == "JOB-ID" || item.title == "Status" ? {fontWeight: 'bold'} : {}
                      ]}>{item.content}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={[styles.edit, {marginTop: 15, backgroundColor: '#3d94f6', marginLeft: '20%'}]} onPress = {() => handleUploadEdit(it[0].content)}>
                    <Text style={{color: 'white'}}> Upload Timesheet</Text>
                  </TouchableOpacity>
                </View>)
              }
          </View>
        </ScrollView>
        {isModal && <Modal
          Visible={false}
          transparent= {true}
          animationType="slide"
          onRequestClose={() => {
            setModal(!isModal);
          }}
        >
          <StatusBar translucent backgroundColor='transparent' />
          <ScrollView style={styles.modalsContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.viewContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Add Hours</Text>
                <TouchableOpacity style={{width: 20, height: 20, }} onPress={toggleModal}>
                  <Image source = {images.close} style={{width: 20, height: 20,}}/>
                </TouchableOpacity>
              </View>
              <View style={styles.body}>
                <View style={[styles.profileTitleBg, {marginTop: 20, width: '40%'}]}>
                  <Text style={[styles.profileTitle, {textAlign: 'left'}]}>JOB DETAILS</Text>
                </View>
                <View style={styles.modalBody}>
                  {info.map((item, index) => 
                    <View key={index} style={{flexDirection: 'row', width: '100%', gap: 10}}>
                      <Text style={[styles.titles, {backgroundColor: '#f2f2f2', marginBottom: 5, paddingLeft: 2}]}>{item.title}</Text>
                      <Text style={styles.content}>{item.content}</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.profileTitleBg, {marginTop: 20}]}>
                  <Text style={styles.profileTitle}>ADD YOUR HOURS BELOW</Text>
                </View>
                <View style={styles.msgBar}>
                  <Text style={[styles.subtitle, {textAlign: 'left', marginTop: 10, fontWeight: 'bold'}]}>Select - "Clock In & Clock Out Times"</Text>
                  <View style ={styles.timeSheet}>
                    <TextInput
                      style={styles.inputs}
                      onChangeText={(e) => handleContent('startTime',e)}
                      value={content.startTime || ''}
                      multiline={true}
                      textAlignVertical="top"
                      placeholder=""
                    />
                    <Text style= {{height: 30}}>to</Text>
                    <TextInput
                      style={styles.inputs}
                      onChangeText={(e) => handleContent('endTime',e)}
                      value={content.endTime || ''}
                      multiline={true}
                      textAlignVertical="top"
                      placeholder=""
                    />
                  </View>
                </View>
                <View style={styles.msgBar}>
                  <Text style={[styles.subtitle, {textAlign: 'left', marginTop: 10, fontWeight: 'bold'}]}>Add Lunch</Text>
                  <View style ={styles.timeSheet}>
                    <TextInput
                      style={[styles.inputs, {width: '100%'}]}
                      onChangeText={(e) => handleContent('lunch',e)}
                      value={content.lunch || ''}
                      multiline={true}
                      textAlignVertical="top"
                      placeholder=""
                    />
                  </View>
                </View>
                <View style={styles.msgBar}>
                  <Text style={[styles.subtitle, {textAlign: 'left', marginTop: 10, fontWeight: 'bold'}]}>Hours Comments - "optional"</Text>
                  <View style ={styles.timeSheet}>
                    <TextInput
                      style={[styles.inputs, {width: '100%'}]}
                      onChangeText={(e) => handleContent('comments',e)}
                      value={content.comments || ''}
                      multiline={true}
                      textAlignVertical="top"
                      placeholder=""
                    />
                  </View>
                </View>
                <View style={[styles.btn, {marginTop: 20}]}>
                  <HButton style={styles.subBtn} onPress={ handleSubmit }>
                    Submit
                  </HButton>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>}
        
        {isUpload && <Modal
          Visible={false}
          transparent= {true}
          animationType="slide"
          onRequestClose={() => {
            setUpload(!isUpload);
          }}
        >
          <StatusBar translucent backgroundColor='transparent' />
          <ScrollView style={styles.modalsContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.viewContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Upload TimeSheet</Text>
                <TouchableOpacity style={{width: 20, height: 20, }} onPress={toggleUploadModal}>
                  <Image source = {images.close} style={{width: 20, height: 20,}}/>
                </TouchableOpacity>
              </View>
              <View style={styles.body}>
                <View style={styles.modalBody}>
                    <View style={{flexDirection: 'column', width: '100%', gap: 10}}>
                      <Text style={[styles.titles, {marginBottom: 5, lineHeight: 20, marginTop: 20, paddingLeft: 2}]}>{detailedInfos[0].title}</Text>
                      <Text style={[styles.content, {lineHeight: 20, marginTop: 0}]}>{detailedInfos[0].content}</Text>
                    </View>
                    <View style={{flexDirection: 'column', width: '100%', gap: 10}}>
                      <Text style={[styles.titles, {marginBottom: 5, lineHeight: 20, marginTop: 20, paddingLeft: 2}]}>{detailedInfos[1].title}</Text>
                      <Text style={[styles.content, {lineHeight: 20, marginTop: 0}]}>{detailedInfos[1].content}</Text>
                    </View>
                    <View style={{flexDirection: 'column', width: '100%', gap: 10}}>
                      <Text style={[styles.titles, {marginBottom: 5, lineHeight: 20, marginTop: 20, paddingLeft: 2}]}>{detailedInfos[2].title}</Text>
                      {detailedInfos[2].content && <Text style={[styles.content, {lineHeight: 20, marginTop: 0, color: 'blue', width: '100%'}]}>{detailedInfos[2].content}<Text style={{color: 'blue'}} onPress= {handleDelete}>&nbsp;&nbsp;remove</Text></Text>}
                    </View>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <TouchableOpacity title="Select File" onPress={()=>pickFile()} style={styles.chooseFile}>
                        <Text style={{fontWeight: '400', padding: 0, fontSize: 14}}>Choose File</Text>
                      </TouchableOpacity>
                      <TextInput
                        style={[styles.input, {width: '70%'}]}
                        placeholder=""
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={uploadInfo[2].content || ''}
                      />
                    </View>
                  {/* {uploadInfo.map((item, index) => 
                    <View key={index} style={{flexDirection: 'row', width: '100%', gap: 10}}>
                      <Text style={[styles.titles, {backgroundColor: '#f2f2f2', marginBottom: 5, paddingLeft: 2}]}>{item.title}</Text>
                      <Text style={styles.content}>{item.content}</Text>
                    </View>
                  )} */}
                  {/* <View style={styles.email}>
                    <Text style={styles.subtitle}> Healthcare License</Text>
                    {credentials.healthcareLicense &&
                    <View style={{marginBottom: 10}}>
                      <Image
                        style={{ width: 100, height: 100,  }}
                        source={{ uri: `${credentials.healthcareLicense}` }}
                      />
                      <Text style={{color: '#0000ff', textDecorationLine: 'underline'}}
                        onPress = {()=>handleRemove('healthcareLicense')}
                      >remove</Text>
                    </View>}
                    
                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <TouchableOpacity title="Select File" onPress={()=>pickFile('healthcareLicense')} style={styles.chooseFile}>
                        <Text style={{fontWeight: '400', padding: 0, fontSize: 14}}>Choose File</Text>
                      </TouchableOpacity>
                      <TextInput
                        style={[styles.input, {width: '70%'}]}
                        placeholder=""
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={photoName.healthcareLicense || ''}
                      />
                    </View>
                  </View> */}
                </View>
                <View style={[styles.btn, {marginTop: 20}]}>
                  <HButton style={styles.subBtn} onPress={() => handleUploadSubmit(detailedInfos[0].id) }>
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
    width: '100%',
    height: '55',
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
  profile: {
    marginTop: 20,
    width: '84%',
    marginLeft: '7%',
    padding: 20,
    backgroundColor: '#c2c3c42e',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#b0b0b0',
    marginBottom: 100
    // elevation: 1,
    // // shadowColor: 'rgba(0, 0, 0, 0.4)',
    // // shadowOffset: { width: 1, height: 1 },
    // shadowRadius: 0,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 30,
    width: '35%'
  },
  content: {
    fontSize: 16,
    lineHeight: 30,
    width: '60%'
  },
  profileTitleBg: {
    backgroundColor: '#BC222F',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '10%',
    marginBottom: 20
  },
  profileTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 14,
    marginVertical: 10,
  },
  edit: {
    backgroundColor: '#22138e',
    padding: 5,
    borderRadius: 10,
    fontWeight: 'bold',
    color: 'white',
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  subBar: {
    width: '100%',
    backgroundColor: "#f0fbfe",
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#c6c5c5",
    marginBottom: 10
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
  dropdown: {
    height: 40,
    width: '60%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
    height: 30,
    width: '40%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 5
  },
  btn: {flexDirection: 'column',
    gap: 20,
    marginBottom: 30,
  },
  subBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#447feb',
    color: 'black',
    fontSize: 16,
  },
  timeSheet: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white', 
    height: 30, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: 'hsl(0, 0%, 86%)',
    paddingVertical: 5
  },
  chooseFile: {
    width: '30%', 
    height: 30, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: 'black',
  },
});
  