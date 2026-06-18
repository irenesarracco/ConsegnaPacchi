import { StyleSheet, Platform } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },

  map: {
    flex: 1,
  },
  topPanelContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24, // Leggermente meno arrotondato di una barra di ricerca, più simile a una card fluttuante
    paddingVertical: 12,
    paddingHorizontal: 16,

    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  avatarIcon: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  panelTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  panelSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },

  loader: {
    marginLeft: 8,
  }
})

export default styles