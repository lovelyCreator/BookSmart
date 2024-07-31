import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet, ScrollView, StatusBar, Easing, TouchableOpacity } from 'react-native';
import { Text, PaperProvider, DataTable, useTheme } from 'react-native-paper';
import images from '../../assets/images';
import  { useNavigation, useRoute } from '@react-navigation/native';
import HButton from '../../components/Hbutton'
import MFooter from '../../components/Mfooter';
import MHeader from '../../components/Mheader';
import SubNavbar from '../../components/SubNavbar';
import ImageButton from '../../components/ImageButton';
import { Table, Row, Rows } from 'react-native-table-component';
import { useAtom } from 'jotai';
import { firstNameAtom, lastNameAtom, userRoleAtom } from '../../context/AdminAuthProvider';
// import MapView from 'react-native-maps';

export default function AdminDashboard ({ navigation }) {
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
  
  const [myJobInfo, setMyJobInfo] = useState({
    totalJob: 0,
    totalAvailable: 0,
    totalAwarded: 0,
    totalCompleted: 0,
    totalCanceled: 0,
  })

  const [jobInfo, setJobInfo] = useState([
    {title: 'TOT. - JOBS / SHIFTS', content: myJobInfo.totalJob},
    {title: 'TOT. - AVAILABLE', content: myJobInfo.totalAvailable},
    {title: 'TOT. - AWARDED', content: myJobInfo.totalAwarded},
    {title: 'TOT. - COMPLETED', content: myJobInfo.totalCompleted},
    {title: 'TOT. - CANCELED', content: myJobInfo.totalCanceled},
  ])

  const tableHead1 = [
    'Job Status',
    'Count',
  ];
  const tableHead2 = [
    'Nurse',
    'Count',
  ];
  const tableHead3 = [
    'Month',
    'Count',
  ];

  const tableData1 = [
    ['Available',116],
    ['Awarded',53],
    ['Cancelled',2],
    ['Paid',5],
    ['Pending Verification',5],
    ['Verified',1],
    ['Pending - Completed Verification',10],
    ['Shift Verified',4],
    ['Sum',196],
  ]

  const tableDatas = [
    {
      title: 'JOBS / SHIFTS BY STATUS',
      header: [
        'Job Status',
        'Count',
      ],
      data: [
        ['Available',116],
        ['Awarded',53],
        ['Cancelled',2],
        ['Paid',5],
        ['Pending Verification',5],
        ['Verified',1],
        ['Pending - Completed Verification',10],
        ['Shift Verified',4],
      ],
      final: ['Sum',196],
    },
    {
      title: 'JOBS / SHIFTS BY NURSE',
      header: [
        'Nurse',
        'Count',
      ],
      data: [
        ['Aleigha Simmons',0],
        ['alexis jefferds',6],
        ['Alma Rhodes',0],
        ['Ashley Papelian',0],
        ['Barbara Hawkins',0],
        ['Brian Test',1],
        ['Dale',1],
        ['Daniel Graves',0],
        ['diamond dowell',0],
        ['Elizabeth Gard',0],
        ['Elizabeth Gard',0],
        ['Erin Fehmer',45],
        ['Farkhanda Bhatti',0],
        ['Hope Hopkins',0],
        ['Jane Maurice',1],
        ['Jasmine Hall',0],
        ['Jasmine White',0],
        ['Jessica Provost',0],
        ['Joan Dixon',0],
        ['Joan Wilson',0],
        ['Jon Savino',0],
        ['Jona Diaz',0],
        ['Jules Smith',0],
        ['Kayleigh Weselak',0],
        ['Kayleigh Weselak',0],
        ['Kiyomi Hayes',0],
        ['Kristin Zbytniewski',0],
        ['LaDiamond Anderson',11],
        ['Mariah Smith',0],
        ['Mary Watson',0],
        ['Mary Wills',2],
        ['Melvin Gray McKnight',0],
      ],
      final: ['Sum',196],
    },
    {
      title: 'JOBS / SHIFTS BY MONTH',
      header: [
        'Month',
        'Count',
      ],
      data: [
        ['07/24',163],
        ['06/24',33],
      ],
      final: ['Sum',196],
    }
  ]

  const theme = useTheme();
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastNameAtom] = useAtom(lastNameAtom);
  const [userRole, setUserRole] = useAtom(userRoleAtom);

  const userInfo = [
    {title: 'Name', content: firstName + " "+lastName},
    {title: 'User Roles', content: userRole},
  ]
  

  return (
      <View style={styles.container}>
        <StatusBar 
            translucent backgroundColor="transparent"
        />
        <MHeader navigation={navigation} />
        <SubNavbar navigation={navigation} name={"AdminLogin"}/>
        <ScrollView style={{width: '100%', marginTop: 119}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topView}>
            <Animated.View style={[styles.backTitle, {backgroundColor}]}>
              <Text style={styles.title}>ADMIN DASHBOARD</Text>
            </Animated.View>
            <View style={styles.bottomBar}/>
          </View>
          <View style={{paddingVertical: 40, backgroundColor: '#c6c5c5', marginTop: 20, width: '80%', marginLeft: '10%', borderRadius: 10}}>
            {
              jobInfo.map((item, index) => 
                <View key={index} style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text style={styles.titles}>{item.title}</Text>
                  <Text style={styles.content}>
                    {item.content}
                  </Text>
                </View>
              )
            }
          </View>
          {tableDatas.map((item, index)=> 
            <View style={{paddingVertical: 40, backgroundColor: '#c6c5c5', marginTop: 20, width: '80%', marginLeft: '10%', borderRadius: 10, display: 'flex', alignItems:'center'}}>
              <View style={styles.profileTitleBg}>
                <Text style={styles.profileTitle}>{item.title}</Text>
              </View>
              <Text style={styles.Italic}>"Click On Any Value To View Details"</Text>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.08)', width: 300, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Row
                    data={item.header}
                    style={styles.head}
                    widthArr={[200,80]}
                    textStyle={[styles.tableText, { marginTop: 0 }]}
                  />
                  <Rows
                    data={item.data}
                    widthArr={[200,80]}
                    style = {{backgroundColor: '#E2E2E2'}}
                    textStyle = {[styles.tableText, { marginTop: 0 }]}
                  />
                  <Row
                    data={item.final}
                    style={styles.head}
                    widthArr={[200,80]}
                    textStyle={[styles.tableText, { marginTop: 0 }]}
                  />
                </Table>
              </View>
            </View>
          )}
          <View style = {{height: 100}}/>
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
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center'
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
  titles: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 40,
    textAlign: 'center',
    color: 'white',
    padding: 5,
    width: '60%',
    backgroundColor: "#2243f3", 
    borderRadius: 10
  },
  content: {
    fontSize: 16,
    lineHeight: 40,
  },
  profileTitleBg: {
    backgroundColor: '#BC222F',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    // marginLeft: '10%',
    marginBottom: 20
  },
  profileTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  Italic: {
    fontStyle: 'italic',
    color: '#0000ff',
    // marginLeft: '10%',
    marginBottom: 20, 
  },
  head: {
    backgroundColor: '#7be6ff4f',
    // width: 2000,
    height: 40,
  },
  tableText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    width: '100%',
    color: 'black',
    textAlign: 'center'
  }
});
  