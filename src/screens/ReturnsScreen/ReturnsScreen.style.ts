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
  header: {
    marginBottom: 20,
  },
  titolo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  sottotitolo: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  emptyText: {
  fontSize: 15,
  color: '#6b7280',
  textAlign: 'center',
  marginBottom: 20,
},
  containerRow:{
    flexDirection: 'row',
    gap: 8, 
    marginBottom: 12 ,
    width: '100%'
  },
  uploadArea: {
  borderWidth: 2,
  borderColor: '#d1d5db',
  borderStyle: 'dashed',  //per linea tratteggiata
  borderRadius: 16,
  padding: 24,
  alignItems: 'center',
  marginBottom: 16,
  backgroundColor: '#ffffff',
},
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#6b7280',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
    gap: 12,
},
  statusBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadgeText: {
    color: '#065f46',
    fontWeight: '700',
    fontSize: 15,
  },
  labelTitle: {
    fontSize: 16,
    color: '#6b7280',
    //textTransform: 'uppercase',
    letterSpacing: 1,
    //fontWeight: '400',
    marginBottom: 8,
    textAlign: 'center'
  },
  image:{
    width: '100%', 
    height: 300, 
    borderRadius: 8, 
    marginTop: 8
  }
  
})


export default styles


