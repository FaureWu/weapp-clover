import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import styles from './skeleton.scss'

class ComponentCommonSkeleton extends Component {
  static defaultProps = {
    selector: 'skeleton',
    backgroundColor: '#2f3333',
    lightColor: 'white',
    darkColor: '#2f3333',
  }

  state = {
    lights: [],
    darks: [],
    squares: [],
    circulars: [],
    cylinders: [],
  }

  componentDidMount() {
    const { selector } = this.props

    Promise.all([
      this.selectAll(`.${selector} >>> .${selector}-light`),
      this.selectAll(`.${selector} >>> .${selector}-dark`),
      this.selectAll(`.${selector} >>> .${selector}-square`),
      this.selectAll(`.${selector} >>> .${selector}-circular`),
      this.selectAll(`.${selector} >>> .${selector}-cylinder`),
    ]).then(([lights, darks, squares, circulars, cylinders]) =>
      this.setState({
        lights,
        darks,
        squares,
        circulars,
        cylinders,
      }),
    )
  }

  selectAll = selector =>
    new Promise(resolve =>
      Taro.createSelectorQuery()
        .selectAll(selector)
        .boundingClientRect()
        .exec(res => resolve(res[0])),
    )

  createStyle = ({ width, height, top, left }) => ({
    width: `${width}px`,
    height: `${height}px`,
    top: `${top}px`,
    left: `${left}px`,
  })

  createCylinderStyle = rect => ({
    ...this.createStyle(rect),
    'border-radius': `${rect.height / 2}px`,
  })

  render() {
    const { backgroundColor, lightColor, darkColor } = this.props
    const { lights, darks, circulars, squares, cylinders } = this.state

    const skeletonStyle = { backgroundColor }

    return (
      <View
        className={styles.skeleton}
        style={skeletonStyle}
        onTouchMove
        onClick
      >
        {darks.map(dark => (
          <View
            key={`${dark.top}-${dark.left}`}
            className={classNames(styles.item, styles.dark)}
            style={{ ...this.createStyle(dark), backgroundColor: darkColor }}
          />
        ))}
        {lights.map(light => (
          <View
            key={`${light.top}-${light.left}`}
            className={classNames(styles.item, styles.light)}
            style={{ ...this.createStyle(light), backgroundColor: lightColor }}
          />
        ))}
        {squares.map(square => (
          <View
            key={`${square.top}-${square.left}`}
            className={classNames(styles.item, styles.square)}
            style={this.createStyle(square)}
          />
        ))}
        {circulars.map(circular => (
          <View
            key={`${circular.top}-${circular.left}`}
            className={classNames(styles.item, styles.circular)}
            style={this.createStyle(circular)}
          />
        ))}
        {cylinders.map(cylinder => (
          <View
            key={`${cylinder.top}-${cylinder.left}`}
            className={classNames(styles.item, styles.cylinder)}
            style={this.createCylinderStyle(cylinder)}
          />
        ))}
      </View>
    )
  }
}

export default ComponentCommonSkeleton
