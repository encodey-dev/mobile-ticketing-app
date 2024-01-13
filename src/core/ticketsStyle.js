import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }  ,  
        item: {  
            padding: 5,  
            fontSize: 15,  
            height: 35,  
        },  
        touchableView: {
          marginBottom: 5,
          width: 250,  
          height: 40,
          alignItems: 'center',
          backgroundColor: '#065b9b',
          borderWidth: 2,
          borderRadius: 10,
        },
        touchableText: {
          textAlign: 'center',
          paddingTop: 5,
          fontSize: 15,
          fontWeight: 'bold',
          color: 'white'
        },
        image: {
          flex: 1,
          width: 300,
          justifyContent: "center"
        },
        logo: {
        width: 350,
        height: 58,
        marginBottom: 30,
        marginTop: 5,
      },
      touchableViewTop: {
        marginBottom: 5,
        width: "100%",  
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'white',
        borderWidth: 1,
      },
      touchableViewTopActive: {
        marginBottom: 5,
        width: "100%",  
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'greet',
        borderWidth: 1,
      },
      touchableTextTop: {
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#065b9b'
      },
      textInput: {
    marginBottom: 30,
    width: 350,
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
  },
  mainViewWhole: {
    flex: 1,
    justifyContent: "center",
  } ,
  showText: {
    marginBottom: 30,
    padding: 5,  
    alignItems: 'center',
    color: 'black',
  },
  });