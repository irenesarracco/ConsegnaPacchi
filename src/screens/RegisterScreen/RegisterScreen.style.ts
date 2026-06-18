import { StyleSheet } from "react-native"

const styles= StyleSheet.create({
    container: {
        flex: 1, 
        //justifyContent: 'center', 
        padding: 20 ,
        backgroundColor: '#f4f7fb'
    },
    header:{
        fontSize: 24, 
        marginBottom: 30,
        fontWeight: 'bold',
        paddingTop: 80,
        textAlign: 'center'
    },
    subtitle:{
        fontSize:14,
        marginBottom: 80,
        color: '#6b7280',
        textAlign: 'center'
    }
})


export default styles