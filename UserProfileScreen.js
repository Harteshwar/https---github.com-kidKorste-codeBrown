import React , { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Card from './Card';
import { getAuth,signOut } from 'firebase/auth';
import { PropTypes } from 'prop-types';
import { doc, getDoc } from '@firebase/firestore';
import { db } from "./firebaseConfig";
import { Alert } from 'react-native';


const UserProfileScreen = ({ navigation }) => {
  // Need these to work with the useEffect
  const [fName, setFName] = useState(''); 
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const auth = getAuth();         // Set observer on Auth object,
  const user = auth.currentUser;  // Get the current user to display their info
  
  
  // Get data from firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the doc
        const docRef = doc(db, 'USERS', user.email);  
        const docSnap = await getDoc(docRef);         
        // Get each field
        setFName(docSnap.data().firstName);
        setLName(docSnap.data().lastName);
        setEmail(docSnap.data().email);
        setPhone(docSnap.data().phoneNumber);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    fetchUserData();
  }, []);  // Empty dependency array means this effect runs once after the initial render
    
  const editProfile = () => {
    navigation.navigate('EditProfileScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.content}>

          <View style={styles.routeContainer} marginTop={16}> 
            <Text style={styles.routeText}>
              <Text style={styles.routeLabel}>First Name:</Text> {fName} 
            </Text>
            <Text style={styles.routeText}>
              <Text style={styles.routeLabel}>Last Name:</Text> {lName} 
            </Text>
            <Text style={styles.routeText}>
              <Text style={styles.routeLabel}>Email:</Text> {email} 
            </Text>
            <Text style={styles.routeText}>
              <Text style={styles.routeLabel}>Phone:</Text> {phone} 
            </Text>
          </View>  

          <TouchableOpacity style={styles.startButton} onPress={editProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

        </View> 
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:30,
  }, 
  editButton: {
    backgroundColor: "#e74c3c", // Deep orange color
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 100,
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
})

// fixed ['navigation.navigate' is missing in props validationeslintreact/prop-types] error
UserProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserProfileScreen;