import React, { useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, FlatList, Dimensions, Modal, TextInput, View, Image, Animated, StyleSheet, ScrollView, StatusBar, Easing, TouchableOpacity } from 'react-native';
import { Text, PaperProvider, DataTable, useTheme } from 'react-native-paper';
import images from '../../assets/images';
import { useNavigation, useRoute } from '@react-navigation/native';
import HButton from '../../components/Hbutton'
import MFooter from '../../components/Mfooter';
import MHeader from '../../components/Mheader';
import SubNavbar from '../../components/SubNavbar';
import ImageButton from '../../components/ImageButton';
import { Table, Row, Rows } from 'react-native-table-component';
import { useAtom } from 'jotai';
import { firstNameAtom, emailAtom, userRoleAtom, entryDateAtom, phoneNumberAtom, addressAtom } from '../../context/ClinicalAuthProvider';
// import MapView from 'react-native-maps';
import * as Progress from 'react-native-progress';
import { Jobs } from '../../utils/useApi';
import { Dropdown } from 'react-native-element-dropdown';

export default function AllCaregivers({ navigation }) {

  //---------------------------------------Animation of Background---------------------------------------
  const [backgroundColor, setBackgroundColor] = useState('#0000ff'); // Initial color
  let colorIndex = 0;
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      if (colorIndex >= 0.9) {
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

  const tableHead = [
    'Entry Date',
    'Name',
    'Phone',
    'Degree/Discipline',
    'Email',
    'View Shifts/Profile',
    'Verification',
    'User Status',
    'Awarded',
    'Applied for',
    'Ratio',
    'P.W.',
  ];
  const tableData = [
    [ '07/23/2024', 'Mariah Smith', '(716) 292-2405', 'LPN', '	mariahsmith34@gmail.com', 'View Here', 'View Here', 'activate', '', '', '', 'Reset'],
    [ '07/23/2024', 'Mariah Smith', '(716) 292-2405', 'LPN', '	mariahsmith34@gmail.com', 'View Here', 'View Here', 'activate', '', '', '', 'Reset'],
  ]

  useEffect(() => {
    // async function getData() {
    //   let Data = await Jobs('jobs', 'Facilities');
    //   if(!Data) {
    //     setData(['No Data'])
    //   }
    //   else {
    //     setData(Data)
    //   }
    //   // console.log('--------------------------', data);
    //   // // setTableData(Data[0].degree)
    //   // tableScan(Data);
    // }
    // getData();
    // tableData = tableScan(Data);
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

  //---------------DropDown--------------
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
  
  const Item0 = [
    {label: 'Entry Date', value: '1'},
    {label: 'Name', value: '2'},
  ]

  const Item1 = [
    {label: 'Entry Date', value: '1'},
    {label: 'Name', value: '2'},
    {label: 'Photo', value: '3'},
    {label: 'Degree/Discipline', value: '4'},
    {label: 'Email', value: '5'},
    {label: 'User Status', value: '6'},
    {label: 'Total Awarded', value: '7'},
    {label: 'Total Bids / Offers', value: '8'},
    {label: 'Bid to Awarded Ratio', value: '9'},
  ]

  const Item2 = [
    {label: 'is', value: '1'},
    {label: 'is not', value: '2'},
    {label: 'is during the current', value: '3'},
    {label: 'is during the previous', value: '4'},
    {label: 'is during the next', value: '5'},
    {label: 'is before the previous', value: '6'},
    {label: 'is after the next', value: '7'},
    {label: 'is before', value: '8'},
    {label: 'is after', value: '9'},
    {label: 'is today', value: '10'},
    {label: 'is today or before', value: '11'},
    {label: 'is today or after', value: '12'},
    {label: 'is before today', value: '13'},
    {label: 'is after today', value: '14'},
    {label: 'is before current time', value: '15'},
    {label: 'is after current time', value: '16'},
    {label: 'is blank', value: '17'},
    {label: 'is not blank', value: '18'},
  ]

  const [itemValue1, setItemValue1] = useState([null,]);
  const [isItemFocus1, setIsItemFocus1] = useState([false,]);

  const renderItemLabel1 = (idx) => {
    if (itemValue1[idx] || isItemFocus1[idx]) {
      return (
        <Text style={[styles.label, isItemFocus1[idx] && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const [itemValue2, setItemValue2] = useState([null]);
  const [isItemFocus2, setIsItemFocus2] = useState([false]);

  const renderItemLabel2 = (idx) => {
    if (itemValue2[idx] || isItemFocus2[idx]) {
      return (
        <Text style={[styles.label, isItemFocus2[idx] && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const [itemValue3, setItemValue3] = useState([null,]);
  const [isItemFocus3, setIsItemFocus3] = useState([false,]);

  const renderItemLabel3 = (idx) => {
    if (itemValue1[idx] || isItemFocus1[idx]) {
      return (
        <Text style={[styles.label, isItemFocus3[idx] && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const handleRowClick = (rowData, rowID) => {
    // Handle row click event here
    console.log('Row clicked:', rowData, rowID);
  };
  const [showFilterModal, setShowFilterModal] = useState(false);
  const handleFilter = () => {
    setShowFilterModal(true);
    console.log(isItemFocus1[0],)
  }

  const [filterArray, setFilterArray] = useState([0])

  const myRenderItem = ({ item, index }) => {
    return (
      <View key={index}>
        {index !== 0 && <Dropdown
          style={[styles.dropdown, {width: '100%', marginTop: 10}, isItemFocus1[index] && { borderColor: 'blue' }]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Item0}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'100 per page'}
          // searchPlaceholder="Search..."
          value={itemValue1}
          onFocus={() => setIsItemFocus1(
            setIsItemFocus1(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = false;
              return updatedArray;
            })
          )}
          onBlur={() => setIsItemFocus1(
            setIsItemFocus1(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = false;
              return updatedArray;
            })
          )}
          onChange={item => {
            setItemValue1(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = item.value;
              return updatedArray;
            });
            setIsItemFocus1(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = false;
              return updatedArray;
            });
          }}
          renderLeftIcon={() => (
            <View
              style={styles.icon}
              // color={isItemFocus[index] ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />}
        
        <Dropdown
          style={[styles.dropdown, {width: '100%', marginTop: 10}, (isItemFocus2 && isItemFocus2[0]) && { borderColor: 'blue' }]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Item1}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={''}
          // searchPlaceholder="Search..."
          value={1}
          onFocus={() => setIsItemFocus2(
            setIsItemFocus2(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = true;
              return updatedArray;
            }),
            console.log(isItemFocus2[index])
          )}
          onBlur={() => setIsItemFocus2(
            setIsItemFocus2(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = false;
              return updatedArray;
            })
          )}
          onChange={item => {
            setItemValue2(prevState => {
              const updatedArray = [...prevState];
              if (updatedArray) {
                updatedArray[index] = item.value;
                // console.log('uuuuddd', item.value, index)
                return updatedArray;
              }
              return prevState;
            });
          
            setIsItemFocus2(prevState => {
              const updatedArray = [...prevState];
              if (updatedArray) {
                updatedArray[index] = false;
                return updatedArray;
              }
              return prevState;
            });
            console.log('update',itemValue2);
          }}
          renderLeftIcon={() => (
            <View
              style={styles.icon}
              // color={isItemFocus[index] ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
        
        {/* <Dropdown
          style={[styles.dropdown, {width: '100%', marginTop: 10}, isItemFocus3[index] && { borderColor: 'blue' }]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Item2}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={''}
          // searchPlaceholder="Search..."
          value={itemValue3}
          onFocus={() => setIsItemFocus3(
            setIsItemFocus3(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = false;
              return updatedArray;
            })
          )}
          onBlur={() => setIsItemFocus3(
            setIsItemFocus3(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = false;
              return updatedArray;
            })
          )}
          onChange={item => {
            setItemValue3(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = item.value;
              return updatedArray;
            });
            setIsItemFocus3(prevState => {
              const updatedArray = [...prevState];
              updatedArray[index] = false;
              return updatedArray;
            });
          }}
          renderLeftIcon={() => (
            <View
              style={styles.icon}
              // color={isItemFocus[index] ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        /> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent backgroundColor="transparent"
      />
      <MHeader navigation={navigation} />
      <SubNavbar navigation={navigation} name={"AdminLogin"}/>
      <ScrollView style={{ width: '100%', marginTop: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topView}>
          <Animated.View style={[styles.backTitle, { backgroundColor }]}>
            <Text style={styles.title}>COMPANY JOBS / SHIFTS</Text>
          </Animated.View>
          <View style={styles.bottomBar} />
        </View>
        <View style={styles.profile}>
          <Text style={{ backgroundColor: '#000080', color: 'white', width: '26%' }}>TOOL TIPS:</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'black', width: 4, height: 4, borderRadius: 2, marginTop: 20 }} />
            <Text style={[styles.text, { textAlign: 'left', marginTop: 10 }]}>When A New <Text style={{ fontWeight: 'bold' }}>"CAREGIVER"</Text> signs-up, they will have a status of <Text style={{ color: 'blue', fontWeight: 'bold' }}>"PENDING APPROVAL"</Text> </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'black', width: 4, height: 4, borderRadius: 2, marginTop: 20 }} />
            <Text style={[styles.text, { textAlign: 'left', marginTop: 10 }]}>Once you have verified the <Text style={{ fontWeight: 'bold' }}>CAREGIVERS</Text> information, update the status to <Text style={{ color: 'green', fontWeight: 'bold' }}>"ACTIVE".</Text></Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'black', width: 4, height: 4, borderRadius: 2, marginTop: 20 }} />
            <Text style={[styles.text, { textAlign: 'left', marginTop: 10 }]}>The CAREGIVER will receive an Approval email, and can then login to view Jobs / Shifts</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: 'black', width: 4, height: 4, borderRadius: 2, marginTop: 20 }} />
            <Text style={[styles.text, { textAlign: 'left', marginTop: 10 }]}>To Deactivate a <Text style={{ fontWeight: 'bold' }}>"CAREGIVER"</Text> change the status to <Text style={{ color: 'red', fontWeight: 'bold' }}>"INACTIVE"</Text></Text>
          </View>
        </View>
        <View>
          <View style={styles.body}>
            <View style={styles.bottomBar} />
            <View style={styles.modalBody}>
              <View style={[styles.profileTitleBg, { marginLeft: 0, marginTop: 30 }]}>
                <Text style={styles.profileTitle}>ALL CAREGIVERS</Text>
              </View>
              <View style={styles.searchBar}>
                <TouchableOpacity style={styles.filterBtn} onPress={handleFilter}>
                  <Image source={images.filter} style={{width: 20, height: 20}} />
                  <Text style={styles.filterText}>Add filters</Text>
                </TouchableOpacity>
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
              </View>
              <ScrollView horizontal={true} style={{ width: '95%', borderWidth: 1, marginBottom: 30, borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                <TouchableWithoutFeedback onPress={() => handleRowClick(tableData, rowID)}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                    <Row
                      data={tableHead}
                      style={styles.head}
                      widthArr={[100, 100, 130, 130, 150, 120, 100, 120, 80, 100, 80, 100]}
                      textStyle={styles.tableText}
                    />
                    <Rows
                      data={tableData}
                      style = {{backgroundColor: '#E2E2E2'}}
                      widthArr={[100, 100, 130, 130, 150, 120, 100, 120, 80, 100, 80, 100]}
                      textStyle={styles.tableText}
                    />
                  </Table>
                </TouchableWithoutFeedback>
              </ScrollView>
              {showFilterModal && <Modal
                Visible={false}
                transparent= {true}
                animationType="slide"
                onRequestClose={() => {
                  setShowFilterModal(!showFilterModal);
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.calendarContainer}>
                    <View style={styles.header}>
                      <Text style={styles.headerText}>Add Filters</Text>
                      <TouchableOpacity style={{width: 20, height: 20, }} onPress={()=>setShowFilterModal(!showFilterModal)}>
                        <Image source = {images.close} style={{width: 20, height: 20,}}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                      <View style={[styles.modalBody, {backgroundColor: 'transparent'}]}>
                        {/* <View style={styles.searchBar}>
                          <TextInput style={styles.searchText} /> */}
                          {/* <TouchableOpacity style={styles.searchBtn}> */}
                            <Text>Where</Text>
                          {/* </TouchableOpacity>
                        </View> */}
                        <View style={{width: '90%', marginBottom: 30}}>
                          <FlatList
                            data={filterArray}
                            renderItem={myRenderItem}
                            keyExtractor={(item) => item}
                          />
                        </View>
                      </View>
                        <View style={styles.filter}>
                          <TouchableOpacity style= {styles.filterBtn} onPress={handleFilter}>
                            <Image source={images.plus} style={{width: 20, height: 20}} />
                            <Text style={styles.filterText}>Add filters</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                  </View>
                </View>
              </Modal>}
            </View>
          </View>

        </View>
      </ScrollView>
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
    width: '100%',
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginBottom: 100
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
    alignItems: 'flex-start',
    marginTop: 30,
    paddingLeft: '5%'
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '95%',
  },
  searchText: {
    width: '70%',
    backgroundColor: 'white',
    height: 30,
  },
  searchBtn: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: '#2a53c1',
    height: 30
  },
  filter: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  filterBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    gap: 5,
    height: 30
  },
  filterText: {
    color: '#2a53c1',
  },
  subBtn: {
    backgroundColor: '#194f69',
    borderColor: '#ffaa22',
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    gap: 10,
    flexDirection: 'row'
  },
  head: {
    backgroundColor: '#7be6ff4f',
    // width: 2000,
    height: 40,
  },
  tableText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  dropdown: {
    height: 30,
    width: '50%',
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
});
