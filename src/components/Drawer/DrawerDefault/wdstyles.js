/** @format */

import { StyleSheet } from 'react-native'
import { Color, Styles, Device } from '@common'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {width: -3, height: 0}
  },
  avatarBackground: {
    flexDirection: 'row',
    paddingTop: Device.isIphoneX ? 40 : 20,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  avatar: {
    height: Styles.width / 5,
    width: Styles.width / 5,
    borderRadius: Styles.width / 10,
    borderWidth: 0.5,
    borderColor: Color.DirtyBackground,
    marginBottom: 10,
  },
  fullName: {
    fontWeight: '600',
    color: Color.blackTextPrimary,
    backgroundColor: 'transparent',
    fontSize: Styles.FontSize.medium,
    marginBottom: 6,
    textAlign: 'left',
  },
  email: {
    backgroundColor: 'transparent',
    fontSize: 13,
    textAlign: 'left',
  },
  textItem: {
    // color: Color.blackTextPrimary,
    color: 'red',
    fontSize: Styles.FontSize.small,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
})
