import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
// Form Validation
import * as Yup from 'yup'
import { Formik, validateYupSchema } from 'formik'
const PasswordSchema = Yup.object().shape(

  {
    passwordLength:Yup.number()
    .min(4,'Should be min of 4 characters')
    .max(16,'Should be max of 16 characters')
    .required('Length is required')
  }
)
const App = () => {

  const [password,setPassword] = useState('')
  const [isPassGenerated,setIsPassGenerated] = useState(false)
  const [lowerCase,setLowerCase] = useState(true)
  const [upperCase,setupperCase] = useState(false)
  const [number,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false)
  
  const generatePasswordString = (passwordLength:number)=>{
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(upperCase){
      characterList += upperCaseChars
    }
    if(lowerCase)
      {
        characterList += lowercaseChars
      }
      if(number)
      {
        characterList+= digitChars
      }
      if(symbols)
      {
        characterList += specialChars
      }
      const passResult = createPassword(characterList,passwordLength)
        setPassword(passResult)
        setIsPassGenerated(true)
        setLowerCase(true)
        setupperCase(false)
        setNumbers(false)
    }
  function createPassword(characters: string,passwordLength:number){
      let result = ''
      for(let i = 0;i<passwordLength;i++)
      {
        const characterIndex = Math.round(Math.random()*characters.length)
        result +=characters.charAt(characterIndex)
      }
      return result
  }
  function resetPasswordState()
  {
    setPassword('')
  }
   return (
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.body}>
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
            <Formik
       initialValues={{passwordLength: ''}}
       validationSchema={PasswordSchema}
       onSubmit={ values =>{
        console.log(values);
        generatePasswordString(+values.passwordLength)
      }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>{errors.passwordLength}</Text>
            )}
            </View>
            <TextInput style={styles.inputStyle} 
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder='Ex.8'
            keyboardType='numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Lowercase</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={lowerCase}
          onPress={()=>setLowerCase(!lowerCase)}
          fillColor='#29AB87'
          />
          
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Uppercase Letters</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={upperCase}
          onPress={()=>setupperCase(!upperCase)}
          fillColor='#29AB56'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={number}
          onPress={()=>setNumbers(!number)}
          fillColor='#C9A0DC'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Symbols</Text>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={symbols}
          onPress={()=>setSymbols(!symbols)}
          fillColor='#FC80A5'
          />
         </View>
         
         <View style={styles.formActions}></View>
         <TouchableOpacity 
         onPress={handleSubmit}
         disabled={!isValid}
         style={styles.primaryBtn}
         ><Text style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
         <TouchableOpacity
         style={styles.secondaryBtn}
         onPress={()=>{
          handleReset();
          resetPasswordState()
         }}
         ><Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
         
         </>
       )}
     </Formik>
          </View>
         {isPassGenerated ? (
          <View style={[styles.card,styles.cardElevated]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description}>Long Press To Copy</Text>
              <Text style={styles.subTitle}>{password}</Text>
          
          </View>
         ):null}
        </SafeAreaView>
      </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  body:{
    backgroundColor:'#000'
  },
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    color: '#E28413'
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin:15
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    marginTop:10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})