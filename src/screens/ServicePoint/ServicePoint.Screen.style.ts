import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 30,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 16,
  },
  nome: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  corriere: {
    fontSize: 12,
    color: '#3b82f6', 
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

 
  favoriteRoundButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  favoriteRoundButtonActive: {
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2',
  },
  favoriteIcon: {
    fontSize: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 24,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  statusTesto: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
  angoloTopLeft:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: 30, 
    height: 30, 
    borderTopWidth: 3, 
    borderLeftWidth: 3, 
    borderColor: 'white' 

  },
  angoloTopRight:{
    position: 'absolute', 
    top: 0, 
    right: 0, 
    width: 30, 
    height: 30, 
    borderTopWidth: 3, 
    borderRightWidth: 3, 
    borderColor: 'white'

  },
  angoloBottomLeft:{
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    width: 30, 
    height: 30, 
    borderBottomWidth: 3, 
    borderLeftWidth: 3, 
    borderColor: 'white'

  },
  angoloBottomRight:{
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    width: 30, 
    height: 30, 
    borderBottomWidth: 3, 
    borderRightWidth: 3, 
    borderColor: 'white'

  },
  buttonCamera: { 
    color: 'white', 
    fontSize: 30
    
  },
  containerButton: {
  position: 'absolute',
  bottom: '20%',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  zIndex: 1
  },
  containerButton2: {
  position: 'absolute',
  top: '5%',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  zIndex: 1
  },
  quadratoQrCode: {
    position: 'absolute',
    top: '25%',
    alignSelf: 'center',
    width: 200,
    height: 200
  },
  camera:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0 
  },
   preferitiButton: {
    backgroundColor: '#add8e6',
    borderRadius: 16,
    padding: 18,
    left: '70%',
    marginBottom: 14,
  },

  preferitiButtonTesto: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '700',
  },
  })

export default styles