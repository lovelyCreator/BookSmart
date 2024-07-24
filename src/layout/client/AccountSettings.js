import React, { useEffect, useState } from 'react';
import { Alert, View, TextInput, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Text, PaperProvider, DataTable } from 'react-native-paper';
import images from '../../assets/images';
import  { useNavigation, useRoute } from '@react-navigation/native';
import HButton from '../../components/Hbutton'
import MFooter from '../../components/Mfooter';
import MHeader from '../../components/Mheader';
import SubNavbar from '../../components/SubNavbar';
import ImageButton from '../../components/ImageButton';
import { useAtom } from 'jotai';
import { firstNameAtom, lastNameAtom, emailAtom, passwordAtom } from '../../context/ClinicalAuthProvider';


export default function AccountSettings ({ navigation }) {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const handleNavigate = (navigateUrl) => {
      navigation.navigate(navigateUrl);
  }
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  
  // const userInfo = [
  //   {title: 'Name', content: firstName},
  //   {title: 'Email', content: email},
  //   {title: 'User Roles', content: userRole},
  //   {title: 'Caregiver', content: caregiver},
  // ]

  const [credentials, setCredentials] = useState(
    {
      firstName: 'Dale',
      lastName: '',
      email: '',
      password: ''
    }
  );

  const handleCredentials = (target, e) => {
    setCredentials({...credentials, [target]: e})
    console.log(credentials)
  }

  const handleSubmit = () => {
    console.log('email: ', email)
  }

  const showAlert = () => {
    Alert.alert(
      'Warning!',
      "The Password doesn't matched. Please try again.",
      [
        {
          text: 'OK',
          onPress: () => {
            setPassword('');
            setConfirmPassword('');
            console.log('OK pressed')
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  const handlePassword = () => {
    if (password !== confirmPassword ) {
      showAlert();
    }
    else {
      setPassword('password', password);
    }
  }

  const handlePasswordSubmit = () => {

  }
  return (
      <View style={styles.container}>
        <StatusBar 
          translucent backgroundColor="transparent"
        />
        <MHeader navigation={navigation} />
        <SubNavbar navigation={navigation} />
        <ScrollView style={{width: '100%', marginTop: 139}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.authInfo}>
            <Text style={styles.subject}> Account Settings </Text>
            <View style={styles.email}>
              <Text style={styles.subtitle}> Name <Text style={{color: 'red'}}>*</Text> </Text>
              <View style={{flexDirection: 'row', width: '100%', gap: 5}}>
                <TextInput
                  style={[styles.input, {width: '50%'}]}
                  placeholder="First"
                  onChangeText={e => handleCredentials('firstName', e)}
                  value={credentials.firstName || ''}
                />
                <TextInput
                  style={[styles.input, {width: '50%'}]}
                  placeholder="Last"
                  onChangeText={e => handleCredentials('lastName', e)}
                  value={credentials.lastName || ''}
                />
              </View>
            </View>
            <View style={styles.email}>
              <Text style={styles.subtitle}> Email <Text style={{color: 'red'}}>*</Text> </Text>
              <View style={{flexDirection: 'row', width: '100%', gap: 5}}>
                <TextInput
                  style={[styles.input, {width: '100%'}]}
                  placeholder=""
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={e => handleCredentials('email', e)}
                  value={credentials.email || ''}
                />
              </View>
            </View>
            <View style={[styles.btn, {marginTop: 20}]}>
              <HButton style={styles.subBtn} onPress={ handleSubmit }>
                Submit
              </HButton>
            </View>
          </View>
          <View style={[styles.authInfo, {marginBottom: 100}]}>
            <Text style={[styles.subject, {marginVertical: 10, marginTop: 20}]}> Change Password </Text>
            <View style={styles.email}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{
                  marginBottom: 10, 
                  // width: 140, 
                  fontSize: 16, 
                  fontWeight: 'bold', 
                  color: 'black'}}> 
                  Password
                </Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                style={[styles.input, {width: '100%'}]}
                placeholder=" Current Password"
                onChangeText={e => setCurrentPassword(e)}
                value={currentPassword || ''}
              />
            </View>
            <View style={styles.email}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{
                  marginBottom: 10, 
                  // width: 140, 
                  fontSize: 16, 
                  fontWeight: 'bold', 
                  color: 'black'}}> 
                  New Password
                </Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                style={[styles.input, {width: '100%'}]}
                placeholder="Password"
                onChangeText={e => handleCredentials('password', e)}
                value={credentials.password || ''}
              />
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                style={[styles.input, {width: '100%'}]}
                placeholder="Confirm Password"
                onChangeText={e => setConfirmPassword(e)}
                onSubmitEditing={handlePassword} // This handles the "Enter" key press event
                value={confirmPassword || ''}
              />
            </View>
            <View style={[styles.btn, {marginTop: 20}]}>
              <HButton style={styles.subBtn} onPress={ handlePasswordSubmit }>
                Submit
              </HButton>
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
  mark: {
    width:225,
    height: 68,
    marginBottom: 30
  },
  bottomBar: {
    height: 5,
    backgroundColor: '#C0D1DD',
    width: '100%'
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
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
    borderColor: '#b0b0b0',
    // elevation: 1,
    // // shadowColor: 'rgba(0, 0, 0, 0.4)',
    // // shadowOffset: { width: 1, height: 1 },
    // shadowRadius: 0,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 40,
    width: '40%'
  },
  content: {
    fontSize: 16,
    width: '60%',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white', 
    height: 30, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: 'hsl(0, 0%, 86%)',
    paddingVertical: 5
  },
  subject: {
    borderRadius: 2,
    borderColor: 'black',
    width: '90%',
    color: 'black',
    marginTop: 30,
    fontSize: 24,
    borderRadius: 5,
  },
  email: {
    width: '90%',
  },
  authInfo: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {flexDirection: 'column',
    gap: 20,
    marginBottom: 30,
    width: '90%'
  },
  subBtn: {
    marginTop: 0,
    padding: 10,
    backgroundColor: '#447feb',
    color: 'black',
    fontSize: 16,
  },
});
  