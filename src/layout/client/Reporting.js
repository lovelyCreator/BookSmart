import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Modal, TextInput, View, Image, Animated, StyleSheet, ScrollView, StatusBar, Easing, TouchableOpacity } from 'react-native';
import { Text, PaperProvider, DataTable, useTheme } from 'react-native-paper';
import images from '../../assets/images';
import  { useNavigation, useRoute } from '@react-navigation/native';
import HButton from '../../components/Hbutton'
import MFooter from '../../components/Mfooter';
import MHeader from '../../components/Mheader';
import SubNavbar from '../../components/SubNavbar';
import ImageButton from '../../components/ImageButton';
import { useAtom } from 'jotai';
import { firstNameAtom, emailAtom, userRoleAtom, entryDateAtom, phoneNumberAtom, addressAtom } from '../../context/ClinicalAuthProvider';
// import MapView from 'react-native-maps';
import * as Progress from 'react-native-progress';

export default function Reporting ({ navigation }) {
  //---------------------------------------Animation of Background---------------------------------------
  const [backgroundColor, setBackgroundColor] = useState('#0000ff'); // Initial color
  let colorIndex = 0;

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

  const data = [
    { id: 'header', text1: 'Month', text2: 'Count' },
    { id: '1', text1: '07/24', text2: "1" },
    // Add more data as needed
    { id: 'footer', text1: 'Sum', text2: "1" },
  ];

  const myShiftDate = [
    {id: 'header', text1: 'Job-ID', text2: 'Job Status', text3: 'Unit', text4: 'Shift'},
    {id: '1', text1: '405', text2: 'Pending - Completed Verification', text3: '', text4: ''},
  ]

  const [showModal, setShowModal] = useState(false);
  
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.row, {paddingHorizontal: 0}, index % 2 === 0 ? styles.evenRow : null]}>
        <Text style={{width: '50%', textAlign: 'center', fontWeight: 'bold'}}>{item.text1}</Text>
        <View style={{width: 1, height: 40, backgroundColor: 'hsl(0, 0%, 86%)', position: 'absolute', left: '50%'}} />
        <Text style={[{width: '50%', textAlign: 'center'}, index == 0 ? {fontWeight: 'bold'}: {fontWeight: '400'}]} onPress={() => handleClick(item.id)}>{item.text2}</Text>
      </View>
    );
  };

  const myRenderItem = ({ item, index }) => {
    return (
      <View key={index} style={[styles.row, index % 2 === 0 ? styles.evenRow : null, ]}>
        <Text style={{width: '20%', textAlign: 'center', fontWeight: 'bold'}}>{item.text1}</Text>
        <View style={{width: 1, height: '200%', backgroundColor: 'hsl(0, 0%, 86%)', position: 'absolute', left: '25%'}} />
        <Text style={[{width: '40%', textAlign: 'center'}, index == 0 ? {fontWeight: 'bold'}: {fontWeight: '400'}]}>{item.text2}</Text>
        <View style={{width: 1, height: '200%', backgroundColor: 'hsl(0, 0%, 86%)', position: 'absolute', left: '65%' }} />
        <Text style={[{width: '20%', textAlign: 'center'}, index == 0 ? {fontWeight: 'bold'}: {fontWeight: '400'}]}>{item.text3}</Text>
        <View style={{width: 1, height: '200%', backgroundColor: 'hsl(0, 0%, 86%)', position: 'absolute', left: '85%'}} />
        <Text style={[{width: '20%', textAlign: 'center'}, index == 0 ? {fontWeight: 'bold'}: {fontWeight: '400'}]}>{item.text4}</Text>
      </View>
    );
  };

  const handleClick = (id) => {
    if (id !== 'header' && id !== 'footer')
      toggleModal();
  }
  
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const handleFilter = () => {

  }

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
              <Text style={styles.title}>CAREGIVER REPORTING</Text>
            </Animated.View>
            <View style={styles.bottomBar}/>
          </View>
          <View style={styles.imageButton}>
            <ImageButton title={"My Home"} onPress={() => handleNavigate('MyHome')} />
            <ImageButton title={"My Profile"} onPress={() => handleNavigate('MyProfile')} />
            <ImageButton title={"All Shift Listings"} onPress={() => handleNavigate('ShiftListing')} />
            <ImageButton title={"My Shifts"} onPress={() => handleNavigate('Shift')} />
          </View>
          <View style={styles.profile}>
            <View style={styles.profileTitleBg}>
              <Text style={styles.profileTitle}>MY SHIFTS BY MONTH</Text>
            </View>
            <Text style={styles.name}>"Click On Any Value To View Details"</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
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
                <View style={styles.header}>
                  <Text style={styles.headerText}>Modal Header</Text>
                  <TouchableOpacity style={{width: 20, height: 20, }} onPress={toggleModal}>
                    <Image source = {images.close} style={{width: 20, height: 20,}}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.body}>
                  <View style={styles.modalBody}>
                    <View style={styles.searchBar}>
                      <TextInput style={styles.searchText} />
                      <TouchableOpacity style={styles.searchBtn}>
                        <Text>Search</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.filter}>
                      <TouchableOpacity style= {styles.filterBtn} onPress={handleFilter}>
                        <Image source={images.filter} style={{width: 20, height: 20}} />
                        <Text style={styles.filterText}>Add filters</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{width: '90%', marginBottom: 30}}>
                      <FlatList
                        data={myShiftDate}
                        renderItem={myRenderItem}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
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
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#22138e',
    fontWeight: 'bold',
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'hsl(0, 0%, 86%)',
    // height: 40,
    position: 'relative',
    backgroundColor: 'white',
    width: '100%',
  },
  evenRow: {
    backgroundColor: '#7be6ff4f', // Set the background color for even rows
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
    paddingBottom: 30
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    elevation: 5,
    width: '80%',
    // height: '43%',
    marginLeft: '20',
    flexDirection: 'flex-start',
    borderWidth: 3,
    borderColor: '#7bf4f4',
  },
  modalBody: {
    backgroundColor: 'rgba(79, 44, 73, 0.19)',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    margin: 10
  },
  searchText: {
    width: '70%',
    backgroundColor: 'white',
    height: 30,
  },
  searchBtn: {
    width: '30%',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: '#2a53c1',
    height: 30
  },
  filter: {
    width: '90%',
    display:'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  filterBtn: { 
    backgroundColor: 'rgba(0, 0, 0, 0.08)', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems:'center',
    padding: 5,
    gap: 5
  },
  filterText: {
    color: '#2a53c1',
  }
});
  