import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import defaultIcons from './Icons';
import FlipCard from 'react-native-flip-card';
import {getHeightValue, getWidthValue} from '../../../utils/ajustScreen';

const BASE_SIZE = {width: getWidthValue(350), height: getHeightValue(200)};

const s = StyleSheet.create({
  cardContainer: {},
  cardFace: {},
  icon: {
    position: 'absolute',
    top: getHeightValue(15),
    right: getWidthValue(15),
    width: getWidthValue(60),
    height: getHeightValue(40),
    resizeMode: 'contain'
  },
  baseText: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent'
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
  focused: {
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)'
  },
  number: {
    fontSize: 18,
    position: 'absolute',
    top: getHeightValue(95),
    left: getWidthValue(28),
  },
  name: {
    fontSize: 16,
    position: 'absolute',
    bottom: getHeightValue(20),
    left: getWidthValue(25),
    right: getWidthValue(100),
  },
  expiryLabel: {
    fontSize: 9,
    position: 'absolute',
    bottom: getWidthValue(60),
    left: getWidthValue(285),
  },
  expiry: {
    fontSize: 16,
    position: 'absolute',
    bottom: getHeightValue(40),
    left: getWidthValue(278),
  },
  amexCVC: {
    fontSize: 16,
    position: 'absolute',
    top: getHeightValue(73),
    right: getWidthValue(30),
  },
  cvc: {
    fontSize: 16,
    position: 'absolute',
    top: getHeightValue(80),
    right: getWidthValue(30),
  },
}); // https://github.com/yannickcr/eslint-plugin-react/issues/106

/* eslint react/prop-types: 0 */ export default class CardView extends Component {
  static propTypes = {
    focused: PropTypes.string,

    brand: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
    placeholder: PropTypes.object,

    scale: PropTypes.number,
    fontFamily: PropTypes.string,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    customIcons: PropTypes.object,
  };

  static defaultProps = {
    name: 'NOME COMPLETO',
    placeholder: {
      number: '•••• •••• •••• ••••',
      name: 'NOME COMPLETO',
      expiry: '••/••',
      cvc: '•••'
    },

    scale: 1,
    fontFamily: Platform.select({ios: 'Courier', android: 'monospace'}),
    imageFront: require('../images/card-front.png'),
    imageBack: require('../images/card-back.png')
  };

  render() {
    const {
      focused,
      brand,
      name,
      number,
      expiry,
      cvc,
      customIcons,
      placeholder,
      imageFront,
      imageBack,
      scale,
      fontFamily,
    } = this.props;

    const Icons = {...defaultIcons, ...customIcons};
    const isAmex = brand === 'american-express';
    const shouldFlip = !isAmex && focused === 'cvc';

    const containerSize = {...BASE_SIZE, height: BASE_SIZE.height * scale};
    const transform = {
      transform: [{scale}, {translateY: (BASE_SIZE.height * (scale - 1)) / 2}],
    };

    return (
      <View style={[s.cardContainer, containerSize]}>
        <FlipCard
          style={{borderWidth: 0}}
          flipHorizontal
          flipVertical={false}
          friction={10}
          perspective={2000}
          clickable={false}
          flip={shouldFlip}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            style={[BASE_SIZE, s.cardFace, transform]}
            source={imageFront}>
            <Image style={[s.icon]} source={Icons[brand]} />
            <Text
              style={[
                s.baseText,
                {fontFamily},
                s.number,
                !number && s.placeholder,
                focused === 'number' && s.focused,
              ]}>
              {!number ? placeholder.number : number}
            </Text>
            <Text
              style={[
                s.baseText,
                {fontFamily},
                s.name,
                !name && s.placeholder,
                focused === 'name' && s.focused,
              ]}
              numberOfLines={1}>
              {!name ? placeholder.name : name.toUpperCase()}
            </Text>
            <Text
              style={[
                s.baseText,
                {fontFamily},
                s.expiryLabel,
                s.placeholder,
                focused === 'expiry' && s.focused,
              ]}>
              MÊS/ANO
            </Text>
            <Text
              style={[
                s.baseText,
                {fontFamily},
                s.expiry,
                !expiry && s.placeholder,
                focused === 'expiry' && s.focused,
              ]}>
              {!expiry ? placeholder.expiry : expiry}
            </Text>
            {isAmex && (
              <Text
                style={[
                  s.baseText,
                  {fontFamily},
                  s.amexCVC,
                  !cvc && s.placeholder,
                  focused === 'cvc' && s.focused,
                ]}>
                {!cvc ? placeholder.cvc : cvc}
              </Text>
            )}
          </ImageBackground>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            style={[BASE_SIZE, s.cardFace, transform]}
            source={imageBack}>
            <Text
              style={[
                s.baseText,
                s.cvc,
                !cvc && s.placeholder,
                focused === 'cvc' && s.focused,
              ]}>
              {!cvc ? placeholder.cvc : cvc}
            </Text>
          </ImageBackground>
        </FlipCard>
      </View>
    );
  }
}
