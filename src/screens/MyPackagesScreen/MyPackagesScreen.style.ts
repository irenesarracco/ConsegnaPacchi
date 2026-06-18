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
  trackingCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  destinatario: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  puntoRitiro: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#d1fae5',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  statusText: {
    fontSize: 11,
    color: '#065f46',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
})

export default styles